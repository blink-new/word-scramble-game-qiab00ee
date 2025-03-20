import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const words = [
  'KANGAROO',
  'ELEPHANT',
  'GIRAFFE',
  'PENGUIN',
  'DOLPHIN',
  'OCTOPUS',
  'BUTTERFLY',
  'CHEETAH',
  'ZEBRA',
  'LION'
]

function scrambleWord(word: string) {
  return word.split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}

function App() {
  const [currentWord, setCurrentWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    if (!currentWord) {
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setCurrentWord(randomWord)
      setScrambledWord(scrambleWord(randomWord))
    }
  }, [currentWord])

  useEffect(() => {
    if (!gameActive) return
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameActive(false)
          toast.error('Time\'s up!')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  const handleCheck = () => {
    if (userInput.toUpperCase() === currentWord) {
      setScore(score + 5)
      setUserInput('')
      const nextWord = words[Math.floor(Math.random() * words.length)]
      setCurrentWord(nextWord)
      setScrambledWord(scrambleWord(nextWord))
      toast.success('Correct! +5 points')
    } else {
      toast.error('Try again!')
    }
  }

  const handleHint = () => {
    if (score >= 2) {
      setScore(score - 2)
      toast.success(`First letter is ${currentWord[0]}`)
    } else {
      toast.error('Not enough points for hint!')
    }
  }

  const handleRestart = () => {
    setScore(0)
    setTimeLeft(30)
    setGameActive(true)
    setUserInput('')
    const nextWord = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(nextWord)
    setScrambledWord(scrambleWord(nextWord))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl"
      >
        <div className="flex justify-between mb-8">
          <motion.div 
            animate={{ scale: score ? [1, 1.2, 1] : 1 }}
            className="text-white"
          >
            Score: {score}
          </motion.div>
          <div className="text-white">Time: {timeLeft}s</div>
        </div>

        <motion.h1 
          className="text-4xl font-bold text-white text-center mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          {scrambledWord}
        </motion.h1>

        <p className="text-white/80 text-center mb-6">Unscramble the word!</p>

        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          className="w-full bg-white/20 rounded-lg p-3 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Type your answer..."
          disabled={!gameActive}
        />

        <div className="flex gap-4">
          <button
            onClick={handleCheck}
            disabled={!gameActive}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg p-3 transition-colors disabled:opacity-50"
          >
            Check
          </button>
          <button
            onClick={handleHint}
            disabled={!gameActive || score < 2}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-3 transition-colors disabled:opacity-50"
          >
            Hint (-2 points)
          </button>
        </div>

        {!gameActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-white mb-4">Game Over! Final Score: {score}</p>
            <button
              onClick={handleRestart}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-6 py-2 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default App