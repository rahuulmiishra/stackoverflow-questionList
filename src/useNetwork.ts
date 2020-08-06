import { useState } from "react";

import IQuestion from "./interfaces/IQuestion";

const DEFAULT_PAGE_NUMBER = 1;

const getFormattedDate = (timeStamp_value: number = 0): string => {
  const date: Date = timeStamp_value
    ? new Date(timeStamp_value * 1000)
    : new Date();
  return date.toUTCString();
};

const getTransformedQuestion = (questions = []): Array<IQuestion> => {
  const questionList: Array<IQuestion> = [];
  questions.forEach((question) => {
    const {
      title = "",
      question_id = "",
      link = "",
      creation_date = 0,
      owner,
    } = question;
    const { display_name: ownerName = "", link: ownerLink = "" } = owner;
    const formattedQuestion: IQuestion = {
      authorName: ownerName,
      authorProfileLink: ownerLink,
      creationDate: getFormattedDate(creation_date),
      questionId: question_id,
      questionLink: link,
      title,
    };
    questionList.push(formattedQuestion);
  });
  return questionList;
};

const useNetwork = () => {
  const [isQuestionsLoading, updateQuestionsLoadingState] = useState(false);
  const initialQuestions: Array<IQuestion> = [];
  const [questions, updateQuestions] = useState(initialQuestions);

  const getQuestions = (pageNumber: number = DEFAULT_PAGE_NUMBER) => {
    updateQuestionsLoadingState(true);
    fetch(
      `https://api.stackexchange.com/2.2/search/advanced?page=${pageNumber}&pagesize=20&order=desc&sort=activity&site=stackoverflow`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        const { items = [] } = data;
        updateQuestionsLoadingState(false);
        updateQuestions(questions.concat(getTransformedQuestion(items)));
      })
      .catch((error) => {
        console.log(error);
        updateQuestionsLoadingState(false);
      });
  };

  return {
    isQuestionsLoading,
    getQuestions,
    questions,
  };
};

export default useNetwork;
