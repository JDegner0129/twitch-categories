import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import style from './style.css';

export default function Category(props) {
  return (
    <li>
      <Link
        className={style.category}
        to={`/categories/${encodeURIComponent(props.category)}`}
      >
          {props.category}
      </Link>
    </li>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};
