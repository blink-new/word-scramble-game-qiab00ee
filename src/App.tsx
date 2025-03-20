import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [word, setWord] = useState('KANGAROO');
  const [answer, setAnswer] = useState('');
  const [scrambledWord, setScrambledWord] = useState('AGRNAOKO');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkAnswer = () => {
    if (answer.toLowerCase() === word.toLowerCase()) {
      setScore((prev) => prev + 5);
      // Add new word logic here
    }
  };

  const getHint = () => {
    setScore((prev) => Math.max(0, prev - 2));
    // Add hint logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between mb-8">
          <div className="text-white text-lg font-semibold">Score: {score}</div>
          <div className="text-white text-lg font-semibold">Time: {time}s</div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wider mb-2">{scrambledWord}</h1>
          <p className="text-purple-200 text-sm">Unscramble the word!</p>
        </div>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full bg-white/20 text-white placeholder-purple-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-white/50"
        />

        <div className="flex gap-4">
          <button
            onClick={checkAnswer}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Check
          </button>
          <button
            onClick={getHint}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Hint (-2 points)
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;