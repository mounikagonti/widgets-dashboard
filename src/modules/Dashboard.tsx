'use client'
import React, {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import Category from './Category'
import Header from './Header'
import SubHeader from './SubHeader'

const Dashboard: React.FC = () => {
  const categories = useSelector(
    (state: RootState) => state.dashboard.categories
  )

  const categoryComponents = useMemo(
    () =>
      categories.map((category) => (
        <Category key={category.id} category={category} />
      )),
    [categories]
  )

  return (
    <div className='p-4 bg-slate-50'>
      <Header />
      <SubHeader category={categories[0]} />
      {categoryComponents}
    </div>
  )
}

export default React.memo(Dashboard)
