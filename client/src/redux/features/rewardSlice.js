//redux meditationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
    rewards: [],
    userRewars: [], 
    loading: false,
};
export const getRewards = createAsyncThunk(
    'reward/getRewards',
    async ( ) => {
        try {
            const { data } = await axios.get('/reward/getRewards')
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getAllUserRewards = createAsyncThunk(
    'reward/getAllUserRewards',
    async (userId) => {
        try {
            const { data } = await axios.get(`/reward/getAllUserRewards/${userId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    },
)


export const addUserRewards = createAsyncThunk(
    '/addUserRewards',
    async ({userId, selectedRewardId}) => {
        try {
            const { data } = await axios.post('/reward/addUserRewards', {userId, selectedRewardId})
            console.log(`Data InsertSavedd ${data}`)
            return data
        } catch (error) {
            console.log("Error w slice")
        }
    },
)
// export const getSavedMeditations = createAsyncThunk('meditationsSaved', async (userId) => {
//     try {
//       const { data } = await axios.get(`/?userId=${userId}`);
//       console.log(`Data ${data}`)
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   export const removeSavedMeditation = createAsyncThunk('meditationsSaved/removemeditationsSaved', async (params) => {
//     try {
//         const { data } = await axios.delete(`${params.savedMeditationId}?id=${params.id}`, params.id, params.savedMeditationId)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// })
// export const streamAudio = createAsyncThunk(
//     'meditations/streamAudio',
//     async (fileId, { dispatch }) => {
//       try {
//         // Make an API request to the streamAudio route
//         await axios.get(`/meditations/stream/${fileId}`);
//         // Dispatch an action to update the audio state
//         dispatch(setAudioPlaying({ isPlaying: true, fileId }));
//       } catch (error) {
//         console.log('Error streaming audio:', error);
//       }
//     }
//   );
  
export const rewardSlice = createSlice({
    name: 'reward',
    initialState,
    reducers: {
      
},
    
    extraReducers: {
        // getRewards
        [getRewards.pending]: (state) => {
            state.loading = true
        },
        [getRewards.fulfilled]: (state, action) => {
            state.loading = false
            state.rewards= action.payload
        },
        [getRewards.rejected]: (state) => {
            state.loading = false
        },
        //getAllUserRewards
        [getAllUserRewards.pending]: (state) => {
            state.loading = true
        },
        [getAllUserRewards.fulfilled]: (state, action) => {
            state.loading = false
            state.userRewars = action.payload
        },
        [getAllUserRewards.rejected]: (state) => {
            state.loading = false
        },
        // addUserRewards
        [addUserRewards.pending]: (state) => {
            state.loading = true
        },
        [addUserRewards.fulfilled]: (state, action) => {
            state.loading = false
            state.userRewars?.push(action.payload)
        },
        [addUserRewards.rejected]: (state) => {
            state.loading = false
        },
        // // get SavedMeditations
        //  [getSavedMeditations.pending]: (state) => {
        //     state.loading = true
        // },
        // [getSavedMeditations.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.savedMeditations = action.payload; // Ensure that action.payload is an array
        // },
        // [getSavedMeditations.rejected]: (state) => {
        //     state.loading = false
        // },
        //   // remove SavedMeditation
        //   [removeSavedMeditation.pending]: (state) => {
        //     state.loading = true
        // },
        // [removeSavedMeditation.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.savedMeditations = state.savedMeditations.filter(
        //         (savedMeditations) => savedMeditations?._id !== action.payload._id,
        //     )
        // },
        // [removeSavedMeditation.rejected]: (state) => {
        //     state.loading = false
        // },
        // [streamAudio.pending]: (state) =>{
        //     state.loading = true;
        // },
        // [streamAudio.fulfilled]: (state) =>{
        //     state.loading = false;
        // },
        // [streamAudio.rejected]: (state) =>{
        //     state.loading = false;
        // },
    },
    
})




export default rewardSlice.reducer