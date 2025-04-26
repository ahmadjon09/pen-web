import React, { useState } from 'react'
import { Send } from 'lucide-react'
import Axios from '../../Axios'
import moment from 'moment-timezone'

export const WorkerDayTable = ({ products }) => {
  const [workerData, setWorkerData] = useState({})
  const [countPrice, setCountPrice] = useState(300)
  const [loadPrice, setLoadPrice] = useState(300)

  const handleInputChange = (e, id) => {
    const { name, value } = e.target
    setWorkerData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
        allPrice: calculateAllPrice(prev[id]?.count || 0, prev[id]?.load || 0)
      }
    }))
  }

  const handleSubmit = async (e, id) => {
    e.preventDefault()
    const { count = 0, load = 0, type = '' } = workerData[id] || {}

    const payload = {
      count: Number(count),
      load: Number(load),
      type: type,
      allPrice: calculateAllPrice(count, load),
      countPrice: countPrice,
      loadPrice: loadPrice
    }

    try {
      await Axios.put(`worker-name/${id}`, payload)
      setWorkerData(prev => ({
        ...prev,
        [id]: { count: 0, load: 0, type: '' }
      }))
      alert('✅ Мувофақиятли янгиланди!')
    } catch (error) {
      alert('❌ Хатолик юз берди!')
      console.log(error)
    }
  }

  const calculateAllPrice = (count, load) => {
    const c = Number(count) || 0
    const l = Number(load) || 0
    return c * countPrice + l * loadPrice
  }

  return (
    <div className='p-5 w-full h-full overflow-y-auto'>
      <div className='w-full flex flex-col gap-4 mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Ишчилар маълумотлари
        </h1>

        {/* Umumiy Price inputlari */}
        <div className='flex gap-4 flex-wrap'>
          <div className='flex flex-col'>
            <label className='font-semibold text-gray-700'>
              📌 Бирта сон учун нарх (Count)
            </label>
            <input
              type='number'
              value={countPrice}
              onChange={e => setCountPrice(Number(e.target.value))}
              className='border border-gray-300 rounded-md p-2 w-40 focus:ring focus:ring-blue-300'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold text-gray-700'>
              📌 Бирта юклаш учун нарх (Load)
            </label>
            <input
              type='number'
              value={loadPrice}
              onChange={e => setLoadPrice(Number(e.target.value))}
              className='border border-gray-300 rounded-md p-2 w-40 focus:ring focus:ring-blue-300'
            />
          </div>
        </div>
      </div>

      {products?.length > 0 && (
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='h-full w-full pb-10 overflow-x-auto'>
            <table className='w-full text-sm sm:text-base border border-gray-200'>
              <thead className='bg-blue-600 text-white'>
                <tr>
                  <th className='py-3 px-2 sm:px-6 text-left'>Исми</th>
                  <th className='py-3 px-2 sm:px-4 text-center'>Сони</th>
                  <th className='py-3 px-2 sm:px-4 text-center'>Юклаш</th>
                  <th className='py-3 px-2 sm:px-4 text-center'>Тури</th>
                  <th className='py-3 px-2 sm:px-4 text-center'>Амал</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {products.map(worker => {
                  const {
                    count = 0,
                    load = 0,
                    type = ''
                  } = workerData[worker._id] || {}

                  return (
                    <tr
                      key={worker._id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='py-3 px-2 sm:px-6 text-gray-700 text-left'>
                        <div className='flex flex-col'>
                          <p className='font-bold'>{worker.name || '-'}</p>
                          <p className='text-[10px] text-gray-500'>
                            {moment(worker.createdAt)
                              .tz('Asia/Tashkent')
                              .format('DD.MM.YYYY || HH:mm')}
                          </p>
                        </div>
                      </td>

                      <td className='py-3 px-2 sm:px-4'>
                        <input
                          type='number'
                          name='count'
                          className='border border-gray-300 rounded-md w-20 text-center text-black focus:ring focus:ring-blue-300'
                          value={count}
                          onChange={e => handleInputChange(e, worker._id)}
                        />
                      </td>

                      <td className='py-3 px-2 sm:px-4'>
                        <input
                          type='number'
                          name='load'
                          className='border border-gray-300 rounded-md w-20 text-center text-black focus:ring focus:ring-blue-300'
                          value={load}
                          onChange={e => handleInputChange(e, worker._id)}
                        />
                      </td>

                      <td className='py-3 px-2 sm:px-4'>
                        <input
                          type='text'
                          name='type'
                          placeholder='Номи...'
                          className='border border-gray-300 rounded-md w-28 text-center text-black focus:ring focus:ring-blue-300'
                          value={type}
                          onChange={e => handleInputChange(e, worker._id)}
                        />
                      </td>

                      <td className='py-3 px-2 sm:px-4 text-center'>
                        <button
                          className='bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2 transition-colors'
                          onClick={e => handleSubmit(e, worker._id)}
                        >
                          <Send className='w-4 h-4' />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
