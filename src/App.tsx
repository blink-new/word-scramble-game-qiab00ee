import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  // ... keep existing state and functions

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <div className="flex justify-between mb-6 text-white/90">
          <motion.div 
            animate={{ scale: score > 0 ? [1, 1.2, 1] : 1 }}
            className="text-lg font-medium"
          >
            Score: {score}
          </motion.div>
          <div className="text-lg font-medium">
            Time: {timer}s
          </div>
        </div>

        <motion.h1 
          className="text-4xl font-bold text-center mb-4 text-white"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {currentWord}
        </motion.h1>

        <p className="text-center mb-6 text-white/80">
          Unscramble the word!
        </p>

        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 mb-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          placeholder="Type your answer..."
        />

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={checkAnswer}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Check
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={getHint}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Hint (-2 points)
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default App;