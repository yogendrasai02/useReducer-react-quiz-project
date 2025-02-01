import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  quizStatus: "LOADING", // LOADING, ERROR, READY, ACTIVE, FINISHED
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        questions: action.payload,
        quizStatus: "READY",
      };
    case "DATA_ERROR":
      return {
        ...state,
        quizStatus: "ERROR",
      };
    case "START_QUIZ":
      return {
        ...state,
        quizStatus: "ACTIVE",
      };
    default:
      throw new Error("Unknown action type");
  }
};

export default function App() {
  const [{ questions, quizStatus }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // derived state
  const questionsCount = questions.length || 0;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "DATA_RECEIVED",
          payload: data,
        });
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        dispatch({
          type: "DATA_ERROR",
          payload: err,
        });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {quizStatus === "LOADING" && <Loader />}
        {quizStatus === "ERROR" && <Error />}
        {quizStatus === "READY" && (
          <StartScreen questionsCount={questionsCount} dispatch={dispatch} />
        )}
        {quizStatus === "ACTIVE" && <Question />}
      </Main>
    </div>
  );
}
