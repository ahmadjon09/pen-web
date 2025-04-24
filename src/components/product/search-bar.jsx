import { useState, useRef, useEffect } from 'react'
import {
  Search,
  Filter,
  ChevronDown,
  Tag,
  Calendar,
  Package
} from 'lucide-react'

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  searchBy,
  setSearchBy
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    function handleClickOutside (event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
  }

  const handleSearchByChange = criteria => {
    setSearchBy(criteria)
    setIsFilterOpen(false)
  }

  const getSearchIcon = () => {
    switch (searchBy) {
      case 'name':
        return <Search className='h-4 w-4' />
      case 'date':
        return <Calendar className='h-4 w-4' />
      case 'count':
        return <Package className='h-4 w-4' />
      default:
        return <Search className='h-4 w-4' />
    }
  }

  const getSearchPlaceholder = () => {
    switch (searchBy) {
      case 'name':
        return 'Номи бўйича қидириш...'
      case 'date':
        return 'Сана бўйича қидириш... (КК.ОО.ЙЙЙЙ)'
      case 'count':
        return 'Омбордаги миқдори бўйича қидириш...'
      default:
        return 'Қидириш...'
    }
  }

  return (
    <div className='w-full md:w-auto flex flex-1 md:max-w-md relative'>
      <div className='relative flex-1'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500'>
          {getSearchIcon()}
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder={getSearchPlaceholder()}
        />
      </div>

      <div className='relative' ref={filterRef}>
        <button
          type='button'
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className='flex items-center justify-center gap-2 px-4 py-[13px] bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors'
        >
          <Filter className='h-4 w-4' />
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${
              isFilterOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isFilterOpen && (
          <div className='absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200'>
            <button
              onClick={() => handleSearchByChange('name')}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                searchBy === 'name'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700'
              }`}
            >
              <Search className='h-4 w-4' />
              Номи бўйича
            </button>

            <button
              onClick={() => handleSearchByChange('date')}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                searchBy === 'date'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700'
              }`}
            >
              <Calendar className='h-4 w-4' />
              Сана бўйича
            </button>
            <button
              onClick={() => handleSearchByChange('count')}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                searchBy === 'count'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700'
              }`}
            >
              <Package className='h-4 w-4' />
              Миқдори бўйича
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
