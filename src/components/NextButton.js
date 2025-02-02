function NextButton({
  dispatch,
  chosenOptionIndex,
  activeQuestionIndex,
  questionsCount,
}) {
  if (chosenOptionIndex === null) {
    return null;
  }
  if (activeQuestionIndex < questionsCount - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      >
        Next
      </button>
    );
  }
  if (activeQuestionIndex === questionsCount - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "FINISH_QUIZ" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
