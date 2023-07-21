import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Dispatch, RefObject, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppContext = () =>
  useOutletContext<{
    state: number;
    setState: Dispatch<React.SetStateAction<number>>;
  }>();

export function useClickOutside(ref: RefObject<HTMLElement>, cb: () => void) {
  const handleClick = (evt: MouseEvent) => {
    if (ref.current && !ref.current.contains(evt.target as Node)) {
      cb();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
