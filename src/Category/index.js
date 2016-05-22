import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import style from './style.css';

export default function Category(props) {
  const className = classNames(style.category, { [style.active]: props.isActive });

  return (
    <li>
      <Link
        className={className}
        to={`/categories/${encodeURIComponent(props.category)}`}
      >
          {props.category}
      </Link>
    </li>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
