import React, { PropTypes } from 'react';
import classNames from 'classnames';

import PageButton from './PageButton';
import style from './style.css';

export default function Pager(props) {
  const className = classNames(style.pager, {
    [style.alignLeft]: (props.enablePrev && !props.enableNext),
    [style.alignRight]: (!props.enablePrev && props.enableNext),
    [style.alignBoth]: (props.enablePrev && props.enableNext),
  });

  const nextButton = props.enableNext
    ? <PageButton title="Next" onClick={props.onNextClick} />
    : null;

  const prevButton = props.enablePrev
    ? <PageButton title="Previous" onClick={props.onPrevClick} />
    : null;

  return (
    <div className={className}>
      {prevButton}
      {nextButton}
    </div>
  );
}

Pager.propTypes = {
  enableNext: PropTypes.bool,
  enablePrev: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
};
