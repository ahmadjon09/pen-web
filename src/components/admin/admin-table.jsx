import { BadgeCheck, Trash2 } from 'lucide-react'
import VIP from '../../assets/vip.png'

export const AdminTable = ({ admins, handleDelete }) => {
  const isBoss = '673d5e4960bd823f58d06592'
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='h-full w-full pb-5 overflow-x-auto'>
        <table className='w-full text-sm sm:text-base'>
          <thead className='bg-blue-700 text-white'>
            <tr>
              <th className='py-3 px-2 sm:px-6 text-left'>Админлар</th>
              <th className='py-3 px-2 sm:px-6 text-left'>Исм</th>
              <th className='py-3 px-2 sm:px-6 text-left'>Фамилия</th>
              <th className='py-3 px-2 sm:px-6 text-left'>Телефон рақам </th>
              <th className='py-3 px-2 sm:px-4 text-center'>Амаллар</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {admins?.map(admin => (
              <tr
                key={admin._id}
                className={` transition-colors ${
                  admin._id == isBoss
                    ? 'bg-amber-100 cursor-not-allowed'
                    : 'hover:bg-blue-50 cursor-pointer'
                }`}
              >
                <td className='py-3 px-2 sm:px-6'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0'>
                      <img
                        src={admin.avatar || 'null'}
                        alt='Маҳсулот'
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <div
                        className={
                          admin._id === isBoss
                            ? 'font-bold text-yellow-400 flex items-start gap-1'
                            : ''
                        }
                      >
                        {admin.firstName || '-'}
                        {admin._id === isBoss && (
                          <BadgeCheck size={13} color='dodgerblue' />
                        )}
                      </div>
                      <span className='font-medium text-gray-500 truncate text-[10px]  max-w-[150px]'>
                        {admin.lastName || '-'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-6 text-gray-600'>
                  <div
                    className={
                      admin._id === isBoss &&
                      'font-bold text-yellow-400 flex items-start gap-1'
                    }
                  >
                    {admin.firstName || '-'}
                    {admin._id === isBoss && (
                      <BadgeCheck size={13} color='dodgerblue' />
                    )}
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-6 text-gray-600'>
                  {admin.lastName || '-'}
                </td>
                <td className='py-3 px-2 sm:px-6 font-medium text-blue-600 hover:underline'>
                  <div className='flex w-35 flex-col'>
                    <a className='w-full' href={`tel:+998${admin.phoneNumber}`}>
                      +(998) {admin.phoneNumber}
                    </a>
                  </div>
                </td>
                <td className='py-3 px-2 sm:px-4 text-center'>
                  {admin._id === isBoss ? (
                    <img className='w-10 mx-auto' src={VIP} alt='vip' />
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        handleDelete(admin._id)
                      }}
                      className='bg-red-500 text-white rounded-md p-1.5 hover:bg-red-600 transition-colors'
                    >
                      <Trash2 className='text-white w-4 h-4' />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
