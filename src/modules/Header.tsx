import React from 'react'
import SearchWidget from './SearchWidget'

const Header: React.FC = React.memo(() => {
  return (
    <header className='relative flex justify-between flex-wrap'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <SearchWidget />
    </header>
  )
})

Header.displayName = 'Header'

export default Header
