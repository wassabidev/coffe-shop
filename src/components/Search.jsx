import React from 'react'

const Search = ({ className }) => {
    return (
        <div className={className}>
            <input type="text" placeholder='Buscar por nombre...' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-1 focus:border-gray-500 focus:ring-gray-500' />
        </div>
    )
}

export default Search
