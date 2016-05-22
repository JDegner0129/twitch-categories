import React from 'react';
import ReactDOM from 'react-dom';

import style from './style.css';

const SampleComponent = () => <div className={style.app}>Hello world!</div>;

ReactDOM.render(<SampleComponent />, document.querySelector('#app'));
