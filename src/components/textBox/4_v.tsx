import { measureLines } from '@/service/util';
import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';

const initator = (wrapper: HTMLDivElement) => {
  const $text = document.createElement('textarea');
  $text.classList.add(cx('textarea'));
  $text.rows = 3;

  const handleInput = () => {
    const val = $text.value;
    const lines = Math.min(Math.max(measureLines($text, val), 3), 15); //최대15줄, 최소3줄
    $text.rows = lines;
  };
  $text.addEventListener('input', handleInput);

  const $cont = document.createElement('div');
  $cont.classList.add(cx('container'));
  $cont.append($text);
  wrapper.append($cont);
};

const TextBox4V = () => <VanillaWrapper initiator={initator} />;
export default TextBox4V;
