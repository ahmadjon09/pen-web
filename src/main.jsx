import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import AdminReducer from './toolkit/AdminSlicer.jsx'
import './assets/css/nav.css'
const store = configureStore({
  reducer: {
    admin: AdminReducer
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
