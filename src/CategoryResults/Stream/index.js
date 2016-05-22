import React, { PropTypes } from 'react';

import style from './style.css';

function onClick(url) {
  return () => {
    window.location = url;
  };
}

export default function Stream(props) {
  return (
    <div className={style.stream}>
      <img
        className={style.streamImg}
        src={props.thumbnailUri}
        alt={props.status}
        onClick={onClick(props.channelUrl)}
      />
      <a href={props.channelUrl} className={style.streamStatus}>{props.status}</a>
      <p className={style.streamViewers}>
        {`${props.viewers} viewers on `}
        <a className={style.streamChannel} href={props.profileUrl}>
           {props.channelName}
        </a>
      </p>
    </div>
  );
}

Stream.propTypes = {
  thumbnailUri: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  viewers: PropTypes.number.isRequired,
  channelName: PropTypes.string.isRequired,
  channelUrl: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
};
