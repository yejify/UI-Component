import useIntersectionOserver from '@/hook/useIntersectionObserver';
import cx from '../cx';
import data from '../data';
import { useEffect, useRef, useState } from 'react';

const ioOptions: IntersectionObserverInit = {
  threshold: 0,
};

const LazyImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { entries, observerRef } = useIntersectionOserver(imgRef, ioOptions);

  useEffect(() => {
    const isVisible = entries[0]?.isIntersecting;
    if (isVisible) {
      const onLoad = () => {
        setLoaded(true);
      };
      imgRef.current!.addEventListener('load', onLoad, { once: true });
      imgRef.current!.setAttribute('src', src);
      observerRef.current?.disconnect();
    }
  }, [src, entries]);

  return (
    <img
      className={cx({ lazy: !loaded })}
      width={width}
      height={height}
      alt=''
    />
  );
};

const LazyLoad1 = () => {
  return (
    <>
      <h2>
        지연로딩<sub>#1</sub>
      </h2>
      {data.map((url, index) => (
        <LazyImage src={url} key={index} width={600} height={320} />
      ))}
    </>
  );
};

export default LazyLoad1;
