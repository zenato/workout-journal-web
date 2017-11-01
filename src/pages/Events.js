import queryString from 'query-string'
import React, { Component } from 'react'
import { withDone } from 'react-router-server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import * as EventsActions from 'state/actions/events'
import { hasChangedLocation } from 'lib/location'
import { Button } from 'components/form'
import SearchForm from 'components/SearchForm'
import EventItem from 'components/events/EventItem'
import { PAGE_TITLE } from 'config'

const EventSearchForm = reduxForm({
  form: 'eventSearchForm',
})(SearchForm)

class Events extends Component {
  componentWillMount() {
    const { items, done } = this.props
    if (items.length < 1) {
      this.fetchData(this.props, done)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasChangedLocation(this.props.location, nextProps.location)) {
      this.fetchData(nextProps)
    }
  }

  fetchData({ location }, done) {
    const query = queryString.parse(location.search)
    return this.props.actions.fetchEvents({ query, done })
  }

  handleSearch = values => {
    const { history, match } = this.props
    history.push(`${match.path}?${queryString.stringify(values)}`)
  }

  handleDetail = id => {
    const { history, match, location } = this.props
    history.push(`${match.path}/${id}${location.search}`)
  }

  handleForm = () => {
    this.props.history.push(`/events/new${this.props.location.search}`)
  }

  render() {
    const { items, location, pending, hasError } = this.props
    const search = { ...queryString.parse(location.search) }
    return (
      <div>
        <Helmet>
          <title>{`Events | ${PAGE_TITLE}`}</title>
        </Helmet>

        <section>
          <Button value="Add Event" onClick={this.handleForm} color="primary" />
        </section>

        <EventSearchForm
          initialValues={search}
          enableReinitialize={true}
          onSubmit={this.handleSearch}
          placeholder="Input event name."
        />

        {pending && <div>Now loading...</div>}
        {hasError && <div>Oops, An expected error seems to have occurred.</div>}

        <article>
          <ul>
            {items.map(item => (
              <EventItem key={item.id} item={item} onDetail={this.handleDetail} />
            ))}
          </ul>
        </article>
      </div>
    )
  }
}

export default withDone(
  connect(
    state => ({
      items: state.events.items,
      pending: state.events.pending.items,
      hasError: !!state.events.error.items,
    }),
    dispatch => ({
      actions: bindActionCreators(EventsActions, dispatch),
    }),
  )(Events),
)
