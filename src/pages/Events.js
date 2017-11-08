import queryString from 'query-string'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import { fetchEvents } from 'state/actions/events'
import { hasChangedLocation } from 'lib/router'
import { Button } from 'components/form'
import SearchForm from 'components/SearchForm'
import EventItem from 'components/events/EventItem'
import { PAGE_TITLE } from 'config'

const EventSearchForm = reduxForm({
  form: 'eventSearchForm',
})(SearchForm)

class Events extends Component {
  static async preload({ state, dispatch, query }) {
    return new Promise(resolve => {
      if (state.events.items) {
        resolve()
      } else {
        dispatch(fetchEvents({ query, done: resolve }))
      }
    })
  }

  componentWillReceiveProps({ location }) {
    if (hasChangedLocation(this.props.location, location)) {
      const query = queryString.parse(location.search)
      return this.props.fetchEvents({ query })
    }
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
            {items &&
              items.map(item => (
                <EventItem key={item.id} item={item} onDetail={this.handleDetail} />
              ))}
          </ul>
        </article>
      </div>
    )
  }
}

export default connect(
  state => ({
    items: state.events.items,
    pending: state.events.pending.items,
    hasError: !!state.events.error.items,
  }),
  dispatch => ({
    ...bindActionCreators({ fetchEvents }, dispatch),
  }),
)(Events)
