import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from "redux-persist"
import authSlice from './reducers/authSlice'
import adminDashboardSlice from './reducers/adminDashboardSlice'
const store = configureStore({
    reducer: {
        auth: authSlice,
        adminDasboard: adminDashboardSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk, logger),
})


const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch