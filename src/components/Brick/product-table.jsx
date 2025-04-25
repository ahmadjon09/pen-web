import { Trash2 } from 'lucide-react'
import { formatCount } from '../../middlewares/format'
import moment from 'moment-timezone'

export const ProductTable = ({ products, handleDelete }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='h-full w-full pb-10 overflow-x-auto'>
        <table className='w-full text-sm sm:text-base'>
          <thead className='bg-blue-600 text-white'>
            <tr>
              <th className='py-3 px-2 sm:px-6 text-left'>Ғишлар</th>
              <th className='py-3 px-2 sm:px-4 text-left'>Миқдор</th>
              <th className='py-3 px-2 sm:px-4 text-center'>Амаллар</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {products.map(product => (
              <tr
                key={product._id}
                className='hover:bg-blue-50 transition-colors cursor-pointer'
              >
                <td className='py-3 px-2 sm:px-6 text-gray-600'>
                  <div className='flex flex-col items-start'>
                    <p className='font-bold'>{product.type || '-'}</p>
                    <p className='text-[10px] text-gray-500'>
                      {moment(product.createdAt)
                        .tz('Asia/Tashkent')
                        .format('DD.MM.YYYY || HH:mm')}
                    </p>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-6'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.count > 10
                        ? 'bg-green-100 text-green-800'
                        : product.count > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {formatCount(product.count)}
                  </span>
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
    </div>
  )
}
