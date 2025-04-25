import { FileX2 } from 'lucide-react'

export const EmptyState = ({ searchTerm, onClearSearch }) => {
  return (
    <div className='bg-gray-50 border border-gray-200 rounded-lg p-12 text-center'>
      <FileX2 className='h-12 w-12 text-gray-400 mx-auto mb-4' />
      <p className='text-gray-600 text-center text-lg'>
        {searchTerm ? 'Қидирув натижалари топилмади.' : 'Буюртмалар топилмади.'}
      </p>
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className='mt-4 text-blue-600 hover:text-blue-700 font-medium'
        >
          Қидирувни тозалаш
        </button>
      )}
    </div>
  )
}
