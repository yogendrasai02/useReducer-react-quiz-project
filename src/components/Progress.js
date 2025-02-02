function Progress({
  points,
  activeQuestionIndex,
  questionsCount,
  maxPossiblePoints,
  chosenOptionIndex,
}) {
  return (
    <header className="progress">
      <progress
        max={questionsCount}
        value={activeQuestionIndex + (chosenOptionIndex ? 1 : 0)}
      />
      <p>
        Question{" "}
        <strong>
          {activeQuestionIndex + 1} / {questionsCount}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
