import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine2 = ( {text, value} ) =>
(
<div>{text} {value}</div>
)

const StatisticsLine = ( {text, value} ) =>
  (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good * 1 + bad * -1)/total
  const percent_pos = String((good/total) * 100) + " %"

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
 return (
 <table>
  <tbody>
    <StatisticsLine text="good" value={good}/>
    <StatisticsLine text="neutral" value={neutral}/>
    <StatisticsLine text="bad" value={bad}/>
    <StatisticsLine text="average" value={average} />
    <StatisticsLine text="positive" value={percent_pos} />
  </tbody>
  </table>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleBadClick = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
