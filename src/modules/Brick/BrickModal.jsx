import React, { useState } from 'react'
import Axios from '../../Axios'
import { Loader2, Save } from 'lucide-react'
import { mutate } from 'swr'

export const BrickModal = ({ isOpen, setIsOpen }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [birckData, setBrickData] = useState({
    type: '',
    count: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target

    setBrickData(prevData => {
      const updatedData = { ...prevData, [name]: value }
      return updatedData
    })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await Axios.post('/gish/create', birckData)
      mutate('/gish')
    } catch (err) {
      setError(err.response?.data?.message || 'Нимадир нотўғри кетди')
    } finally {
      setIsOpen(false)
      setLoading(false)
    }
  }

  return (
    <section
      onClick={() => !loading && setIsOpen(false)}
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-[1001] p-4'
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleFormSubmit}
        className='bg-white rounded-lg shadow-lg p-8 max-w-xl w-full'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'> Янги Ғишлар</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Ғиш тури <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='type'
              value={birckData.name}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500'
              placeholder='Ғиш тури'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Сони <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              name='count'
              value={birckData.count}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500'
              placeholder='Сони'
              required
            />
          </div>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm'>
            {error}
          </div>
        )}

        <div className='flex justify-between gap-2'>
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition'
          >
            Бекор қилиш
          </button>
          <button
            type='submit'
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' />
                Юкланмоқда...
              </>
            ) : (
              <>
                <Save className='w-4 h-4' />
                Сақлаш
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
