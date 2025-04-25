import Axios from './Axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from './components/Loading'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  getAdminError,
  getAdminPending,
  getAdminSuccess
} from './toolkit/AdminSlicer'
import { Root } from './layout/Root'
import { Login } from './pages/Login'
import { Auth } from './layout/Auth'
import { Admins } from './pages/Admins'
import { Home } from './pages/Goods/Home'
import { Orders } from './pages/Orders'
import { Bricks } from './pages/Bricks'

export default function App () {
  const { isAuth, isPending } = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    const getMyData = async () => {
      try {
        dispatch(getAdminPending())
        const response = await Axios.get('admin/me')
        if (response.data) {
          dispatch(getAdminSuccess(response.data.data))
        } else {
          dispatch(getAdminError('No Admin data available'))
        }
      } catch (error) {
        dispatch(getAdminError(error.response?.data || 'Unknown Token'))
        console.log(error)
      }
    }

    getMyData()
  }, [dispatch])

  if (isPending) {
    return <Loading />
  }
  const router = createBrowserRouter([
    isAuth
      ? {
          path: '/',
          element: <Root />,
          children: [
            { index: true, element: <Home /> },
            { path: 'admin', element: <Admins /> },
            { path: 'login', element: <Login /> },
            { path: 'orders', element: <Orders /> },
            { path: 'bricks', element: <Bricks /> }
          ]
        }
      : {
          path: '/',
          element: <Auth />,
          children: [
            { index: true, element: <Login /> },
            { path: '*', element: <Login /> }
          ]
        }
  ])

  return <RouterProvider router={router} />
}
