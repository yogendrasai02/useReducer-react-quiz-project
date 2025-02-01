import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  quizStatus: "LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        questions: action.payload,
        quizStatus: "READY",
      };
    default:
      throw new Error("Unknown action type");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "DATA_RECEIVED",
          payload: data,
        });
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question goes here</p>
      </Main>
    </div>
  );
}
