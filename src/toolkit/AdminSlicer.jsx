import { createSlice } from '@reduxjs/toolkit'

const AdminSlicer = createSlice({
  name: 'Admin',
  initialState: {
    data: {},
    isPending: false,
    isError: '',
    isAuth: false
  },
  reducers: {
    getAdminPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getAdminSuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getAdminError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getAdminError, getAdminPending, getAdminSuccess } =
  AdminSlicer.actions
export default AdminSlicer.reducer
