/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useContext } from "react"
import NotificationContext from "../context"



const Anecdote = ({ anecdote, handleClick }) => (
    <li>
      {anecdote.content} has {anecdote.votes} <button onClick={handleClick}>vote</button>
    </li>
)

const AnecdoteList = ({ anecdotes }) => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const updateAdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newAdote) => {
      const oldAdotes = queryClient.getQueryData(['anecdotes'])
      const newAdotes = oldAdotes.map(adote => 
        newAdote.id === adote.id
          ? newAdote
          : adote)
      queryClient.setQueryData(['anecdotes'], newAdotes)
    }
  })

  const handleVote = (anecdote) => {
    updateAdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({payload: `You just voted for '${anecdote.content}'`})
    setTimeout(() => dispatch(''), 5000)
  }

  return (
    <ol>
    {anecdotes.map(anecdote =>
      <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => handleVote(anecdote)} /> )
    } 
    </ol>
  )
}

export default AnecdoteList