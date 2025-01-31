import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

const reducer = (state, action) => {
  const { count: prevCount, step: prevStep } = state;
  console.log("state:", state);
  console.log("action:", action);
  switch (action.type) {
    case "INC_COUNT":
      return { count: prevCount + action.payload, step: prevStep };
    case "DEC_COUNT":
      return { count: prevCount + action.payload, step: prevStep };
    case "SET_COUNT":
      return { count: action.payload, step: prevStep };
    case "SET_STEP":
      return { count: prevCount, step: action.payload };
    case "RESET":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
};

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({
      type: "DEC_COUNT",
      payload: -step,
    });
  };

  const inc = function () {
    dispatch({
      type: "INC_COUNT",
      payload: step,
    });
  };

  const defineCount = function (e) {
    dispatch({
      type: "SET_COUNT",
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e) {
    dispatch({
      type: "SET_STEP",
      payload: Number(e.target.value),
    });
  };

  const reset = function () {
    dispatch({
      type: "RESET",
    });
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
