import {configureStore} from '@reduxjs/toolkit'
import dashboardReducer from './dashboardslice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
