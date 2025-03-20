import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GameState = 'menu' | 'category' | 'playing' | 'results';

const categories = {
  animals: ['ELEPHANT', 'GIRAFFE', 'PENGUIN', 'DOLPHIN', 'KANGAROO'],
  countries: ['FRANCE', 'JAPAN', 'BRAZIL', 'CANADA', 'EGYPT'],
  sports: ['SOCCER', 'TENNIS', 'BASKETBALL', 'SWIMMING', 'VOLLEYBALL'],
  food: ['PIZZA', 'SUSHI', 'BURGER', 'PASTA', 'TACOS']
};

const scrambleWord = (word: string) => {
  return word.split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (gameState === 'playing' && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameState('results');
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [timer, gameState]);

  const startGame = (category: string) => {
    setSelectedCategory(category);
    setScore(0);
    setTimer(30);
    nextWord(category);
    setGameState('playing');
  };

  const nextWord = (category: string) => {
    const words = categories[category as keyof typeof categories];
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput('');
  };

  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord) {
      setScore(s => s + 10);
      nextWord(selectedCategory);
    }
  };

  const getHint = () => {
    setUserInput(currentWord[0]);
    setScore(s => Math.max(0, s - 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4">
      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto text-center"
          >
            <h1 className="text-6xl font-bold mb-8">Word Scramble</h1>
            <button
              onClick={() => setGameState('category')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-all"
            >
              Play
            </button>
            <div className="mt-4">
              High Score: {highScore}
            </div>
          </motion.div>
        )}

        {gameState === 'category' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Choose Category</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(categories).map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame(category)}
                  className="bg-white bg-opacity-20 p-4 rounded-lg text-xl capitalize hover:bg-opacity-30 transition-all"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="flex justify-between mb-4">
              <div>Score: {score}</div>
              <div>Time: {timer}s</div>
            </div>
            <motion.div
              key={scrambledWord}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold mb-8"
            >
              {scrambledWord}
            </motion.div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              className="w-full bg-white bg-opacity-20 p-3 rounded-lg text-xl mb-4 text-center"
              placeholder="Type your answer..."
            />
            <div className="flex gap-4">
              <button
                onClick={checkAnswer}
                className="flex-1 bg-green-500 p-3 rounded-lg hover:bg-green-600 transition-all"
              >
                Check
              </button>
              <button
                onClick={getHint}
                className="flex-1 bg-yellow-500 p-3 rounded-lg hover:bg-yellow-600 transition-all"
              >
                Hint (-2 points)
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl mb-8">Final Score: {score}</p>
            <button
              onClick={() => setGameState('menu')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-all"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}