import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withDone } from 'react-router-server'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import * as EventsActions from 'state/actions/events'
import Form, { validate } from 'components/events/EventForm'
import { PAGE_TITLE } from 'config'

const EventForm = reduxForm({
  form: 'eventForm',
  validate: validate,
})(Form)

class Event extends Component {
  componentWillMount() {
    const { actions, item, done, match } = this.props
    if (!item) {
      actions.fetchEvent({
        id: match.params.id === 'new' ? null : match.params.id,
        done,
      })
    } else {
      done()
    }
  }

  componentWillUnmount() {
    this.props.actions.clearEvent()
  }

  handleSubmit = values => {
    const { match, location, history, actions } = this.props
    if (match.params.id === 'new') {
      actions.insertEvent({
        values,
        done: item => history.replace(`/events/${item.id}${location.search}`),
      })
    } else {
      actions.updateEvent({ values })
    }
  }

  handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      const { match, location, history, actions } = this.props
      actions.deleteEvent({
        id: match.params.id,
        done: () => history.replace(`/events/${location.search}`),
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

export default withDone(
  connect(
    state => ({
      item: state.events.item,
      hasError: !!state.events.error.item,
      pending: state.events.pending.item,
    }),
    dispatch => ({
      actions: bindActionCreators(EventsActions, dispatch),
    }),
  )(Event),
)
