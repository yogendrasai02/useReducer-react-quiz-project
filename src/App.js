import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  quizStatus: "LOADING", // LOADING, ERROR, READY, ACTIVE, FINISHED
  activeQuestionIndex: 0,
  chosenOptionIndex: null, // tracks the selection option's index for the current question displayed
  points: 0,
  highScore: 0,
  secondsRemaining: null, // timer, calculated based on number of questions, at the start of the quiz
};

const SECONDS_PER_QUESTION = 30;

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
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
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
    case "FINISH_QUIZ":
      return {
        ...state,
        highScore: Math.max(state.points, state.highScore),
        quizStatus: "FINISHED",
      };
    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore,
      };
    case "CLOCK_TICK":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        quizStatus:
          state.secondsRemaining === 0 ? "FINISHED" : state.quizStatus,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export default function App() {
  const [
    {
      questions,
      quizStatus,
      activeQuestionIndex,
      chosenOptionIndex,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // derived state
  const questionsCount = questions.length || 0;

  const maxPossiblePoints = questions.reduce(
    (prevSum, el) => prevSum + el.points,
    0
  );

  useEffect(() => {
    if (quizStatus === "LOADING") {
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
    }
  }, [quizStatus]);

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
            <Progress
              activeQuestionIndex={activeQuestionIndex}
              questionsCount={questionsCount}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              chosenOptionIndex={chosenOptionIndex}
            />
            <Question
              question={questions[activeQuestionIndex]}
              dispatch={dispatch}
              chosenOptionIndex={chosenOptionIndex}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                chosenOptionIndex={chosenOptionIndex}
                activeQuestionIndex={activeQuestionIndex}
                questionsCount={questionsCount}
              />
            </Footer>
          </>
        )}
        {quizStatus === "FINISHED" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
