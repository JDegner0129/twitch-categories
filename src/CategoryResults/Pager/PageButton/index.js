import React, { PropTypes } from 'react';

import style from './style.css';

export default function PageButton(props) {
  return <div className={style.pageButton} onClick={props.onClick}>{props.title}</div>;
}

PageButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
