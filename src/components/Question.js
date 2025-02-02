import Options from "./Options";

function Question({ question, dispatch, chosenOptionIndex }) {
  console.log("Question:", question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        chosenOptionIndex={chosenOptionIndex}
      />
    </div>
  );
}

export default Question;
