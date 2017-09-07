import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withDone } from 'react-router-server';
import { Helmet } from 'react-helmet';
import * as postsActions from 'redux/modules/posts';
import { GET_POST, UPDATE_POST, DELETE_POST, GET_POST_EVENTS } from 'redux/modules/posts'
import { hasChangedLocation } from 'lib/location';
import withAuth from 'shared/withAuth';
import PostForm from 'components/posts/PostForm';
import { formatDate } from 'lib/date';
import { SITE_NAME } from '../constants';

const isNew = ({ id }) => id === 'new';

class Post extends Component {
  componentWillMount() {
    const { PostsActions, done, match, accessToken } = this.props;
    const promises = [PostsActions.getPostEvents(accessToken)];
    if (!isNew(match.params)) {
      promises.push(PostsActions.getPost(accessToken, match.params.id));
    }
    Promise.all(promises).then(done, done);
  }

  componentWillReceiveProps(nextProps) {
    if (hasChangedLocation(this.props.location, nextProps.location)) {
      this.fetchData(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.PostsActions.clearPost();
  }

  fetchData({ match }) {
    const { PostsActions, accessToken } = this.props;
    PostsActions.getPost(accessToken, match.params.id);
  }

  handleSubmit = async (values) => {
    const { match, location, history, PostsActions, accessToken } = this.props;
    if (isNew(match.params)) {
      const { data } = await PostsActions.insertPost(accessToken, values);
      history.replace(`/posts/${data.id}${location.search}`);
    } else {
      await PostsActions.updatePost(accessToken, match.params.id, values);
    }
  };

  handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      const { match, location, history, PostsActions, accessToken } = this.props;
      await PostsActions.deletePost(accessToken, match.params.id);
      history.replace(`/posts/${location.search}`);
    }
  };

  handleMoveList = () => {
    this.props.history.push(`/posts/${this.props.location.search}`);
  };

  render() {
    const { match, item, events, error, loading } = this.props;
    return (
      <div>
        {loading && (
          <span>Now loading...</span>
        )}

        {(isNew(match.params) || item) && (
          <div>
            <Helmet>
              <title>{`${item ? formatDate(item.workout_date) : 'New Post'} | ${SITE_NAME}`}</title>
            </Helmet>
            <PostForm
              item={item}
              events={events}
              error={error}
              onSubmit={this.handleSubmit}
              onDelete={this.handleDelete}
              onMoveList={this.handleMoveList}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withDone(withAuth(connect(
  (state) => ({
    error: state.posts.error,
    item: state.posts.item,
    events: state.posts.events,
    loading: (
      state.pender.pending[GET_POST_EVENTS]
      || state.pender.pending[GET_POST]
      || state.pender.pending[UPDATE_POST]
      || state.pender.pending[DELETE_POST]
    ),
  }),
  (dispatch) => ({
    PostsActions: bindActionCreators(postsActions, dispatch),
  }),
)(Post)));
