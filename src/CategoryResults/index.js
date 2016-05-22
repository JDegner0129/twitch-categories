import React, { PropTypes, Component } from 'react';

import SearchCTA from '../SearchCTA';
import Stream from './Stream';
import style from './style.css';

export default class CategoryResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      searchComplete: false,
    };

    this.fetchStreams = this.fetchStreams.bind(this);
  }

  componentDidMount() {
    this.fetchStreams(this.props.params.category);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchStreams(nextProps.params.category);
  }

  fetchStreams(category) {
    this.setState({ searchComplete: false });

    fetch(`https://api.twitch.tv/kraken/search/streams?q=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(json => this.setState({ streams: json.streams, searchComplete: true }));
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

  render() {
    return (
      <div className={style.streams}>
        {this.renderStreams()}
      </div>
    );
  }
}

CategoryResults.propTypes = {
  params: PropTypes.object.isRequired,
};
