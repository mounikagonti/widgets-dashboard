'use client'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addWidget} from '../redux/dashboardslice'
import {IoMdClose} from 'react-icons/io'
import Tabs from './Tabs'
import {RootState} from '@/redux/store'

interface AddWidgetFormProps {
  categoryId: string
  setIsAddWidgetOpen: React.Dispatch<React.SetStateAction<boolean>>
  isAddWidgetOpen: boolean
}

const AddWidgetForm: React.FC<AddWidgetFormProps> = ({
  categoryId,
  setIsAddWidgetOpen,
  isAddWidgetOpen,
}) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(categoryId)
  const [selectedWidgets, setSelectedWidgets] = useState<Set<number>>(new Set())
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsAddWidgetOpen(true)

    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleOnClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedWidgetsFromStore = useSelector(
    (state: RootState) =>
      new Set(
        state.dashboard.categories
          .find((category) => category.id === categoryId)
          ?.widgets.map((widget) => widget.id)
      )
  )

  const handleCheckboxChange = useCallback((widgetId: number) => {
    setSelectedWidgets((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(widgetId)) {
        newSet.delete(widgetId)
      } else {
        newSet.add(widgetId)
      }
      return newSet
    })
  }, [])

  const handleOnClose = useCallback(() => {
    setSelectedWidgets(new Set())
    setIsAddWidgetOpen(false)
  }, [setIsAddWidgetOpen])

  const clearSelectedWidgets = useCallback(() => {
    setSelectedWidgets(new Set())
  }, [])

  const handleSubmitWidget = useCallback(() => {
    selectedWidgets.forEach((widgetId) => {
      dispatch(
        addWidget({
          categoryId: activeTab,
          widget: {
            id: widgetId,
            name: `Widget ${widgetId}`,
            content: `Content for Widget ${widgetId}`,
          },
        })
      )
    })
    handleOnClose()
  }, [activeTab, dispatch, handleOnClose, selectedWidgets])

  const renderWidgetsContent = () => {
    return (
      <div>
        {Array.from({length: 10}, (_, index) => {
          const widgetId = index + 1
          if (selectedWidgetsFromStore?.has(widgetId)) return null

          return (
            <div key={widgetId} className='flex gap-3 border p-2 mt-1 w-full'>
              <input
                type='checkbox'
                checked={selectedWidgets.has(widgetId)}
                onChange={() => handleCheckboxChange(widgetId)}
                className='items-center cursor-pointer'
              />
              <div>widget {widgetId}</div>
            </div>
          )
        })}
      </div>
    )
  }

  const WidgetsContent = useMemo(
    () => renderWidgetsContent,
    [selectedWidgets, selectedWidgetsFromStore, handleCheckboxChange]
  )

  const tabData = useMemo(
    () => [
      {id: 'cspm-executive', label: 'CSPM', content: <WidgetsContent />},
      {id: 'cwpp-dashboard', label: 'CWPP', content: <WidgetsContent />},
      {id: 'registry-scan', label: 'Image', content: <WidgetsContent />},
      {id: 'ticket', label: 'Ticket', content: <WidgetsContent />},
    ],
    [WidgetsContent]
  )

  return (
    <div
      ref={formRef}
      className={`fixed top-0 right-0 h-full w-full max-w-[600px] bg-slate-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isAddWidgetOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}
    >
      <div className='flex-grow overflow-auto'>
        <div className='flex justify-between bg-blue-800 p-2 text-white'>
          <div>Add widget</div>
          <div onClick={handleOnClose} className='cursor-pointer'>
            <IoMdClose />
          </div>
        </div>
        <p className='mt-2 p-2'>
          Personalise your dashboard adding following widget
        </p>
        <div className='flex gap-4 mt-3 cursor-pointer p-6'>
          <Tabs
            activeTabId={activeTab}
            tabs={tabData}
            onTabChange={(tabId: string) => {
              setActiveTab(tabId)
              clearSelectedWidgets()
            }}
          />
        </div>
      </div>
      <div className='flex justify-start gap-4 p-6 bg-white border-t'>
        <button
          onClick={handleOnClose}
          type='button'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Cancel
        </button>
        <button
          type='button'
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={handleSubmitWidget}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default React.memo(AddWidgetForm)
