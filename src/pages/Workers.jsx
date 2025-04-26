import { Plus } from 'lucide-react'
import useSWR, { mutate } from 'swr'
import Axios from '../Axios'
import '../assets/css/home.css'
import { LoadingState } from '../components/loading-state'
import { ErrorState } from '../components/error-state'
import { useEffect, useState } from 'react'
import { EmptyState } from '../components/Workers/empty-state'
import { WorkerTable } from '../components/Workers/worker-table'
import { SearchBar } from '../components/Workers/search-bar'
import { WorkerModal } from '../modules/WorkerModal'

export const Workers = () => {
  const { data, isLoading, error } = useSWR('/worker-name', Axios)
  const products = data?.data.data || []
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState('name')
  const [isModalOpen, setIsModalOpen] = useState(false)
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
          return product.phoneNumber.toString().includes(searchTerm)

        case 'date':
          const createdAt = new Date(product.createdAt)
          const formattedDate = createdAt.toLocaleDateString('uz-UZ')
          const isoDate = createdAt.toISOString().split('T')[0]

          return (
            formattedDate.includes(searchTerm) || isoDate.includes(searchTerm)
          )

        case 'count':
          return product.count.toString().includes(searchTerm)

        default:
          return false
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, searchBy, products])

  const clearSearch = () => {
    setSearchTerm('')
  }
  const openAddModal = () => {
    setIsModalOpen(true)
  }
  const handleDelete = async id => {
    if (!window.confirm('Маҳсулотни ўчиришга ишончингиз комилми?')) return
    try {
      await Axios.delete(`/worker-name/${id}`)
      mutate('/worker-name')
    } catch (error) {
      alert(error.response?.data?.message || 'Маҳсулотни ўчириб бўлмади')
    }
  }

  return (
    <div className='container min-h-screen overflow-y-auto px-4'>
      <br />
      <br />
      <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-2 md:mb-0'>
          Ишчилар рўйхати
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
        <button
          onClick={openAddModal}
          className='w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:cursor-pointer hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Янги Ишчи
        </button>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error.response.data.message} />
      ) : filteredProducts.length > 0 ? (
        <WorkerTable products={filteredProducts} handleDelete={handleDelete} />
      ) : (
        <EmptyState searchTerm={searchTerm} onClearSearch={clearSearch} />
      )}
      {isModalOpen && (
        <WorkerModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </div>
  )
}
