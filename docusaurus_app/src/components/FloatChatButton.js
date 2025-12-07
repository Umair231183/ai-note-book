import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './FloatChatButton.module.css';

const FloatChatButton = ({ onClick }) => {
  return (
    <button className={clsx('button button--primary', styles.floatButton)} onClick={onClick} title="Open Chatbot">
      💬
    </button>
  );
};

export default FloatChatButton;