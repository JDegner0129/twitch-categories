import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import style from './style.css';
import 'babel-polyfill';
import 'whatwg-fetch';

class CategoriesApp extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      streams: [],
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.renderStreams = this.renderStreams.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
  }

  componentDidMount() {
    fetch('/categories')
      .then(res => res.json())
      .then(json => this.setState({ categories: json }));
  }

  onCategoryClick(category) {
    return () => {
      fetch(`https://api.twitch.tv/kraken/search/streams?q=${encodeURIComponent(category)}`)
        .then(res => res.json())
        .then(json => this.setState({ streams: json.streams }));
    };
  }

  renderStreams() {
    return this.state.streams.map(s => <div key={s.channel.status}>{s.channel.status}</div>);
  }

  renderCategories() {
    return this.state.categories.map(c => <li key={c} onClick={this.onCategoryClick(c)}>{c}</li>);
  }

  render() {
    return (
      <div>
        <ul className={style.app}>{this.renderCategories()}</ul>
        <div>
          {this.renderStreams()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<CategoriesApp />, document.querySelector('#app'));
