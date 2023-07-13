import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Dispatch } from 'react';
import { useOutletContext } from 'react-router-dom';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppContext = () => useOutletContext<{
    state: number;
    setState: Dispatch<React.SetStateAction<number>>;
  }>();
