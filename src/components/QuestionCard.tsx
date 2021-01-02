import styled from 'styled-components';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
}) => {
  return (
    <StyledCard>
      <StyledQuestion dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map(answer => (
          <StyledButton
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </StyledButton>
        ))}
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  margin: 4rem 0;
`;

const StyledQuestion = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.big};
  color: ${({ theme: { color } }) => color.black};
`;

type ButtonProps = {
  correct: boolean;
  userClicked: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  width: 100%;
  height: 4rem;
  margin-bottom: 1rem;
  background: ${({ correct, userClicked, theme: { color } }) =>
    correct
      ? color.green
      : !correct && userClicked
      ? color.red
      : color.primary};
  border: none;
  outline: none;
  border-radius: 0.3rem;
  color: ${({ theme: { color } }) => color.white};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};
  &:hover {
    opacity: 0.9;
  }
`;

export default QuestionCard;
