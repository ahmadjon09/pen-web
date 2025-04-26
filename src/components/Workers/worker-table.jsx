import { useState } from 'react'
import moment from 'moment-timezone'
import { Trash2 } from 'lucide-react'
import { ViewModal } from './View'
import { Month } from './Month'

export const WorkerTable = ({ products, handleDelete }) => {
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('Келган товарлар')

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='h-full w-full pb-10 overflow-x-auto'>
        <table className='w-full text-sm sm:text-base'>
          <thead className='bg-blue-600 text-white'>
            <tr>
              <th className='py-3 px-2 sm:px-6 text-left'>Ишчилар</th>
              <th className='py-3 px-2 sm:px-4 text-left'>Исми</th>
              <th className='py-3 px-2 sm:px-4 text-left'>Тел рақами</th>
              <th className='py-3 px-2 sm:px-4 text-center'>Амаллар</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {products.map(product => (
              <tr
                key={product._id}
                className='hover:bg-blue-50 transition-colors cursor-pointer'
                onClick={() => {
                  setSelectedWorker(product)
                  setShowModal(true)
                  setActiveTab('Келган товарлар') // default tab
                }}
              >
                <td className='py-3 px-2 sm:px-6 text-gray-600'>
                  <div className='flex flex-col items-start'>
                    <p className='font-bold'>{product.name || '-'}</p>
                    <p className='text-[10px] text-gray-500'>
                      {moment(product.createdAt)
                        .tz('Asia/Tashkent')
                        .format('DD.MM.YYYY || HH:mm')}
                    </p>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-6 text-gray-600'>
                  {product.name || '-'}
                </td>
                <td className='py-3 px-2 sm:px-6 font-medium text-blue-600 hover:underline'>
                  <div className='flex w-35 flex-col'>
                    <a
                      className='w-full'
                      href={`tel:+998${product.phoneNumber}`}
                    >
                      +(998) {product.phoneNumber}
                    </a>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-4 text-center'>
                  <div className='flex justify-center items-center gap-2'>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        handleDelete(product._id)
                      }}
                      className='bg-red-500 text-white rounded-md p-1.5 hover:bg-red-600 transition-colors'
                    >
                      <Trash2 className='text-white w-4 h-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedWorker && (
        <div className='fixed inset-0 bg-black/90 bg-opacity-30 flex justify-center items-center z-50'>
          <div className='bg-white p-5 rounded-lg w-[90%] max-w-3xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>{selectedWorker.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✖
              </button>
            </div>

            <div className='flex border-b border-blue-200 bg-white'>
              <button
                onClick={() => setActiveTab('Келган товарлар')}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'Келган товарлар'
                    ? 'border-b-2 border-blue-600 text-blue-700'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Келган товарлар
              </button>
              <button
                onClick={() => setActiveTab('Ойлик ҳисобот')}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'Ойлик ҳисобот'
                    ? 'border-b-2 border-blue-600 text-blue-700'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                Ойлик ҳисобот
              </button>
            </div>

            <div className='mt-4'>
              {activeTab === 'Келган товарлар' ? (
                <ViewModal data={selectedWorker.g} />
              ) : (
                <Month data={selectedWorker.g} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
