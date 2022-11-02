import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './slices/AuthSlice'
import movieReducer from "./slices//MovieIdSlice";
const store = configureStore({
    reducer:{Auth:AuthReducer,Movie:movieReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),

})

export default store