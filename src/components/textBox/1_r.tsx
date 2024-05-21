import { SyntheticEvent, useState } from 'react';
import cx from './cx';

const TextBox1 = () => {
  const [text, setText] = useState('');
  const [lines, setLines] = useState(3);
  const handleChange = (e: SyntheticEvent) => {
    const elem = e.target as HTMLTextAreaElement;
    const val = elem.value;
    const lines = Math.min(Math.max(val.split('\n').length), 15); //최대15줄, 최소3줄
    setText(val);
    setLines(lines);
  };

  return (
    <>
      <h3>
        #1<sub>controlled</sub>
      </h3>
      <div className={cx('container')}>
        <textarea
          className={cx('textarea')}
          onChange={handleChange}
          rows={lines}
        />
      </div>
    </>
  );
};
export default TextBox1;