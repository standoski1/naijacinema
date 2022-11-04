import { configureStore } from '@reduxjs/toolkit'
  import { persistStore, persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import UserSlice from './userSlice'


  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, UserSlice);

  export const store = configureStore({
   reducer: {
      user: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  })

  export const persistor = persistStore(store);
  export type RootState = ReturnType<typeof store.getState>