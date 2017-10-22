import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formValueSelector } from 'redux-form'
import { withDone } from 'react-router-server'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import * as postsActions from 'redux/modules/posts'
import {
  GET_POST,
  INSERT_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_POST_EVENTS,
} from 'redux/modules/posts'
import Form, { validate } from 'components/posts/PostForm'
import { formatDate } from 'lib/date'
import { PAGE_TITLE } from 'config'

const PostForm = reduxForm({
  form: 'postForm',
  validate,
})(Form)

class Post extends Component {
  constructor(props) {
    super(props)

    this.defaultItem = {
      workoutDate: new Date(),
    }
  }

  componentWillMount() {
    const { PostsActions, done, match } = this.props
    const promises = [PostsActions.getPostEvents()]
    if (!this.isNew()) {
      promises.push(PostsActions.getPost(match.params.id))
    }
    Promise.all(promises).then(done, done)
  }

  componentWillUnmount() {
    this.props.PostsActions.clearPost()
  }

  isNew = () => this.props.match.params.id === 'new'

  handleSubmit = async values => {
    const { location, history, PostsActions } = this.props
    if (this.isNew()) {
      const item = await PostsActions.insertPost(values)
      history.replace(`/posts/${item.id}${location.search}`)
    } else {
      await PostsActions.updatePost(values)
    }
  }

  handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      const { match, location, history, PostsActions } = this.props
      await PostsActions.deletePost(match.params.id)
      history.replace(`/posts/${location.search}`)
    }
  }

  handleMoveList = () => {
    this.props.history.push(`/posts/${this.props.location.search}`)
  }

  render() {
    const { item, events, hasError, isLoading, formValues } = this.props
    return (
      <div>
        {isLoading && <span>Now loading...</span>}

        {(this.isNew() || item) && (
          <article>
            <Helmet>
              <title>{`${item ? formatDate(item.workoutDate) : 'New Post'} | ${PAGE_TITLE}`}</title>
            </Helmet>
            <PostForm
              initialValues={item || this.defaultItem}
              enableReinitialize={true}
              formValues={formValues}
              events={events}
              hasError={isLoading ? false : hasError}
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
      hasError: !!(
        state.pender.failure[GET_POST_EVENTS] ||
        state.pender.failure[GET_POST] ||
        state.pender.failure[INSERT_POST] ||
        state.pender.failure[UPDATE_POST] ||
        state.pender.failure[DELETE_POST]
      ),
      isLoading: !!(
        state.pender.pending[GET_POST_EVENTS] ||
        state.pender.pending[GET_POST] ||
        state.pender.pending[INSERT_POST] ||
        state.pender.pending[UPDATE_POST] ||
        state.pender.pending[DELETE_POST]
      ),
      item: state.posts.item,
      events: state.posts.events,
      formValues: {
        performances: selector(state, 'performances') || [],
      },
    }),
    dispatch => ({
      PostsActions: bindActionCreators(postsActions, dispatch),
    }),
  )(Post),
)
