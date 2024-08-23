export interface Widget {
  id: number
  name: string
  content: string
}

export interface Category {
  id: string
  name: string
  widgets: Widget[]
}
