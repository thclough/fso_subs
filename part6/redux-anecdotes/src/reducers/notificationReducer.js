import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      changeNotification(state, action) {
        return action.payload
      },
      clearNotification() {
        return null
      }
    }
})

export const { clearNotification, changeNotification } = notificationSlice.actions

export const flashNotification = (text, time_s) => {
  return dispatch => {
    dispatch(changeNotification(text))
    console.log(time_s * 1000)
    setTimeout(() => dispatch(clearNotification()), time_s * 1000)
  }
}

export default notificationSlice.reducer