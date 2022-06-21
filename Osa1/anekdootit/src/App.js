import React, { useState } from 'react';

// Button - component
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

// Anecdote - component
const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>Has {votes} votes.</p>
  </div>
)

// App - component
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const maxNumber = anecdotes.length

  // Hooks
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(maxNumber).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  // Event handlers
  const selectRandom = () => {
    const random = Math.floor(Math.random() * maxNumber)
    setSelected(random)
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    // Set the most voted anecdote
    const max = Math.max(...copy)
    const index = copy.indexOf(max)
    setMostVotes(index)
  }

  // Render
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={selectRandom} text="Next anecdote" />
      <Button handleClick={voteAnecdote} text="Vote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  );
}

export default App