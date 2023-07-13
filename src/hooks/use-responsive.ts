import { useMediaQuery } from 'react-responsive';

enum Size {
  ContainerPadding = 30,
  Pc = 1220,
  Tablet = 991.98,
  Mobile = 767.98,
  SmallMobile = 479.98
}

const useResponsive = () => {
  const atMinPC = useMediaQuery({ query: `(min-width: ${Size.Pc + Size.ContainerPadding}px)` });
  const atMinTablet = useMediaQuery({ query: `(min-width: ${Size.Tablet}px)` });
  const atMinMobile = useMediaQuery({ query: `(min-width: ${Size.Mobile}px)` });
  const atMaxMobile = useMediaQuery({ query: `(max-width: ${Size.Mobile}px)` });
  const atMinSmallMobile = useMediaQuery({ query: `(min-width: ${Size.SmallMobile}px)` });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  const isMobile = !atMinMobile;
  const isTables = atMinMobile;
  const isPC = atMinTablet && atMinMobile;

  return {
    atMinPC,
    atMinTablet,
    isPortrait,
    isRetina,
    atMinMobile,
    atMinSmallMobile,
    atMaxMobile,
    isMobile,
    isTables,
    isPC
  };
};

export default useResponsive;
