import React, { useState } from 'react'
import Axios from '../Axios'
import { Eye, EyeOff, Loader2, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const AdminModal = ({ isOpen, setIsOpen }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setAdminData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await Axios.post('/admin/create', adminData)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Нимадир нотўғри кетди')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      title='Янги Админ қўшиш'
      onClick={() => !loading && setIsOpen(false)}
      className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-[1001] p-4'
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleFormSubmit}
        className='bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto'
      >
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Исми <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='firstName'
              value={adminData.firstName}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Админ исмини киритинг'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Фамилияси <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='lastName'
              value={adminData.lastName}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='Админ фамилиясини киритинг'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Телефон рақами <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              name='phoneNumber'
              value={adminData.phoneNumber}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              placeholder='99 123 45 67'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Парол <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={adminData.password}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10'
                placeholder='Паролни киритинг'
                required
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
              >
                {showPassword ? (
                  <EyeOff className='w-5 h-5' />
                ) : (
                  <Eye className='w-5 h-5' />
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm'>
            {error}
          </div>
        )}

        <div className='flex justify-between gap-1'>
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2 bg-gray-600 text-white hover:cursor-pointer rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2`}
          >
            бекор қилиш
          </button>
          <button
            type='submit'
            disabled={loading}
            className={`px-4 py-2 bg-purple-600 text-white hover:cursor-pointer rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Юкланмоқда...
              </>
            ) : (
              <>
                <Save className='h-4 w-4' />
                Сақлаш
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
