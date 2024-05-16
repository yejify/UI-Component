import { useViewportRect } from '@/context/viewportContext';
import { RefObject, useLayoutEffect, useState } from 'react';

type PositionKey = 'left' | 'right' | 'top' | 'bottom';
type Position = Partial<Record<PositionKey, string | number>>;
type style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>;

const useStyleInView = (
  wrapperRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  position: Position
) => {
  const viewportRect = useViewportRect();
  const [style, setStyle] = useState<style>({});

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return;
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    const targetRect = targetRef.current?.getBoundingClientRect();
    const verticalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? 'top'
        : 'bottom';
    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? 'left'
        : 'right';
    setStyle({
      [verticalKey]: position[verticalKey] || 0,
      [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
      [horizontalKey]: position[horizontalKey] || 0,
      [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
    });
  }, [viewportRect, wrapperRef, targetRef, position]);
  return style;
};
export default useStyleInView;
