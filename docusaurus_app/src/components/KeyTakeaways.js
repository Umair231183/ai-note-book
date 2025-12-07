import React from 'react';
import styles from './KeyTakeaways.module.css';
import clsx from 'clsx';

const KeyTakeaways = ({ takeaways }) => {
  if (!takeaways || takeaways.length === 0) {
    return null;
  }

  return (
    <div className={clsx('card', styles.keyTakeaways)}>
      <div className="card__header">
        <h3>🔑 Key Takeaways</h3>
      </div>
      <div className="card__body">
        <ul>
          {takeaways.map((takeaway, index) => (
            <li key={index}>{takeaway}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KeyTakeaways;