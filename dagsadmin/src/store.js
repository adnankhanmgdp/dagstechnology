import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import UserReducer from '../src/redux/UserSlice'
import PhoneReducer from '../src/redux/PhoneSlice'

// Create a persist configuration object
const persistConfig = {
  key: 'root',
  storage,
}

// Combine your reducers
const rootReducer = combineReducers({
  user: UserReducer,
  phone: PhoneReducer,
})

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Create a persistor
export const persistor = persistStore(store)
