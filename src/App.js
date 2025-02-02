import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

const initialState = {
  questions: [],
  quizStatus: "LOADING", // LOADING, ERROR, READY, ACTIVE, FINISHED
  activeQuestionIndex: 0,
  chosenOptionIndex: null, // tracks the selection option's index for the current question displayed
  points: 0,
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
    case "ANSWER_QUESTION":
      const question = state.questions[state.activeQuestionIndex];
      return {
        ...state,
        chosenOptionIndex: action.payload,
        points:
          state.points +
          (question.correctOption === action.payload ? question.points : 0),
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        activeQuestionIndex: state.activeQuestionIndex + 1,
        chosenOptionIndex: null,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export default function App() {
  const [
    { questions, quizStatus, activeQuestionIndex, chosenOptionIndex },
    dispatch,
  ] = useReducer(reducer, initialState);

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
        {quizStatus === "ACTIVE" && (
          <>
            <Question
              question={questions[activeQuestionIndex]}
              dispatch={dispatch}
              chosenOptionIndex={chosenOptionIndex}
            />
            <NextButton
              dispatch={dispatch}
              chosenOptionIndex={chosenOptionIndex}
            />
          </>
        )}
      </Main>
    </div>
  );
}
