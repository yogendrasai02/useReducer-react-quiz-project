function FinishedScreen({ points, maxPossiblePoints }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙃";
  else if (percentage > 0) emoji = "🫤";
  else if (percentage === 0) emoji = "🤦";
  return (
    <div>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        ({Math.ceil(percentage)}%)
      </p>
    </div>
  );
}

export default FinishedScreen;
