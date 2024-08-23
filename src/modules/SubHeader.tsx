import {TbRefresh} from 'react-icons/tb'
import {CiMenuKebab} from 'react-icons/ci'
import {FaClock} from 'react-icons/fa6'
import {Category as CategoryType} from '../types'
import AddWidgetButton from './AddWidgetButton'
import {memo} from 'react'

interface CategoryProps {
  category: CategoryType
}

const TIME_RANGE_OPTIONS = [
  {value: 'Last 1 days', label: 'Last 1 days'},
  {value: 'Last 2 days', label: 'Last 2 days'},
  {value: 'Today', label: 'Today'},
]
const SubHeader = memo(({category}: CategoryProps) => {
  return (
    <div className='flex flex-col sm:flex-row justify-between items-center flex-wrap gap-4 sm:gap-6 '>
      <h4 className='text-2xl font-bold mb-4 sm:mb-0'>CNAPP Dashboard</h4>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
        <AddWidgetButton categoryId={category.id} iconPlacement='right' />
        <button className='border p-2 rounded-sm'>
          <TbRefresh />
        </button>
        <button className='border p-2 rounded-sm'>
          <CiMenuKebab />
        </button>
        <div className='flex items-center border p-2 rounded-sm gap-1'>
          <div className='border-r pr-2'>
            <FaClock />
          </div>
          <select className='bg-transparent'>
            {TIME_RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
})

SubHeader.displayName = 'SubHeader'

export default SubHeader
