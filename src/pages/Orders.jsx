import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import useSWR, { mutate } from 'swr'
import Axios from '../Axios'
import '../assets/css/home.css'
import { SearchBar } from '../components/Order/search-bar'
import { OrderTable } from '../components/Order/order-table'
import { EmptyState } from '../components/Order/empty-state'
import { LoadingState } from '../components/loading-state'
import { ErrorState } from '../components/error-state'
import { Month } from './Month'
import { OrderModal } from '../modules/OrderModal'

export const Orders = () => {
  const { data, isLoading, error } = useSWR('/client', Axios)
  const products = data?.data.data || []

  const [activeTab, setActiveTab] = useState('Буюртмалар')

  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState('name')
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleDelete = async id => {
    if (!window.confirm('Буюртмани ўчиришга ишончингиз комилми?')) return
    try {
      await Axios.delete(`goods/${id}`)
      mutate('/goods')
    } catch (error) {
      alert(error.response?.data?.message || 'Буюртмани ўчириб бўлмади')
    }
  }

  const openAddModal = () => {
    setIsModalOpen(true)
  }

  const openEditModal = id => {
    setEditProductId(id)
    setIsModalOpen(true)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <div className='container min-h-screen overflow-y-auto px-4'>
      <br />
      <br />
      <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-2 md:mb-0'>
          Буюртмалар
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
          Янги буюртма
        </button>
      </div>
      <div className='flex border-b border-blue-200 bg-white'>
        <button
          onClick={() => setActiveTab('Буюртмалар')}
          className={`px-6 hover:cursor-pointer py-3 font-medium text-sm transition-colors ${
            activeTab === 'Буюртмалар'
              ? 'border-b-2 border-blue-600 text-blue-700'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          Буюртмалар
        </button>
        <button
          onClick={() => setActiveTab('Ойлик ҳисобот')}
          className={`px-6 hover:cursor-pointer py-3 font-medium text-sm transition-colors ${
            activeTab === 'Ойлик ҳисобот'
              ? 'border-b-2 border-blue-600 text-blue-700'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          Ойлик ҳисобот
        </button>
      </div>
      <br />
      {activeTab === 'Буюртмалар' ? (
        <>
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error.response.data.message} />
          ) : filteredProducts.length > 0 ? (
            <OrderTable
              products={filteredProducts}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
            />
          ) : (
            <EmptyState searchTerm={searchTerm} onClearSearch={clearSearch} />
          )}
        </>
      ) : (
        <Month data={products} />
      )}
      {isModalOpen && (
        <OrderModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </div>
  )
}
