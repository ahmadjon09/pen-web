import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut,
  Menu,
  Pencil,
  X,
  ChevronDown,
  ShieldUser,
  ListOrdered,
  Cuboid,
  Pickaxe,
  Calendar,
  Package
} from 'lucide-react'
import Cookies from 'js-cookie'
import { IsOpenModal } from '../assets/css/Modal'
import { UserUpdate } from '../modules/userUpdate'
import { Link, useLocation } from 'react-router-dom'

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useSelector(state => state.admin)
  const [isOpenU, setIsOpenU] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  const navLinks = [
    { name: 'Келган товар', path: '/', icon: <Package size={18} /> },
    { name: 'Админлар', path: '/admin', icon: <ShieldUser size={18} /> },
    { name: 'Буюртмалар', path: '/orders', icon: <ListOrdered size={18} /> },
    { name: 'Ғиш', path: '/bricks', icon: <Cuboid size={18} /> },
    { name: 'Ишчилар', path: '/workers', icon: <Pickaxe size={18} /> },
    { name: 'Ишчилар куни', path: '/workers/day', icon: <Calendar size={18} /> }
  ]

  useEffect(() => {
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleLogout () {
    if (!window.confirm('Админ сифатида чиқишни хоҳлайсизми?')) return
    Cookies.remove('token')
    window.location.href = '/'
  }

  return (
    <nav className='w-full fixed top-0 left-0 h-[60px] z-[99] bg-gradient-to-r from-blue-700 to-blue-600 shadow-md'>
      <div className='container w-full h-full flex items-center justify-between px-4'>
        <div className='navv items-center space-x-1'>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5
                ${
                  location.pathname === link.path
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <button
          className='absolute top-2 right-1 text-white p-2 navvbtn'
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Ёпиш' : 'Меню'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className='flex navv relative items-center gap-3 text-xl font-bold text-white'>
          <div
            className='flex items-center cursor-pointer relative'
            onClick={() => setShowDropdown(!showDropdown)}
            ref={dropdownRef}
          >
            <div className='relative'>
              <img
                className='w-8 h-8 rounded-full object-cover border-2 border-white/30'
                src={data.avatar || '/placeholder.svg'}
                alt='Фойдаланувчи'
              />
              <div className='absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-blue-700'></div>
            </div>

            <div className='ml-2 flex items-center gap-1'>
              <span className='text-sm font-medium hidden sm:block'>
                {data.firstName || 'Фойдаланувчи'}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  showDropdown ? 'rotate-180' : ''
                }`}
              />
            </div>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20'
                >
                  <div className='px-4 py-2 border-b border-gray-100'>
                    <p className='text-sm font-medium text-gray-900'>
                      {data.firstName} {data.lastName}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>Админ</p>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setIsOpenU(true)
                      IsOpenModal(true)
                      setShowDropdown(false)
                    }}
                    className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2'
                  >
                    <Pencil size={14} />
                    Профилни таҳрирлаш
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleLogout()
                    }}
                    className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2'
                  >
                    <LogOut size={14} />
                    Чиқиш
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden absolute z-[99] top-[60px] left-0 w-full bg-blue-800 text-white flex flex-col gap-3 p-4 text-lg shadow-lg rounded-b-lg overflow-hidden'
          >
            {/* Mobile Navigation Links */}
            <div className='flex flex-col gap-1 mb-2'>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors
                    ${
                      location.pathname === link.path
                        ? 'bg-blue-700 text-white'
                        : 'hover:bg-blue-700/70 text-blue-100'
                    }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            <div className='border-t border-blue-700 my-1'></div>

            <div className='flex items-center gap-3'>
              <div className='relative'>
                <img
                  className='w-10 h-10 rounded-full object-cover border-2 border-white/30'
                  src={data.avatar || '/placeholder.svg'}
                  alt='Фойдаланувчи'
                />
                <div className='absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-blue-800'></div>
              </div>

              <div className='flex flex-col'>
                <span className='font-medium text-white'>
                  {data.firstName} {data.lastName}
                </span>
                <span className='text-xs text-blue-200'>Админ</span>
              </div>
            </div>

            <div className='flex flex-col gap-2 mt-2 border-t border-blue-700 pt-3'>
              <button
                onClick={() => {
                  setIsOpenU(true)
                  IsOpenModal(true)
                  setIsOpen(false)
                }}
                className='flex items-center gap-2 py-2 px-3 rounded-md hover:bg-blue-700 transition-colors'
              >
                <Pencil size={16} />
                Профилни таҳрирлаш
              </button>

              <button
                onClick={handleLogout}
                className='flex items-center gap-2 py-2 px-3 rounded-md text-red-300 hover:bg-blue-700 transition-colors'
              >
                <LogOut size={16} />
                Чиқиш
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpenU && <UserUpdate isOpen={isOpenU} setIsOpen={setIsOpenU} />}
    </nav>
  )
}
