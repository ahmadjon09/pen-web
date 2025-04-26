import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <section className='h-screen bg-gray-100 flex items-center justify-center'>
      <div className='text-center space-y-6'>
        <h1 className='text-9xl font-extrabold text-gray-800 flex items-center justify-center'>
          <span className='text-blue-700'>4</span>
          <span className='mx-2'>0</span>
          <span className='text-blue-700'>4</span>
        </h1>
        <p className='text-2xl font-semibold text-gray-700'>
          Бу саҳифа учун қўшимча молиявий ёрдам зарур! 😊
        </p>
        <div className='flex gap-5 justify-center'>
          <Link
            to='/'
            className='inline-block rounded-full bg-blue-700 hover:bg-blue-800 transition-colors px-6 py-3 text-white font-bold text-lg shadow-lg'
          >
            Ортга қайтиш
          </Link>
          <a
            href='https://t.me/MoliyaviyYordamBot'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block rounded-full bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 text-white font-bold text-lg shadow-lg'
          >
            Молиявий Ёрдам
          </a>
        </div>
      </div>
    </section>
  )
}
