import React, {useMemo} from 'react'
import {Category as CategoryType} from '../types'
import Widget from './Widget'
import AddWidgetButton from './AddWidgetButton'

interface CategoryProps {
  category: CategoryType
}

const Category: React.FC<CategoryProps> = React.memo(({category}) => {
  const widgets = useMemo(
    () =>
      category.widgets.map((widget) => (
        <Widget key={widget.id} widget={widget} categoryId={category.id} />
      )),
    [category.widgets, category.id]
  )

  return (
    <div className='mb-8'>
      <h3 className='text-xl font-semibold mb-4'>{category.name}</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {widgets}
        <div className='bg-white p-4 rounded shadow flex items-center justify-center h-[200px]'>
          <AddWidgetButton categoryId={category.id} />
        </div>
      </div>
    </div>
  )
})

Category.displayName = 'Category'

export default Category
