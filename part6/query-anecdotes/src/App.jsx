import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  
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
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>We are so sorry and ashamed to tell you there is a problem with the server</div>
  }

  const anecdotes = result.data

  const sortedAdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {sortedAdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
