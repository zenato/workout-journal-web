import queryString from 'query-string';
import React, { Component } from 'react';
import { withDone } from 'react-router-server';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { reduxForm } from 'redux-form'
import * as postsActions from 'redux/modules/posts';
import { hasChangedLocation } from 'lib/location';
import { Button } from 'components/form';
import SearchForm from 'components/SearchForm';
import PostItem from 'components/posts/PostItem';

const PostSearchForm = reduxForm({
  form: 'postSearchForm',
})(SearchForm);

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

  fetchData({ location }) {
    const query = queryString.parse(location.search);
    return this.props.PostsActions.getPosts(query);
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
    this.props.history.push(`/posts/new${this.props.location.search}`);
  };

  handleMorePosts = () => {
    return this.props.PostsActions.getMorePosts(this.props.pageInfo.endCursor);
  };

  render() {
    const { items, location, pageInfo } = this.props;
    const search = { ...queryString.parse(location.search) };
    return (
      <div>
        <Helmet>
          <title>{`Posts | ${process.env.REACT_APP_SITE_NAME}`}</title>
        </Helmet>

        <section>
          <Button value="Add Post" onClick={this.handleForm} className="primary" />
        </section>

        <PostSearchForm
          initialValues={search}
          enableReinitialize={true}
          onSubmit={this.handleSearch}
          placeholder="Input post name."
        />

        <article>
          <ul>
            {items.map(item => (
              <PostItem key={item.id} item={item} onDetail={this.handleDetail} />
            ))}
          </ul>
        </article>

        <aside>
          {pageInfo.hasNextPage && (
            <Button onClick={this.handleMorePosts} value="More" />
          )}
        </aside>
      </div>
    );
  }
}

export default withDone(connect(
  (state) => ({
    items: state.posts.items,
    pageInfo: state.posts.pageInfo,
  }),
  (dispatch) => ({
    PostsActions: bindActionCreators(postsActions, dispatch),
  }),
)(Posts));
