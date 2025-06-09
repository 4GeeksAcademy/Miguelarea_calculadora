import React, { useState, useEffect } from 'react';
import '../../styles/index.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    const lastChar = input.slice(-1);
    const operators = ['+', '-', '*', '/', '.'];

    if (value === '=') {
      try {
        const result = eval(input);
        setInput(result.toString());
        setHistory((prev) => [...prev, `${input} = ${result}`]);
      } catch {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else if (value === '+-') {
      if (input.startsWith('-')) {
        setInput(input.slice(1));
      } else {
        setInput('-' + input);
      }
    } else {
      // Evitar operadores duplicados
      if (operators.includes(lastChar) && operators.includes(value)) return;
      setInput(input + value);
    }
  };

  // Manejo de teclado
  useEffect(() => {
    const handleKey = (e) => {
      const allowed = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','Enter','Backspace'];

      if (!allowed.includes(e.key)) return;

      if (e.key === 'Enter') {
        handleClick('=');
      } else if (e.key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else {
        handleClick(e.key);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [input]);

  const buttons = [
    'C', '+-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="calculator">
      <div className="history">
        {history.map((line, i) => (
          <div key={i} className="history-line">{line}</div>
        ))}
      </div>
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleClick(btn)}
            className={btn === '=' ? 'equal' : ''}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
