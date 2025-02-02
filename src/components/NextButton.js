function NextButton({ dispatch, chosenOptionIndex }) {
  if (chosenOptionIndex === null) {
    return null;
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "NEXT_QUESTION" })}
    >
      Next
    </button>
  );
}

export default NextButton;
