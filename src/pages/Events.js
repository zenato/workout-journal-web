import queryString from 'query-string';
import React, { Component } from 'react';
import { withDone } from 'react-router-server';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as eventsActions from 'redux/modules/events';
import { hasChangedLocation } from 'lib/location';
import withAuth from 'shared/withAuth';
import { Button } from 'components/form';
import SearchForm from 'components/SearchForm';
import EventItem from 'components/events/EventItem';
import { SITE_NAME } from '../constants';

class Events extends Component {
  componentWillMount() {
    const { items, done } = this.props;
    if (items.length < 1) {
      this.fetchData(this.props).then(done, done);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasChangedLocation(this.props.location, nextProps.location)) {
      this.fetchData(nextProps);
    }
  }

  fetchData({ location }) {
    const { EventsActions, accessToken } = this.props;
    const query = queryString.parse(location.search);
    return EventsActions.getEvents(accessToken, query);
  }

  handleSearch = (values) => {
    const { history, match, } = this.props;
    history.push((`${match.path}?${queryString.stringify(values)}`));
  };

  handleDetail = (e, id) => {
    e.preventDefault();
    const { history, match, location, } = this.props;
    history.push((`${match.path}/${id}${location.search}`));
  };

  handleForm = () => {
    this.props.history.push(`/events/new${this.props.location.search}`);
  };

  render() {
    const { items, location } = this.props;
    return (
      <div>
        <Helmet>
          <title>{`Events | ${SITE_NAME}`}</title>
        </Helmet>

        <Button value="Add Event" onClick={this.handleForm} className="primary" />

        <SearchForm
          location={location}
          onSubmit={this.handleSearch}
          placeholder="Input event name."
        />

        <ul>
          {items.map(item => (
            <EventItem key={item.id} item={item} onDetail={this.handleDetail} />
          ))}
        </ul>
      </div>
    );
  }
}

export default withDone(withAuth(connect(
  (state) => ({
    items: state.events.items,
  }),
  (dispatch) => ({
    EventsActions: bindActionCreators(eventsActions, dispatch),
  }),
)(Events)));
