import React from 'react';
import styles from './ChapterSummary.module.css';
import clsx from 'clsx';

const ChapterSummary = ({ summaryPoints }) => {
  if (!summaryPoints || summaryPoints.length === 0) {
    return null;
  }

  return (
    <div className={clsx('card', styles.chapterSummary)}>
      <div className="card__header">
        <h3>Chapter Summary</h3>
      </div>
      <div className="card__body">
        <ul>
          {summaryPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChapterSummary;