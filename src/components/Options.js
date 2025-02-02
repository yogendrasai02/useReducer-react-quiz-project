function Options({ question, dispatch, chosenOptionIndex }) {
  const { options } = question;
  const hasQuestionBeenAnswered = chosenOptionIndex !== null;
  return (
    <div className="options">
      {options.map((option, optionIndex) => (
        <button
          className={`btn btn-option ${
            hasQuestionBeenAnswered
              ? optionIndex === chosenOptionIndex
                ? "answer"
                : ""
              : ""
          } ${
            hasQuestionBeenAnswered
              ? optionIndex === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() =>
            dispatch({
              type: "ANSWER_QUESTION",
              payload: optionIndex,
            })
          }
          disabled={hasQuestionBeenAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
