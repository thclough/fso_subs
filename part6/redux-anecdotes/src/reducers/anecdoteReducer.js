/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      // sorted here for greater efficiency
      // doesn't have to keep sorting same order in frontend
      const newBody = state
        .map(a => 
          a.id !== id ? a : changedAnecdote
        )
        .sort((a,b) => b.votes - a.votes)
      return newBody
    }, 
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { createAnecdote, voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer