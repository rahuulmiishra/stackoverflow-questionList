import React from "react";

import IQuestion from "../../../interfaces/IQuestion";

import "./_questionListItem.scss";

interface IQuestionListItem {
  onClick: Function;
  question: IQuestion;
  questionIndex: number;
}
const QuestionListItem: React.FC<IQuestionListItem> = (
  props: IQuestionListItem
) => {
  const { onClick, question, questionIndex } = props;

  const handleClick = () => {
    onClick(questionIndex);
  };

  return (
    <li className="question-list-item" onClick={handleClick}>
      <div>{question.authorName}</div>
      <div>{question.title}</div>
      <div>{question.creationDate}</div>
    </li>
  );
};

export default QuestionListItem;
