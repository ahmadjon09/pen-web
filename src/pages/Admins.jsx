import { Plus } from 'lucide-react'
import useSWR, { mutate } from 'swr'
import Axios from '../Axios'
import '../assets/css/home.css'
import { AdminTable } from '../components/admin/admin-table'
import { LoadingState } from '../components/loading-state'
import { ErrorState } from '../components/admin/error-state'
import { AdminModal } from '../modules/AdminModal'
import { useState } from 'react'
import { EmptyState } from '../components/admin/empty-state'

export const Admins = () => {
  const { data, isLoading, error } = useSWR('/admin', Axios)
  const Admins = data?.data.data || []

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openAddModal = () => {
    setIsModalOpen(true)
  }
  const handleDelete = async id => {
    if (!window.confirm('Маҳсулотни ўчиришга ишончингиз комилми?')) return
    try {
      await Axios.delete(`admin/${id}`)
      mutate('/admin')
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
          Админлар рўйхати
        </h1>

        <button
          onClick={openAddModal}
          className='w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:cursor-pointer hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Янги aдмин
        </button>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error.response.data.message} />
      ) : Admins.length > 0 ? (
        <AdminTable admins={Admins} handleDelete={handleDelete} />
      ) : (
        <EmptyState />
      )}
      {isModalOpen && (
        <AdminModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </div>
  )
}
