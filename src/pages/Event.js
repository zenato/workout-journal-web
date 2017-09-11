import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withDone } from 'react-router-server';
import { Helmet } from 'react-helmet';
import * as eventsActions from 'redux/modules/events';
import { GET_EVENT, UPDATE_EVENT, DELETE_EVENT } from 'redux/modules/events'
import { hasChangedLocation } from 'lib/location';
import EventForm from 'components/events/EventForm';
import { SITE_NAME } from '../constants';

const isNew = ({ id }) => id === 'new';

class Event extends Component {
  componentWillMount() {
    const { EventsActions, item, done, match } = this.props;
    if (!isNew(match.params) && !item) {
      EventsActions.getEvent(match.params.id).then(done, done);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasChangedLocation(this.props.location, nextProps.location)) {
      this.fetchData(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.EventsActions.clearEvent();
  }

  fetchData({ match }) {
    this.props.EventsActions.getEvent(match.params.id);
  }

  handleSubmit = async (values) => {
    const { match, location, history, EventsActions } = this.props;
    if (isNew(match.params)) {
      const { data } = await EventsActions.insertEvent(values);
      history.replace(`/events/${data.id}${location.search}`);
    } else {
      await EventsActions.updateEvent(match.params.id, values);
    }
  };

  handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      const { match, location, history, EventsActions } = this.props;
      await EventsActions.deleteEvent(match.params.id);
      history.replace(`/events/${location.search}`);
    }
  };

  handleMoveList = () => {
    this.props.history.push(`/events/${this.props.location.search}`);
  };

  render() {
    const { match, item, error, loading } = this.props;
    return (
      <div>
        {loading && (
          <span>Now loading...</span>
        )}

        {(isNew(match.params) || item) && (
          <article>
            <Helmet>
              <title>{`${item ? item.name : 'New Event'} | ${SITE_NAME}`}</title>
            </Helmet>
            <EventForm
              item={item}
              error={error}
              onSubmit={this.handleSubmit}
              onDelete={this.handleDelete}
              onMoveList={this.handleMoveList}
            />
          </article>
        )}
      </div>
    );
  }
}

export default withDone(connect(
  (state) => ({
    error: state.events.error,
    item: state.events.item,
    loading: state.pender.pending[GET_EVENT] || state.pender.pending[UPDATE_EVENT] || state.pender.pending[DELETE_EVENT],
  }),
  (dispatch) => ({
    EventsActions: bindActionCreators(eventsActions, dispatch),
  }),
)(Event));
