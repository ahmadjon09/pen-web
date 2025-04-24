import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Axios from '../Axios'
import { Eye } from 'lucide-react'
export const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { isAuth } = useSelector(state => state.admin)
  if (isAuth) {
    window.location.href = '/'
  }

  const handleLogin = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (phone.length !== 9) {
      setError('Телефонный номер должен состоять из 9 цифр.')
      setIsLoading(false)
      return
    }

    if (!password) {
      setError('Пожалуйста, введите пароль.')
      setIsLoading(false)
      return
    }

    try {
      const { data } = await Axios.post('admin/login', {
        password,
        phoneNumber: +phone
      })

      Cookies.set('token', data.token, { secure: true, expires: 7 })
      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className='h-screen bg-white flex items-center justify-center'>
        <div className='container px-4 h-full flex items-center justify-center'>
          <form
            className='flex flex-col gap-5 w-full max-w-[500px] bg-blue-500 shadow-2xl rounded-xl p-10'
            onSubmit={handleLogin}
          >
            <div className='flex items-center border border-white rounded-xl overflow-hidden'>
              <span className='w-1/6 text-center text-[12px] md:text-lg bg-transparent text-white border-r border-white'>
                +998
              </span>
              <input
                type='number'
                className='p-2 outline-none w-5/6 bg-transparent text-white'
                placeholder='Телефонный номер'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            <div className='relative'>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className='border border-white p-2 w-full rounded-xl bg-transparent text-white'
                placeholder='Введите пароль'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div
                className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Eye size={24} color='#fff' />
                ) : (
                  <Eye size={24} color='#fff' />
                )}
              </div>
            </div>
            {error && <p className='text-red-500 text-base mt-2'>{error}</p>}
            <button
              type='submit'
              className={`bg-green-600 py-2 text-white rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
                isLoading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
