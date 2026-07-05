"use client";

import { useEffect } from "react";

let lockState = null;

const getScrollY = () =>
  window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

const isScrollable = (element) => {
  const style = window.getComputedStyle(element);
  const canScrollY = /(auto|scroll)/.test(style.overflowY);

  return canScrollY && element.scrollHeight > element.clientHeight;
};

const getScrollableParent = (target) => {
  if (!(target instanceof Element)) {
    return null;
  }

  let element = target;

  while (element && element !== document.body) {
    if (isScrollable(element)) {
      return element;
    }

    element = element.parentElement;
  }

  return null;
};

const canScrollInside = (target, deltaY) => {
  const scrollableParent = getScrollableParent(target);

  if (!scrollableParent) {
    return false;
  }

  if (deltaY < 0) {
    return scrollableParent.scrollTop > 0;
  }

  if (deltaY > 0) {
    return (
      scrollableParent.scrollTop + scrollableParent.clientHeight <
      scrollableParent.scrollHeight
    );
  }

  return true;
};

const preventPageWheel = (event) => {
  if (!canScrollInside(event.target, event.deltaY)) {
    event.preventDefault();
  }
};

let touchStartY = 0;

const saveTouchStart = (event) => {
  touchStartY = event.touches[0]?.clientY ?? 0;
};

const preventPageTouchMove = (event) => {
  if (event.touches.length > 1) {
    return;
  }

  const currentY = event.touches[0]?.clientY ?? touchStartY;
  const deltaY = touchStartY - currentY;

  if (!canScrollInside(event.target, deltaY)) {
    event.preventDefault();
    return;
  }

  touchStartY = currentY;
};

const lockBodyScroll = () => {
  const { body, documentElement } = document;

  if (!lockState) {
    const scrollY = getScrollY();
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight = window.getComputedStyle(body).paddingRight;
    const currentPaddingRight = Number.parseFloat(bodyPaddingRight) || 0;

    lockState = {
      count: 0,
      scrollY,
      styles: {
        htmlOverflow: documentElement.style.overflow,
        htmlOverscrollBehavior: documentElement.style.overscrollBehavior,
        bodyOverflow: body.style.overflow,
        bodyOverscrollBehavior: body.style.overscrollBehavior,
        bodyPaddingRight: body.style.paddingRight,
      },
    };

    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";

    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }

    document.addEventListener("wheel", preventPageWheel, { passive: false });
    document.addEventListener("touchstart", saveTouchStart, { passive: true });
    document.addEventListener("touchmove", preventPageTouchMove, { passive: false });
  }

  lockState.count += 1;
};

const unlockBodyScroll = () => {
  if (!lockState) {
    return;
  }

  lockState.count -= 1;

  if (lockState.count > 0) {
    return;
  }

  const { body, documentElement } = document;
  const { scrollY, styles } = lockState;

  documentElement.style.overflow = styles.htmlOverflow;
  documentElement.style.overscrollBehavior = styles.htmlOverscrollBehavior;

  body.style.overflow = styles.bodyOverflow;
  body.style.overscrollBehavior = styles.bodyOverscrollBehavior;
  body.style.paddingRight = styles.bodyPaddingRight;

  document.removeEventListener("wheel", preventPageWheel);
  document.removeEventListener("touchstart", saveTouchStart);
  document.removeEventListener("touchmove", preventPageTouchMove);

  const currentScrollY = getScrollY();
  lockState = null;

  if (currentScrollY !== scrollY) {
    window.scrollTo(0, scrollY);
  }
};

export default function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    lockBodyScroll();

    return () => {
      unlockBodyScroll();
    };
  }, [active]);
}
