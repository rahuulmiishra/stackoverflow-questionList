import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Dialog from "../dialog/Dialog";
import QuestionDialog from "../question-dialog/QuestionDialog";
import QuestionList from "../question-list/QuestionList";

import useNetwork from "../../useNetwork";
import IQuestion from "../../interfaces/IQuestion";

import "./_stackoverflowRail.scss";

const QUESTIONS_PER_PAGE = 20;

const initialSelectedQuestion = {
  authorName: "",
  authorProfileLink: "",
  creationDate: "",
  questionId: "",
  questionLink: "",
  title: "",
};

const StackOverFlowRail: React.FC = () => {
  const [showDialog, updateDialogVisibility] = useState(false);
  const [selectedQuestion, updateSelectedQuestion] = useState<IQuestion>(
    initialSelectedQuestion
  );
  const networkHook = useNetwork();

  React.useEffect(() => {
    networkHook.getQuestions();
  }, []);

  const getMoreQuestions = () => {
    const questionListLength = networkHook.questions.length;
    networkHook.getQuestions(questionListLength / QUESTIONS_PER_PAGE + 1);
  };

  const handleClickOnQuestion = (index) => {
    const clickedQuestion: IQuestion = networkHook.questions[index];
    updateSelectedQuestion(clickedQuestion);
    updateDialogVisibility(true);
  };

  const handleCloseOnDialog = () => {
    updateDialogVisibility(!showDialog);
  };

  return (
    <div className="stackoverflow-rail">
      <InfiniteScroll
        dataLength={networkHook.questions.length}
        hasMore={true}
        loader={<h4 className="question-loading">Loading...</h4>}
        next={getMoreQuestions}
      >
        <QuestionList
          handleQuestionClick={handleClickOnQuestion}
          questions={networkHook.questions}
        />
      </InfiniteScroll>
      <Dialog handleClose={handleCloseOnDialog} isOpen={showDialog}>
        <QuestionDialog
          questionTitle={selectedQuestion.title}
          questionLink={selectedQuestion.questionLink}
          handleClose={handleCloseOnDialog}
        />
      </Dialog>
    </div>
  );
};

export default StackOverFlowRail;
