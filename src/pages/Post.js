import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formValueSelector } from 'redux-form'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import {
  fetchPostWithEvents,
  insertPost,
  updatePost,
  deletePost,
  REQUEST_FETCH_POST,
  REQUEST_FETCH_EVENTS,
  REQUEST_INSERT_POST,
  REQUEST_UPDATE_POST,
  REQUEST_DELETE_POST,
  FAILURE_FETCH_POST,
  FAILURE_FETCH_EVENTS,
  FAILURE_INSERT_POST,
  FAILURE_UPDATE_POST,
  FAILURE_DELETE_POST,
} from 'state/actions/posts'
import Form, { validate } from 'components/posts/PostForm'
import { formatDate } from 'lib/date'
import { PAGE_TITLE } from 'config'

const PostForm = reduxForm({
  form: 'postForm',
  validate,
})(Form)

class Post extends Component {
  static async preload({ store, params }) {
    return new Promise((resolve, reject) => {
      store.dispatch(
        fetchPostWithEvents({
          id: params.id === 'new' ? null : params.id,
          onSuccess: resolve,
          onFailure: reject,
        }),
      )
    })
  }

  handleSubmit = values => {
    const { match, location, history, insertPost, updatePost } = this.props
    if (match.params.id === 'new') {
      insertPost({
        values,
        onSuccess: item => history.replace(`/posts/${item.id}${location.search}`),
      })
    } else {
      updatePost({ values })
    }
  }

  handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      const { match, location, history, deletePost } = this.props
      deletePost({
        id: match.params.id,
        onSuccess: () => history.replace(`/posts/${location.search}`),
      })
    }
  }

  handleMoveList = () => {
    this.props.history.push(`/posts/${this.props.location.search}`)
  }

  render() {
    const { item, events, hasError, pending, formValues } = this.props
    return (
      <div>
        {pending && <span>Now loading...</span>}

        {item &&
          events && (
            <article>
              <Helmet>
                <title>{`${item
                  ? formatDate(item.workoutDate)
                  : 'New Post'} | ${PAGE_TITLE}`}</title>
              </Helmet>
              <PostForm
                initialValues={item}
                enableReinitialize={true}
                formValues={formValues}
                events={events}
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

const selector = formValueSelector('postForm')

export default connect(
  state => ({
    hasError: [
      FAILURE_FETCH_POST,
      FAILURE_FETCH_EVENTS,
      FAILURE_INSERT_POST,
      FAILURE_UPDATE_POST,
      FAILURE_DELETE_POST,
    ].includes(state.posts.status),
    pending: [
      REQUEST_FETCH_POST,
      REQUEST_FETCH_EVENTS,
      REQUEST_INSERT_POST,
      REQUEST_UPDATE_POST,
      REQUEST_DELETE_POST,
    ].includes(state.posts.status),
    item: state.posts.item,
    events: state.posts.events,
    formValues: {
      performances: selector(state, 'performances') || [],
    },
  }),
  dispatch => ({
    ...bindActionCreators({ fetchPostWithEvents, insertPost, updatePost, deletePost }, dispatch),
  }),
)(Post)
