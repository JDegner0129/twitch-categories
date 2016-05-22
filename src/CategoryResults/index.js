import React, { PropTypes, Component } from 'react';

import Stream from './Stream';
import style from './style.css';

export default class CategoryResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
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
    fetch(`https://api.twitch.tv/kraken/search/streams?q=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(json => this.setState({ streams: json.streams }));
  }

  renderStreams() {
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
