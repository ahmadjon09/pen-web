import useSWR from 'swr'
import Axios from '../../Axios'
import { useEffect, useState } from 'react'
import { LoadingState } from '../../components/loading-state'
import { ErrorState } from '../../components/error-state'
import { SearchBar } from '../../components/Workers/search-bar'
import { EmptyState } from '../../components/Workers/empty-state'
import { WorkerDayTable } from '../../components/Workers/worker-day'

export const WorkerDay = () => {
  const { data, isLoading, error } = useSWR('/worker-name', Axios)
  const products = data?.data.data || []

  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState('name')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (!products.length) {
      if (filteredProducts.length !== 0) {
        setFilteredProducts([])
      }
      return
    }

    if (!searchTerm.trim()) {
      if (filteredProducts !== products) {
        setFilteredProducts(products)
      }
      return
    }

    const lowercasedTerm = searchTerm.toLowerCase()

    const filtered = products.filter(product => {
      switch (searchBy) {
        case 'name':
          return (
            product.name && product.name.toLowerCase().includes(lowercasedTerm)
          )
        case 'phone':
          return product.phoneNumber?.toString().includes(searchTerm)
        case 'date':
          const createdAt = new Date(product.createdAt)
          const formattedDate = createdAt.toLocaleDateString('uz-UZ')
          const isoDate = createdAt.toISOString().split('T')[0]

          return (
            formattedDate.includes(searchTerm) || isoDate.includes(searchTerm)
          )
        case 'count':
          return product.count?.toString().includes(searchTerm)
        default:
          return false
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, searchBy, products])

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <div className='p-5 w-full h-full overflow-y-auto'>
      <div className='w-full h-[100px] flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Ишчилар ишлари</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
      </div>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState
          message={error.response?.data?.message || 'Хатолик юз берди'}
        />
      ) : filteredProducts.length > 0 ? (
        <WorkerDayTable products={filteredProducts} />
      ) : (
        <EmptyState searchTerm={searchTerm} onClearSearch={clearSearch} />
      )}
    </div>
  )
}
