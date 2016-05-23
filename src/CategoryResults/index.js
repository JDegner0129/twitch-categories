import React, { PropTypes, Component } from 'react';

import Pager from './Pager';
import SearchCTA from '../SearchCTA';
import Stream from './Stream';
import style from './style.css';

const BASE_API_URL = 'https://api.twitch.tv/kraken/search/streams';

export default class CategoryResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      searchComplete: false,
      nextPageUrl: null,
      prevPageUrl: null,
    };

    this.fetchStreams = this.fetchStreams.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
    this.renderStreams = this.renderStreams.bind(this);
    this.renderPager = this.renderPager.bind(this);
  }

  componentDidMount() {
    const fetchUrl = `${BASE_API_URL}?q=${encodeURIComponent(this.props.params.category)}`;

    this.fetchStreams(fetchUrl);
  }

  componentWillReceiveProps(nextProps) {
    const fetchUrl = `${BASE_API_URL}?q=${encodeURIComponent(nextProps.params.category)}`;

    this.fetchStreams(fetchUrl);
  }

  getNextPage() {
    this.fetchStreams(this.state.nextPageUrl);
  }

  getPreviousPage() {
    this.fetchStreams(this.state.prevPageUrl);
  }

  fetchStreams(fetchUrl) {
    this.setState({ searchComplete: false });

    fetch(fetchUrl)
      .then(res => res.json())
      .then(json => (this.setState({
        streams: json.streams,
        searchComplete: true,
        prevPageUrl: json.streams.length ? json._links.prev : null,
        nextPageUrl: json.streams.length ? json._links.next : null,
      })));
  }

  renderStreams() {
    if (!this.state.searchComplete) {
      return <SearchCTA title="Loading..." />;
    }

    if (!this.state.streams.length) {
      return (
        <SearchCTA
          title="No Streams Found"
          description="No streams could be found for that category. Please try again later."
        />
      );
    }

    return this.state.streams.map(s => (
      <Stream
        key={s.channel.name}
        thumbnailUri={s.preview.medium}
        status={s.channel.status}
        viewers={s.viewers}
        channelName={s.channel.display_name}
        channelUrl={s.channel.url}
        profileUrl={`${s.channel.url}/profile`}
      />)
    );
  }

  renderPager() {
    if (!this.state.searchComplete) {
      return null;
    }

    const enableNext = !!this.state.nextPageUrl;
    const enablePrev = !!this.state.prevPageUrl;

    return (
      <Pager
        enableNext={enableNext}
        enablePrev={enablePrev}
        onNextClick={this.getNextPage}
        onPrevClick={this.getPreviousPage}
      />
    );
  }

  render() {
    return (
      <div>
        <div className={style.streams}>
          {this.renderStreams()}
        </div>
        {this.renderPager()}
      </div>
    );
  }
}

CategoryResults.propTypes = {
  params: PropTypes.object.isRequired,
};
