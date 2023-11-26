import { combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import questionReducer from './features/question_reducer'
import resultReducer from './features/result_reducer'
import meditationSlice from './features/meditationSlice'
import moodSlice from './features/moodSlice'
import programSlice from './features/programSlice'
import chatSlice from './features/chatSlice';
import rewardSlice from './features/rewardSlice'
// const rootReducer = combineReducers({
//     questions: questionReducer
// })

export const store = configureStore ({
    reducer: {
        auth: authSlice,
        questions: questionReducer,
        result: resultReducer,
        meditation: meditationSlice,
        mood: moodSlice,
        program5Day: programSlice,
        chat: chatSlice,
        reward:rewardSlice
    },
})
//export default configureStore({reducer: rootReducer});
