import userReducer from "./user/userSlice"
import themeReducer from "./theme/themeSlice"
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1
}

// Using rootReducer, we can create presisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // prevent serializable error
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)