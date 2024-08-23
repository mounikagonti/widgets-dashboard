import React, {useCallback, useMemo} from 'react'
import AddWidgetForm from './AddWidgetForm'
import {FaPlus} from 'react-icons/fa6'

interface AddWidgetButtonProps {
  categoryId: string
  iconPlacement?: 'left' | 'right'
}

function AddWidgetButton({
  categoryId,
  iconPlacement = 'left',
}: AddWidgetButtonProps) {
  const [isAddWidgetOpen, setIsAddWidgetOpen] = React.useState(false)

  const handleOnAddWidget = useCallback(() => {
    setIsAddWidgetOpen(true)
  }, [])

  const buttonContent = useMemo(
    () => (
      <>
        {iconPlacement === 'left' && <FaPlus />}
        <span>Add Widget</span>
        {iconPlacement === 'right' && <FaPlus />}
      </>
    ),
    [iconPlacement]
  )

  return (
    <>
      <button
        onClick={handleOnAddWidget}
        className='flex items-center gap-1 border rounded p-2'
      >
        {buttonContent}
      </button>
      {isAddWidgetOpen && (
        <div className='absolute top-0 right-0 z-50'>
          <AddWidgetForm
            isAddWidgetOpen={isAddWidgetOpen}
            categoryId={categoryId}
            setIsAddWidgetOpen={setIsAddWidgetOpen}
          />
        </div>
      )}
    </>
  )
}

export default React.memo(AddWidgetButton)
