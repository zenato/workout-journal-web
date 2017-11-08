import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formValueSelector } from 'redux-form'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import { fetchPostWithEvents, insertPost, updatePost, deletePost } from 'state/actions/posts'
import Form, { validate } from 'components/posts/PostForm'
import { formatDate } from 'lib/date'
import { PAGE_TITLE } from 'config'

const PostForm = reduxForm({
  form: 'postForm',
  validate,
})(Form)

class Post extends Component {
  static async preload({ dispatch, params }) {
    return new Promise(resolve => {
      dispatch(
        fetchPostWithEvents({
          id: params.id === 'new' ? null : params.id,
          done: resolve,
        }),
      )
    })
  }

  handleSubmit = values => {
    const { match, location, history, insertPost, updatePost } = this.props
    if (match.params.id === 'new') {
      const item = insertPost({
        values,
        done: () => history.replace(`/posts/${item.id}${location.search}`),
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
        done: () => history.replace(`/posts/${location.search}`),
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
    hasError: !!state.posts.error.item || !!state.posts.error.events,
    pending: state.posts.pending.item || state.posts.pending.events,
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
