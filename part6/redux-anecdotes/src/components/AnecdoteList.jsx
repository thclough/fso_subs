/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux' 
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => (
    <li>
      {anecdote.content} has {anecdote.votes} <button onClick={handleClick}>vote</button>
    </li>
)

const AnecdoteList = () => {
  const dispatch = useDispatch() // highlight-line
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    
    return filter === ''
      ? anecdotes 
      : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(changeNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => dispatch(changeNotification('')), 5000)
  }
    
  return (
    <ol>
    {anecdotes.map(anecdote =>
      <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote)} /> )
    } 
    </ol>
  )
}


export default AnecdoteList


