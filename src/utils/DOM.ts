import { RefObject } from 'react';

function initComparisonSlider(ref: RefObject<HTMLElement>, sliderRef: RefObject<HTMLElement>) {
  if (!ref.current || !sliderRef.current) {
    return;
  }

  const overlayImage = ref.current.lastElementChild?.firstElementChild as HTMLImageElement;
  const pin = sliderRef.current;
  const pinParent = pin.parentElement as HTMLElement;
  const pinParentRect = pinParent.getBoundingClientRect();
  const imgRect = overlayImage.getBoundingClientRect();

  pin.ondragstart = () => false;

  return init(overlayImage);

  function init(img: HTMLImageElement) {
    let clicked: number;
    let shift: number;

    img.style.width = `${imgRect.width / 2}px`;

    pin.style.left = '50%';
    pin.style.transform = 'translate(-50%, -50%)';

    pin.addEventListener('mousedown', slideReady);
    window.addEventListener('mouseup', slideFinish);

    pin.addEventListener('touchstart', slideReady);
    window.addEventListener('touchend', slideFinish);

    return () => {
      img.style.width = `${imgRect.width}px`;
      window.removeEventListener('mousemove', slideMove);
      window.removeEventListener('touchmove', slideMove);
      window.removeEventListener('mouseup', slideFinish);
      window.removeEventListener('touchend', slideFinish);
      pin.removeEventListener('mousedown', slideReady);
      pin.removeEventListener('touchstart', slideReady);
    };

    function slideReady(evt: MouseEvent | TouchEvent) {
      evt.preventDefault();
      const pinRect = pin.getBoundingClientRect();

      if (evt instanceof TouchEvent) {
        shift = evt.changedTouches[0].pageX - pinRect.left - pinRect.width / 2;
      } else {
        shift = evt.pageX - pinRect.left - (pinRect.width / 2);
      }

      clicked = 1;

      window.addEventListener('mousemove', slideMove);
      window.addEventListener('touchmove', slideMove);
    }

    function slideFinish() {
      clicked = 0;
    }

    function slideMove(evt: MouseEvent | TouchEvent) {
      let pos;

      if (clicked === 0) {
        return false;
      }

      pos = getCursorPos(evt);

      if (pos < 0) {
        pos = 0;
      }

      if (pos > pinParent.offsetWidth) {
        pos = pinParent.offsetWidth;
      }


      slide(pos);
    }

    function getCursorPos(evt: MouseEvent | TouchEvent) {

      let position: number;

      if (evt instanceof TouchEvent) {
        position = evt.changedTouches[0].pageX - pinParentRect.left;
      } else {
        position = evt.pageX - pinParentRect.left;
      }

      position = position - window.pageXOffset;
      return position;
    }

    function slide(position: number) {
      const pinLeft = (position - shift) / pinParent.offsetWidth * 100;
      const widthValue = imgRect.width * (position / pinParent.offsetWidth);


      img.style.width = `${widthValue}px`;
      pin.style.left = `${pinLeft}%`;
    }
  }
}

export { initComparisonSlider };
