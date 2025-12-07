import React, { useState } from 'react';
import styles from './Quiz.module.css';
import clsx from 'clsx';

const Quiz = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const getAnswerClass = (questionIndex, optionIndex) => {
    if (!showResults) return '';
    const question = questions[questionIndex];
    if (optionIndex === question.correctAnswerIndex) {
      return styles.correct;
    }
    if (selectedAnswers[questionIndex] === optionIndex && optionIndex !== question.correctAnswerIndex) {
      return styles.incorrect;
    }
    return '';
  };

  return (
    <div className={clsx('card', styles.quizContainer)}>
      <div className="card__header">
        <h3>📝 Self-Check Quiz</h3>
      </div>
      <div className="card__body">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className={styles.questionBlock}>
            <p className={styles.questionText}>{qIndex + 1}. {question.text}</p>
            <div className={styles.options}>
              {question.options.map((option, oIndex) => (
                <label key={oIndex} className={clsx(styles.optionLabel, getAnswerClass(qIndex, oIndex))}>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={oIndex}
                    checked={selectedAnswers[qIndex] === oIndex}
                    onChange={() => handleAnswerChange(qIndex, oIndex)}
                    disabled={showResults}
                  />
                  {option}
                </label>
              ))}
            </div>
            {showResults && selectedAnswers[qIndex] !== question.correctAnswerIndex && (
              <p className={styles.feedback}>
                Correct answer: {question.options[question.correctAnswerIndex]}
              </p>
            )}
          </div>
        ))}
        {!showResults && (
          <button className={clsx('button button--primary', styles.submitButton)} onClick={handleSubmit}>
            Submit Answers
          </button>
        )}
        {showResults && (
          <p className={styles.resultsSummary}>Review your answers above.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;