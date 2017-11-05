import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formValueSelector } from 'redux-form'
import { withDone } from 'react-router-server'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import * as PostsActions from 'state/actions/posts'
import Form, { validate } from 'components/posts/PostForm'
import { formatDate } from 'lib/date'
import { PAGE_TITLE } from 'config'

const PostForm = reduxForm({
  form: 'postForm',
  validate,
})(Form)

class Post extends Component {
  componentWillMount() {
    const { item, actions, done, match } = this.props
    if (!item) {
      actions.fetchPostWithEvents({
        id: match.params.id === 'new' ? null : match.params.id,
        done,
      })
    } else {
      done()
    }
  }

  componentWillUnmount() {
    this.props.actions.clearPost()
  }

  handleSubmit = values => {
    const { match, location, history, actions } = this.props
    if (match.params.id === 'new') {
      const item = actions.insertPost({
        values,
        done: () => history.replace(`/posts/${item.id}${location.search}`),
      })
    } else {
      actions.updatePost({ values })
    }
  }

  handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      const { match, location, history, actions } = this.props
      await actions.deletePost({
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

        {item && events && (
          <article>
            <Helmet>
              <title>{`${item ? formatDate(item.workoutDate) : 'New Post'} | ${PAGE_TITLE}`}</title>
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

export default withDone(
  connect(
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
      actions: bindActionCreators(PostsActions, dispatch),
    }),
  )(Post),
)
