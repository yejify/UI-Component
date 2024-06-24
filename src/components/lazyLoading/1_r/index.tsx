import cx from '../cx';
import data from '../data';

const LazyImage = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  return <img className={cx('lazy')} width={width} height={height} alt='' />;
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
