import React, { PropTypes } from 'react';

import style from './style.css';

export default function SearchCTA(props) {
  return (
    <div className={style.searchCta}>
      <h3 className={style.ctaTitle}>{props.title}</h3>
      <p className={style.ctaDescription}>{props.description}</p>
    </div>
  );
}

SearchCTA.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
