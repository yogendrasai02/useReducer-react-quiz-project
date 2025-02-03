import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    // this timer needs a clean up function
    const timerId = setInterval(() => {
      dispatch({ type: "CLOCK_TICK" });
    }, 1000);

    // clean up is needed so that the timer does not run continuosly and mess up with quiz
    return () => clearInterval(timerId);
  }, [dispatch]);
  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
