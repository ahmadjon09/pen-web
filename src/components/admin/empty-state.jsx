import { ShieldBan } from 'lucide-react'

export const EmptyState = () => {
  return (
    <div className='bg-gray-50 border border-gray-200 rounded-lg p-12 text-center'>
      <ShieldBan className='h-12 w-12 text-gray-400 mx-auto mb-4' />
      <p className='text-gray-600 text-center text-lg'>Админлар топилмади.</p>
    </div>
  )
}
