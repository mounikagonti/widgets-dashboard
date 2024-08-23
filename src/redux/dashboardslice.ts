import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Category, Widget} from '../types'
import {initialData} from '../data/initialData'

interface DashboardState {
  categories: Category[]
}

const initialState: DashboardState = {
  categories: initialData.categories,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (
      state,
      action: PayloadAction<{categoryId: string; widget: Widget}>
    ) => {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      )
      if (category) {
        category.widgets.push(action.payload.widget)
      }
    },
    removeWidget: (
      state,
      action: PayloadAction<{categoryId: string; widgetId: number}>
    ) => {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      )
      if (category) {
        category.widgets = category.widgets.filter(
          (w) => w.id !== action.payload.widgetId
        )
      }
    },
  },
})

export const {addWidget, removeWidget} = dashboardSlice.actions
export default dashboardSlice.reducer
