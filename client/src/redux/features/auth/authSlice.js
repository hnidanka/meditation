
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, username }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                email,
                password,
                username,
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
    },
)
 
 export const loginUser = createAsyncThunk(
     'auth/loginUser',
     async ({ email, password }) => {
         try {
             const { data } = await axios.post('/auth/login', {
                 email,
                 password,
             })
             if (data.token) {
                 window.localStorage.setItem('token', data.token)
             }
             return data
         } catch (error) {
             console.log(error)
         }
     },
 )

 export const getMe = createAsyncThunk('auth/loginUser', async () => {
     try {
         const { data } = await axios.get('/auth/me')
         return data
     } catch (error) {
         console.log(error)
     }
 })
 export const updateFinishedMeditations = createAsyncThunk(
  'meditations/updateFinishedMeditations',
  async (userId) => {
    try {
      const { data } = await axios.patch(`/auth/${userId}/finishMeditation`);
      return data;
    } catch (error) {
      console.error('Error updating finished meditations:', error);
      throw error;
    }
  }
);
export const finishedDifferentMeditations = createAsyncThunk(
  'meditations/updateFinishedDifferentMeditations',
  async ({userId, meditationId}) => {
    try {
      const { data } = await axios.put(`/auth/finishDifferentMeditations/${userId}/?meditationId=${meditationId}`);
      return data;
    } catch (error) {
      console.error('Error updateFinishedDifferentMeditations:', error);
      throw error;
    }
  }
);
export const upgrateLevel = createAsyncThunk(
  'levels/upgrateLevel',
  async (userId) => {
    try {
      const { data } = await axios.patch(`/auth/${userId}/upgrateLevel`);
      return data;
    } catch (error) {
      console.error('Error upgrateLevel:', error);
      throw error;
    }
  }
);
export const addUserImage = createAsyncThunk(
  'auth/addUserImage',
  async ({userId, image}) => {
    try {
      const { data } = await axios.put(`/auth/addUserImage`,  {
          userId,
          image,
      });
      return data;
    } catch (error) {
      console.error('Error addUserImage:', error);
      throw error;
    }
  }
);

export const finisheProgramDay = createAsyncThunk(
  'meditations/updateFinishedDifferentMeditations',
  async ({userId, dayName}) => {
    try {
      const { data } = await axios.put(`/auth/finisheProgramDay`, {userId, dayName});
      return data;
    } catch (error) {
      console.error('Error updateFinishedDifferentMeditations:', error);
      throw error;
    }
  }
);

export const changeUserName = createAsyncThunk(
    'auth/changeUserName',
    async ({userId, username}) => {
      try {
        const { data } = await axios.put(`/auth/changeUserName`,  {
            userId,
            username,
        });
        return data;
      } catch (error) {
        console.error('Error changeUserName:', error);
        throw error;
      }
    }
  );

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: {
        // Register user
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
      //Login user
        [loginUser.pending]: (state) => {
             state.isLoading = true
            state.status = null
         },
         [loginUser.fulfilled]: (state, action) => {
             state.isLoading = false
             state.status = action.payload.message
             state.user = action.payload.user
             state.token = action.payload.token
         },
        [loginUser.rejectWithValue]: (state, action) => {
             state.status = action.payload.message
             state.isLoading = false
         },
         // Get Me
         [getMe.pending]: (state) => {
             state.isLoading = true
             state.status = null
         },
         [getMe.fulfilled]: (state, action) => {
             state.isLoading = false
             state.status = null
             state.user = action.payload?.user
             state.token = action.payload?.token
         },
         [getMe.rejectWithValue]: (state, action) => {
             state.status = action.payload.message
             state.isLoading = false
         },
         //updateFinishedMeditations
         [updateFinishedMeditations.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [updateFinishedMeditations.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload
            
        },
        [updateFinishedMeditations.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        //finishedDifferentMeditations
        [finishedDifferentMeditations.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [finishedDifferentMeditations.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload
            
        },
        [finishedDifferentMeditations.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },


//upgrateLevel
         [upgrateLevel.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [upgrateLevel.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload
            
        },
        [upgrateLevel.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
         //addUserImage
         [addUserImage.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [addUserImage.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload.user
            
        },
        [addUserImage.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
         //finisheProgramDay
         [finisheProgramDay.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [finisheProgramDay.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload
            
        },
        [finisheProgramDay.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        //changeUserName
        [changeUserName.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [changeUserName.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload.user
            
        },
        [changeUserName.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)
export const checkIsResult = (state) => Boolean(state.auth.user?.result)
export const { logout } = authSlice.actions
export default authSlice.reducer