import queryString from 'query-string';
import React, { Component } from 'react';
import { withDone } from 'react-router-server';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { reduxForm } from 'redux-form'
import * as eventsActions from 'redux/modules/events';
import { GET_EVENTS } from 'redux/modules/events'
import { hasChangedLocation } from 'lib/location';
import { Button } from 'components/form';
import SearchForm from 'components/SearchForm';
import EventItem from 'components/events/EventItem';

const EventSearchForm = reduxForm({
  form: 'eventSearchForm',
})(SearchForm);

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
    const query = queryString.parse(location.search);
    return this.props.EventsActions.getEvents(query);
  }

  handleSearch = (values) => {
    const { history, match, } = this.props;
    history.push((`${match.path}?${queryString.stringify(values)}`));
  };

  handleDetail = (id) => {
    const { history, match, location, } = this.props;
    history.push((`${match.path}/${id}${location.search}`));
  };

  handleForm = () => {
    this.props.history.push(`/events/new${this.props.location.search}`);
  };

  render() {
    const { items, location, loading } = this.props;
    const search = { ...queryString.parse(location.search) };
    return (
      <div>
        <Helmet>
          <title>{`Events | ${process.env.REACT_APP_SITE_NAME}`}</title>
        </Helmet>

        <section>
          <Button value="Add Event" onClick={this.handleForm} className="primary" />
        </section>

        <EventSearchForm
          initialValues={search}
          enableReinitialize={true}
          onSubmit={this.handleSearch}
          placeholder="Input event name."
        />

        <article>
          {loading && (
            <span>Now loading...</span>
          )}

          <ul>
            {items.map(item => (
              <EventItem key={item.id} item={item} onDetail={this.handleDetail} />
            ))}
          </ul>
        </article>
      </div>
    );
  }
}

export default withDone(connect(
  (state) => ({
    items: state.events.items,
    loading: state.pender.pending[GET_EVENTS],
  }),
  (dispatch) => ({
    EventsActions: bindActionCreators(eventsActions, dispatch),
  }),
)(Events));
