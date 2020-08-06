import { useState } from "react";

import { getFormattedDate, getTransformedQuestion } from "./utils/Utilities";

import IQuestion from "./interfaces/IQuestion";

const DEFAULT_PAGE_NUMBER = 1;

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
