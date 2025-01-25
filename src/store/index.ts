import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

// Export the store directly for the Provider in RootLayout
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
