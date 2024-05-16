import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';
import data from './data';

const initiator = (wrapper: HTMLElement) => {
  const $Tooltips = data.map(({ id, title, description }) => {
    let isOpen = false;
    const $details = document.createElement('details');
    $details.classList.add(cx('details'));
    $details.setAttribute('data-tooltip', id);

    const $summary = document.createElement('summary');
    $summary.classList.add(cx('summary'));
    $summary.setAttribute('data-tooltip-summary', 'true');
    $summary.textContent = title;

    const $tooltip = document.createElement('div');
    $tooltip.classList.add(cx('tooltip'));
    $tooltip.textContent = description;

    $details.append($summary, $tooltip);
    return $details;
  });
  const closeAllTooltip = (e: Event) => {
    const target = e.target as HTMLElement;
    document.querySelectorAll('[data-tooltip]').forEach((elem) => {
      if (elem !== target.parentElement) elem.removeAttribute('open');
    });
  };
  window.addEventListener('click', closeAllTooltip);
  window.removeEventListener('click', closeAllTooltip);

  wrapper.append(...$Tooltips);
};

const Tooltip5V = () => <VanillaWrapper title='#5' initiator={initiator} />;

export default Tooltip5V;
