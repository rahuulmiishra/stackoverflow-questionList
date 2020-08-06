import React from "react";

import QuestionListItem from "./question-list-item/QuestionListItem";

import IQuestion from "../../interfaces/IQuestion";

import "./_questionList.scss";

interface IQuestionList {
  handleQuestionClick: Function;
  questions: Array<IQuestion>;
}
const QuestionList: React.FC<IQuestionList> = (props: IQuestionList) => {
  const { handleQuestionClick, questions } = props;

  if (!questions.length) {
    return null;
  }

  return (
    <ul className="question-list">
      {questions.map((question: IQuestion, index) => {
        return (
          <QuestionListItem
            key={question.questionId}
            onClick={handleQuestionClick}
            question={question}
            questionIndex={index}
          />
        );
      })}
    </ul>
  );
};

export default QuestionList;
