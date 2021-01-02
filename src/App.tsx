import { useState } from 'react';
import styled from 'styled-components';
// components
import QuestionCard from './components/QuestionCard';
import Spinner from './components/Spinner';
// api
import { fetchQuizQuestions } from './api';
// api types
import { Difficulty, QuestionsState } from './api';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const totalQuestions = 10;

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <StyledContainer>
      <h1>React typescript quiz</h1>
      {gameOver || userAnswers.length === totalQuestions ? (
        <StyledButton onClick={startTrivia}>Start</StyledButton>
      ) : null}

      {loading && (
        <StyledSpinnerContainer>
          <Spinner />
        </StyledSpinnerContainer>
      )}
      {!loading && !gameOver && (
        <>
          <StyledText>
            <b>Score:</b> {score}
          </StyledText>
          <StyledText>
            <b>Question:</b> {number + 1} / {totalQuestions}
          </StyledText>
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        </>
      )}
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== totalQuestions - 1 && (
          <StyledButton onClick={nextQuestion}>Next Question</StyledButton>
        )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: 65rem;
  margin: 0 auto;
  padding: 1.8rem 1.4rem;
`;

const StyledSpinnerContainer = styled.div`
  padding: 2rem 0;
`;

const StyledButton = styled.button`
  padding: 1rem 2.8rem;
  border: none;
  outline: none;
  font-size: ${({ theme: { color } }) => color.white};
  background-color: ${({ theme: { color } }) => color.black};
  color: ${({ theme: { color } }) => color.white};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};
  border-radius: 0.3rem;
  cursor: pointer;
`;

const StyledText = styled.p`
  color: ${({ theme: { color } }) => color.black};
  margin: 1.5rem 0;
`;

export default App;
