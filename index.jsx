import { useState } from 'react';

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handleNumber = (num) => {
    setExpression(expression + num);
    setResult('0');
  };

  const handleDecimal = () => {
    // Only add decimal if the last number doesn't already have one
    const parts = expression.split(/[\+\-\×\÷]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes('.')) {
      setExpression(expression + '.');
    }
  };

  const handleOperation = (op) => {
    if (expression === '') return;
    
    // Prevent adding multiple operators in a row
    const lastChar = expression[expression.length - 1];
    if (['+', '-', '×', '÷'].includes(lastChar)) {
      setExpression(expression.slice(0, -1) + op);
    } else {
      setExpression(expression + op);
    }
    setResult('0');
  };

  const handleEquals = () => {
    if (expression === '') return;
    
    try {
      // Replace × and ÷ with * and / for evaluation
      const calcExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');
      
      // Evaluate the expression
      const evalResult = eval(calcExpression);
      setResult(String(evalResult));
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('0');
  };

  const handleCancel = () => {
    // Remove last character from expression
    setExpression(expression.slice(0, -1));
    setResult('0');
  };

  const handlePercent = () => {
    if (expression === '') return;
    
    const parts = expression.split(/[\+\-\×\÷]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber) {
      const percentValue = parseFloat(lastNumber) / 100;
      const newExpression = expression.slice(0, -lastNumber.length) + percentValue;
      setExpression(newExpression);
    }
  };

  const handleToggleSign = () => {
    if (expression === '') return;
    
    const parts = expression.split(/[\+\-\×\÷]/);
    const operators = expression.match(/[\+\-\×\÷]/g) || [];
    const lastNumber = parts[parts.length - 1];
    
    if (lastNumber) {
      const toggledNumber = lastNumber.startsWith('-') 
        ? lastNumber.slice(1) 
        : '-' + lastNumber;
      
      parts[parts.length - 1] = toggledNumber;
      
      // Reconstruct expression
      let newExpression = parts[0];
      for (let i = 0; i < operators.length; i++) {
        newExpression += operators[i] + parts[i + 1];
      }
      setExpression(newExpression);
    }
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all hover:opacity-80 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-black rounded-3xl p-6 shadow-2xl w-full max-w-sm">
        <div className="bg-gray-900 rounded-2xl p-6 mb-4">
          <div className="text-right text-2xl text-gray-400 mb-2 min-h-8 break-all">
            {expression || '\u00A0'}
          </div>
          <div className="text-right text-5xl font-light text-white break-all">
            {result}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button onClick={handleClear} className="bg-gray-500 text-white">AC</Button>
          <Button onClick={handleCancel} className="bg-gray-500 text-white">C</Button>
          <Button onClick={handlePercent} className="bg-gray-500 text-white">%</Button>
          <Button onClick={() => handleOperation('÷')} className="bg-orange-500 text-white">÷</Button>
          
          <Button onClick={() => handleNumber(7)} className="bg-gray-700 text-white">7</Button>
          <Button onClick={() => handleNumber(8)} className="bg-gray-700 text-white">8</Button>
          <Button onClick={() => handleNumber(9)} className="bg-gray-700 text-white">9</Button>
          <Button onClick={() => handleOperation('×')} className="bg-orange-500 text-white">×</Button>
          
          <Button onClick={() => handleNumber(4)} className="bg-gray-700 text-white">4</Button>
          <Button onClick={() => handleNumber(5)} className="bg-gray-700 text-white">5</Button>
          <Button onClick={() => handleNumber(6)} className="bg-gray-700 text-white">6</Button>
          <Button onClick={() => handleOperation('-')} className="bg-orange-500 text-white">−</Button>
          
          <Button onClick={() => handleNumber(1)} className="bg-gray-700 text-white">1</Button>
          <Button onClick={() => handleNumber(2)} className="bg-gray-700 text-white">2</Button>
          <Button onClick={() => handleNumber(3)} className="bg-gray-700 text-white">3</Button>
          <Button onClick={() => handleOperation('+')} className="bg-orange-500 text-white">+</Button>
          
          <Button onClick={handleToggleSign} className="bg-gray-700 text-white">+/-</Button>
          <Button onClick={() => handleNumber(0)} className="bg-gray-700 text-white">0</Button>
          <Button onClick={handleDecimal} className="bg-gray-700 text-white">.</Button>
          <Button onClick={handleEquals} className="bg-orange-500 text-white">=</Button>
        </div>
      </div>
    </div>
  );

}
