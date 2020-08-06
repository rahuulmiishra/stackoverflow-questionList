import React from "react";

import "./_questionDialog.scss";

interface IQuestionListItem {
  handleClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  questionTitle: string;
  questionLink: string;
}
const QuestionDialog: React.FC<IQuestionListItem> = (
  props: IQuestionListItem
) => {
  const { handleClose, questionLink = "", questionTitle = "" } = props;

  return (
    <div className="question-dialog">
      <div className="question-dialog__title">{questionTitle}</div>
      <div className="question-dialog__link">
        <a href={questionLink} rel="noopener noreferrer" target={"_blank"}>
          Open In New Tab
        </a>
      </div>
      <div className="question-dialog__close" onClick={handleClose}>
        &times;
      </div>
    </div>
  );
};

export default QuestionDialog;
