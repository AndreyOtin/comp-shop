import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../consts/enum';
import userSlice from './user-slice/user-slice';
import productsSlice from './products-slice/products-slice';

const rootReducer = combineReducers({
  [SliceNameSpace.User]: userSlice,
  [SliceNameSpace.Products]: productsSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootReducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
