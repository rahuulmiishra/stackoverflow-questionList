import IQuestion from "../interfaces/IQuestion";

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

export { getFormattedDate, getTransformedQuestion };
