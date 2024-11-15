import { useState } from 'react'


// getRandomInt function from Mozilla foundation
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


const Button = ({ handleClick, text }) => (
  <div>
    <button onClick={handleClick}>
      {text}
    </button>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [maxVotes, setMaxVotes] = useState(0)
  const [maxVotesIdx, setMaxVotesIdx] = useState(0)

  const handleRandomClick = () => {
    const newSelected = getRandomInt(0, anecdotes.length)
    setSelected(newSelected)
  }

  const handleVoteClick = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1

    // see if vote pushes the vote over the max
    if (votesCopy[selected] > maxVotes) {
      const newMaxVotes = votesCopy[selected]
      setMaxVotes(newMaxVotes)
      setMaxVotesIdx(selected)
    }
    setVotes(votesCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes </p>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleRandomClick} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxVotesIdx]}
      <p>has {votes[maxVotesIdx]} votes</p>
    </div>
  )
}

export default App
