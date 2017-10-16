import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withDone } from 'react-router-server';
import { Helmet } from 'react-helmet';
import { reduxForm } from 'redux-form';
import * as eventsActions from 'redux/modules/events';
import { GET_EVENT, INSERT_EVENT, UPDATE_EVENT, DELETE_EVENT } from 'redux/modules/events';
import Form, { validate } from 'components/events/EventForm';

const isNew = ({ id }) => id === 'new';

const EventForm = reduxForm({
  form: 'eventForm',
  validate: validate,
})(Form);

class Event extends Component {
  componentWillMount() {
    const { EventsActions, item, done, match } = this.props;
    if (!isNew(match.params) && !item) {
      EventsActions.getEvent(match.params.id).then(done, done);
    }
  }

  componentWillUnmount() {
    this.props.EventsActions.clearEvent();
  }

  handleSubmit = async values => {
    const { match, location, history, EventsActions } = this.props;
    if (isNew(match.params)) {
      const item = await EventsActions.insertEvent(values);
      history.replace(`/events/${item.id}${location.search}`);
    } else {
      await EventsActions.updateEvent(values);
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
    const { match, item, hasError, isLoading } = this.props;
    return (
      <div>
        {isLoading && <span>Now loading...</span>}

        {(isNew(match.params) || item) && (
          <article>
            <Helmet>
              <title>{`${item ? item.name : 'New Event'} | ${process.env
                .REACT_APP_SITE_NAME}`}</title>
            </Helmet>
            <EventForm
              initialValues={item}
              enableReinitialize={true}
              hasError={isLoading ? false : hasError}
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

export default withDone(
  connect(
    state => ({
      item: state.events.item,
      hasError:
        state.pender.failure[GET_EVENT] ||
        state.pender.failure[INSERT_EVENT] ||
        state.pender.failure[UPDATE_EVENT] ||
        state.pender.failure[DELETE_EVENT],
      isLoading:
        state.pender.pending[GET_EVENT] ||
        state.pender.pending[INSERT_EVENT] ||
        state.pender.pending[UPDATE_EVENT] ||
        state.pender.pending[DELETE_EVENT],
    }),
    dispatch => ({
      EventsActions: bindActionCreators(eventsActions, dispatch),
    }),
  )(Event),
);
