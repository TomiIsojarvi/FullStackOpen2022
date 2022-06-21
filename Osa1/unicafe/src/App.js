import { useState } from 'react'

// Button - component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// StatisticLine - component
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// Statistics - component
const Statistics = ({ good, neutral, bad }) => {

  // getAll - Returns number of all votes
  const getAll = () => good + neutral + bad

  // getAverage - Returns average rating (good = 1, neutral = 0, bad = -1)
  const getAverage = () => {
    let ratings = good - bad
    return ratings / getAll()
  }

  // getPositives - Returns percentage of all positive votes
  const getPositives = () => good / getAll() * 100 + ' %'

  // Conditional rendering
  if (getAll() === 0)
    return <div>No feedback given</div>

  return (
    <table>
      <tbody>
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='All' value={getAll()} />
        <StatisticLine text='Average' value={getAverage()} />
        <StatisticLine text='Positive' value={getPositives()} />
      </tbody>
    </table>
  )
}

// App - component
const App = () => {
  // States
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Event handlers
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  // Render
  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={handleGoodClick}
        text='Good'
      />
      <Button
        handleClick={handleNeutralClick}
        text='Neutral'
      />
      <Button
        handleClick={handleBadClick}
        text='Bad'
      />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App