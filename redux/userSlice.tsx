import { createSlice } from '@reduxjs/toolkit'
 
  export const userSlice = createSlice({
         name: 'user',
         initialState: {
           username: '',
           accessToken: ''
         },
     reducers: {
      loginUser: (state,action) => {
         state.username = action.payload.username
         state.accessToken = action.payload.accessToken
       },
      logoutUser: (state) => {
         state.username = ''
         state.accessToken = ''
       }
     }
  })

  export const { loginUser, logoutUser } = userSlice.actions
  export default userSlice.reducer