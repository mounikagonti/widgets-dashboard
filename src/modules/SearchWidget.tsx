'use client'

import React, {useState, useMemo, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'

const SearchWidget: React.FC = React.memo(() => {
  const [search, setSearch] = useState('')
  const [isResultsVisible, setIsResultsVisible] = useState(false)
  const categories = useSelector(
    (state: RootState) => state.dashboard.categories
  )

  const allWidgets = useMemo(
    () =>
      categories.flatMap((category) =>
        category.widgets.map((widget) => ({
          ...widget,
          categoryName: category.name,
        }))
      ),
    [categories]
  )

  const filteredWidgets = useMemo(
    () =>
      allWidgets.filter((widget) =>
        widget.name.toLowerCase().includes(search.toLowerCase())
      ),
    [allWidgets, search]
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setIsResultsVisible(e.target.value.length > 0)
    },
    []
  )

  return (
    <div className='relative mb-4'>
      <input
        type='text'
        value={search}
        onChange={handleSearchChange}
        placeholder='Search widgets'
        className='border p-2 rounded-sm w-full lg:max-w-[500px]'
      />
      {isResultsVisible && (
        <ul className='absolute top-full left-0 right-0 mt-2 bg-white border rounded-sm shadow-lg z-10'>
          {filteredWidgets.map((widget) => (
            <li key={widget.id} className='p-2 hover:bg-gray-100 cursor-pointer'>
              {widget.name} ({widget.categoryName})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})

SearchWidget.displayName = 'SearchWidget'

export default SearchWidget
