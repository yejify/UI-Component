import { useLayoutEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import ViewportContextProvider, { useViewportRect } from './viewportContext';

type style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>;

const Tooltip4 = () => {
  const Tooltip = ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description: string;
  }) => {
    const viewportRect = useViewportRect();
    const wrapperRef = useRef<HTMLDetailsElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
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
        [verticalKey]: 0,
        [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
        [horizontalKey]: 0,
        [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
      });
    }, [viewportRect]);
    return (
      <details className={cx('details')} data-tooltip={id}>
        <summary className={cx('summary')} data-tooltip-summary>
          {title}
        </summary>
        <div
          className={cx('tooltip')}
          onClick={(e) => e.stopPropagation}
          ref={targetRef}
          style={style}
        >
          {description}
        </div>
      </details>
    );
  };
  return (
    <ViewportContextProvider>
      <>
        <h3>
          #4<sub>화면 영역 안에 있도록 처리</sub>
        </h3>
        {data.map((d) => (
          <Tooltip {...d} key={d.id} />
        ))}
      </>
    </ViewportContextProvider>
  );
};

export default Tooltip4;
