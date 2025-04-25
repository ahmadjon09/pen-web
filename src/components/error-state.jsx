export const ErrorState = ({ message }) => {
  return (
    <div className='bg-red-50 border border-red-200 rounded-md p-6 text-center'>
      <p className='text-red-500 text-center text-xl'>Хатолик: {message}</p>
    </div>
  )
}
