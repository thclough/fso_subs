/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux' 
import { voteForAnecdote } from '../reducers/anecdoteReducer'



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
    
  return (
    <ol>
    {anecdotes.map(anecdote =>
      <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => dispatch(voteForAnecdote(anecdote.id))} /> )
    } 
    </ol>
  )
}


export default AnecdoteList


