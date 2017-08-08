import queryString from 'query-string';
import React, { Component } from 'react';
import { withDone } from 'react-router-server';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as postsActions from 'redux/modules/posts';
import { hasChangedLocation } from 'lib/location';
import SearchForm from 'components/SearchForm';
import PostItem from 'components/posts/PostItem';
import { SITE_NAME } from '../constants';

class Posts extends Component {
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

  componentWillUnmount() {
    this.props.PostsActions.clearPosts();
  }

  fetchData({ location }) {
    const query = queryString.parse(location.search);
    return this.props.PostsActions.getPosts(query);
  }

  handleSearch = (values) => {
    const { history, match, } = this.props;
    history.push((`${match.path}?${queryString.stringify(values)}`));
  };

  handleDetail = (e, id) => {
    e.preventDefault();
    const { history, match, location, } = this.props;
    history.push((`${match.path}/${id}${location.search}`));
  };

  handleForm = () => {
    this.props.history.push(`/posts/new${this.props.location.search}`);
  };

  render() {
    const { items, location } = this.props;
    return (
      <div className="post-list">
        <Helmet>
          <title>{`Posts | ${SITE_NAME}`}</title>
        </Helmet>

        <input
          type="button"
          value="Add Post"
          onClick={this.handleForm}
          className="btn primary add-post"
        />
        <SearchForm location={location} onSubmit={this.handleSearch} placeholder="Input post name." />
        <ul>
          {items.map(item => (
            <PostItem key={item.id} item={item} onDetail={this.handleDetail} />
          ))}
        </ul>
      </div>
    );
  }
}

export default withDone(connect(
  (state) => ({
    items: state.posts.items,
  }),
  (dispatch) => ({
    PostsActions: bindActionCreators(postsActions, dispatch),
  }),
)(Posts));
