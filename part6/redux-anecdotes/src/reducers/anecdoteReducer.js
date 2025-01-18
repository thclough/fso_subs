/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const changedAnecdote = action.payload
      // sorted here for greater efficiency
      // doesn't have to keep sorting same order in frontend
      const newBody = state
        .map(a => 
          a.id !== changedAnecdote.id ? a : changedAnecdote
        )
      return newBody
    }, 
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer