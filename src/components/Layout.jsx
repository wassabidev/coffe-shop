import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <main className=''>
        <Header></Header>
      {children}
    </main>
  )
}

export default Layout
