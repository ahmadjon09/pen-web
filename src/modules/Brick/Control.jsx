import React, { useState } from 'react'
import Axios from '../../Axios'
import { Loader2, Save } from 'lucide-react'
import { mutate } from 'swr'

export const Control = ({ setIsOpen, id, mode }) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [brickData, setBrickData] = useState({
    count: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setBrickData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (!['plus', 'minus'].includes(mode)) {
        throw new Error('Нотўғри режим')
      }

      await Axios.put(`/gish/${mode}/${id}`, { count: Number(brickData.count) })

      mutate('/gish')
      setIsOpen(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Нимадир нотўғри кетди')
    } finally {
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
        <h2 className='text-2xl font-bold mb-6 text-center'>
          {mode === 'plus' ? 'Ғиш сонини ошириш' : 'Ғиш сонини камайтириш'}
        </h2>

        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Сони <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            name='count'
            value={brickData.count}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500'
            placeholder='Сон киритинг'
            required
          />
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
