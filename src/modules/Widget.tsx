import React, {useCallback, memo} from 'react'
import {useDispatch} from 'react-redux'
import {removeWidget} from '../redux/dashboardslice'
import {Widget as WidgetType} from '../types'

interface WidgetProps {
  widget: WidgetType
  categoryId: string
}

const Widget: React.FC<WidgetProps> = memo(({widget, categoryId}) => {
  const dispatch = useDispatch()

  const handleRemove = useCallback(() => {
    dispatch(removeWidget({categoryId, widgetId: widget.id}))
  }, [dispatch, categoryId, widget.id])

  return (
    <article className='bg-white p-4 rounded shadow h-[200px]'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold'>{widget.name}</h3>
        <button
          onClick={handleRemove}
          className='text-red-500 hover:text-red-700'
          aria-label='Remove widget'
        >
          ×
        </button>
      </div>
      <p>{widget.content}</p>
    </article>
  )
})

Widget.displayName = 'Widget'

export default Widget
