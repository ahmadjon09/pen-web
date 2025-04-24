import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IsOpenModal } from '../assets/css/Modal'
import { getAdminSuccess } from '../toolkit/AdminSlicer'
import { X, Loader2, Save, User, Camera } from 'lucide-react'
import Axios from '../Axios'

export const UserUpdate = ({ isOpen, setIsOpen }) => {
  const userId = useSelector(state => state.admin.data._id)
  const [error, setError] = useState('')
  const [imagePending, setImagePending] = useState(false)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    newPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState('')

  useEffect(() => {
    if (userId && isOpen) {
      const getUser = async () => {
        try {
          setIsLoading(true)
          setError('')
          const response = await Axios.get(`admin/${userId}`)
          const userData = response.data.data

          setUserData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phoneNumber: userData.phoneNumber || '',
            avatar: userData.avatar || '',
            newPassword: ''
          })

          setPreviewAvatar(userData.avatar || '')
        } catch (error) {
          setError(error.response?.data?.message || 'Сервер хатоси юз берди.')
        } finally {
          setIsLoading(false)
        }
      }
      getUser()
    }
  }, [userId, isOpen])

  const handleInputChange = e => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setIsLoading(true)
      setError('')

      const updateData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        phoneNumber: userData.phoneNumber
      }

      if (userData.newPassword) {
        updateData.password = userData.newPassword
      }

      const { data } = await Axios.put(`admin/${userId}`, updateData)
      dispatch(getAdminSuccess(data.data))
      setIsOpen(false)
      IsOpenModal(false)
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Маълумотларни янгилашда хатолик юз берди.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`fixed transition-all duration-300 z-[999] top-0 ${
        isOpen ? 'right-0 bg-black/50' : '-right-full bg-transparent'
      } flex justify-end items-center w-full h-full`}
      onClick={e => {
        if (e.target === e.currentTarget) {
          IsOpenModal(false)
          setIsOpen(false)
        }
      }}
    >
      <div
        className={`w-full h-full overflow-y-auto max-w-md md:max-w-lg bg-white shadow-2xl border-l border-blue-300 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='sticky top-0 z-10 bg-white border-b border-blue-100 px-6 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold text-blue-700'>Профилни янгилаш</h1>
          <button
            type='button'
            onClick={() => {
              IsOpenModal(false)
              setIsOpen(false)
            }}
            className='p-1 rounded-full hover:bg-gray-100'
          >
            <X className='h-6 w-6 text-gray-500' />
          </button>
        </div>

        {isLoading && !imagePending ? (
          <div className='flex flex-col items-center justify-center h-[calc(100%-4rem)] p-8'>
            <Loader2 className='h-12 w-12 text-blue-600 animate-spin mb-4' />
            <p className='text-gray-600'>Юкланмоқда...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='p-6'>
            <div className='flex justify-center mb-8'>
              <div className='relative'>
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 ${
                    imagePending ? 'opacity-60' : ''
                  }`}
                >
                  {previewAvatar ? (
                    <img
                      src={previewAvatar || '/placeholder.svg'}
                      alt='Фойдаланувчи расми'
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-blue-100 flex items-center justify-center'>
                      <User className='h-12 w-12 text-blue-300' />
                    </div>
                  )}
                  {imagePending && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Loader2 className='h-8 w-8 text-blue-600 animate-spin' />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Исм
                </label>
                <input
                  className='p-3 outline-none border-2 border-blue-300 rounded-md w-full focus:border-blue-600 transition'
                  type='text'
                  placeholder='Исмингиз'
                  name='firstName'
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Фамилия
                </label>
                <input
                  className='p-3 outline-none border-2 border-blue-300 rounded-md w-full focus:border-blue-600 transition'
                  type='text'
                  placeholder='Фамилиянгиз'
                  name='lastName'
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Телефон рақами
                </label>
                <input
                  className='p-3 outline-none border-2 border-blue-300 rounded-md w-full focus:border-blue-600 transition'
                  type='number'
                  placeholder='Телефон рақамингиз'
                  name='phoneNumber'
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Янги пароль
                </label>
                <input
                  className='p-3 outline-none border-2 border-blue-300 rounded-md w-full focus:border-blue-600 transition'
                  type='password'
                  placeholder='Янги пароль (агар ўзгартирмоқчи бўлсангиз)'
                  name='newPassword'
                  value={userData.newPassword}
                  onChange={handleInputChange}
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Агар паролни ўзгартирмоқчи бўлмасангиз, бўш қолдиринг
                </p>
              </div>
            </div>

            {error && (
              <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm'>
                {error}
              </div>
            )}

            <div className='grid grid-cols-2 gap-4 mt-6'>
              <button
                type='button'
                onClick={() => {
                  IsOpenModal(false)
                  setIsOpen(false)
                }}
                className='bg-gray-100 rounded-md flex justify-center items-center gap-2 text-gray-700 py-3 font-medium hover:bg-gray-200 transition'
              >
                <X className='h-4 w-4' />
                Бекор қилиш
              </button>
              <button
                type='submit'
                disabled={imagePending || isLoading}
                className={`${
                  imagePending || isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } rounded-md text-white py-3 font-medium transition flex justify-center items-center gap-2`}
              >
                {imagePending || isLoading ? (
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
        )}
      </div>
    </div>
  )
}
