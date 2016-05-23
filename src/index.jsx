import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import SearchCTA from './SearchCTA';
import CategoryResults from './CategoryResults';
import Category from './Category';
import style from './style.css';

import 'babel-polyfill';
import 'whatwg-fetch';

class CategoriesApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    fetch('/categories')
      .then(res => res.json())
      .then(json => this.setState({ categories: json }));
  }

  renderCategories() {
    const category = this.props.params.category;

    return this.state.categories.map(c => (
      <Category
        key={c}
        category={c}
        isActive={c === category}
      />
    ));
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return (
      <SearchCTA
        title="No Streams Found"
        description="Use one of the category links above to find streams for a category you're interested in."
      />
    );
  }

  render() {
    return (
      <div>
        <div className={style.header}>
          <h1>Twitch Categories</h1>
          <h2>Browse categories on Twitch.tv, determined by tags in the stream title.</h2>
          <ul className={style.categories}>{this.renderCategories()}</ul>
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

CategoriesApp.propTypes = {
  children: PropTypes.node,
  params: PropTypes.object.isRequired,
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={CategoriesApp}>
      <Route path="categories/:category" component={CategoryResults} />
    </Route>
  </Router>
), document.querySelector('#app'));
