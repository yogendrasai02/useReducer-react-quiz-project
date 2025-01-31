import { useReducer, useState } from "react";

const reducer = (state, action) => {
  console.log("state:", state);
  console.log("action:", action);
  if (action.type === "SET") {
    return action.payload;
  } else if (action.type === "INC") {
    return state + action.payload;
  } else if (action.type === "DEC") {
    return state + action.payload;
  }
};

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0); // 2nd param: initial state

  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({
      type: "DEC",
      payload: -step,
    });
  };

  const inc = function () {
    dispatch({
      type: "INC",
      payload: step,
    });
  };

  const defineCount = function (e) {
    dispatch({
      type: "SET",
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({
      type: "SET",
      payload: 0,
    });
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
