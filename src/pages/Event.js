import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import {
  fetchEvent,
  insertEvent,
  updateEvent,
  deleteEvent,
  REQUEST_FETCH_EVENT,
  FAILURE_FETCH_EVENT,
  REQUEST_INSERT_EVENT,
  FAILURE_INSERT_EVENT,
  REQUEST_UPDATE_EVENT,
  FAILURE_UPDATE_EVENT,
  REQUEST_DELETE_EVENT,
  FAILURE_DELETE_EVENT,
} from 'state/actions/events'
import Form, { validate } from 'components/events/EventForm'
import { PAGE_TITLE } from 'config'

const EventForm = reduxForm({
  form: 'eventForm',
  validate: validate,
})(Form)

class Event extends Component {
  static async preload({ store, params }) {
    return new Promise((resolve, reject) => {
      store.dispatch(
        fetchEvent({
          id: params.id === 'new' ? null : params.id,
          onSuccess: resolve,
          onFailure: reject,
        }),
      )
    })
  }

  handleSubmit = values => {
    const { match, location, history, insertEvent, updateEvent } = this.props
    if (match.params.id === 'new') {
      insertEvent({
        values,
        onSuccess: item => history.replace(`/events/${item.id}${location.search}`),
      })
    } else {
      updateEvent({ values })
    }
  }

  handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      const { match, location, history } = this.props
      deleteEvent({
        id: match.params.id,
        onSuccess: () => history.replace(`/events/${location.search}`),
      })
    }
  }

  handleMoveList = () => {
    this.props.history.push(`/events/${this.props.location.search}`)
  }

  render() {
    const { item, hasError, pending } = this.props
    return (
      <div>
        {pending && <span>Now loading...</span>}

        {item && (
          <article>
            <Helmet>
              <title>{`${item.name || 'New Event'} | ${PAGE_TITLE}`}</title>
            </Helmet>
            <EventForm
              initialValues={item}
              enableReinitialize={true}
              hasError={hasError}
              onSubmit={this.handleSubmit}
              onDelete={this.handleDelete}
              onMoveList={this.handleMoveList}
            />
          </article>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    item: state.events.item,
    hasError: [
      FAILURE_FETCH_EVENT,
      FAILURE_INSERT_EVENT,
      FAILURE_UPDATE_EVENT,
      FAILURE_DELETE_EVENT,
    ].includes(state.events.status),
    pending: [
      REQUEST_FETCH_EVENT,
      REQUEST_INSERT_EVENT,
      REQUEST_UPDATE_EVENT,
      REQUEST_DELETE_EVENT,
    ].includes(state.events.status),
  }),
  dispatch => ({
    ...bindActionCreators({ fetchEvent, insertEvent, updateEvent, deleteEvent }, dispatch),
  }),
)(Event)
