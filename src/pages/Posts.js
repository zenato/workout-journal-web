import queryString from 'query-string'
import React, { Component } from 'react'
import { withDone } from 'react-router-server'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import * as PostsActions from 'redux/modules/posts'
import { hasChangedLocation } from 'lib/location'
import { Button } from 'components/form'
import SearchForm from 'components/SearchForm'
import PostItem from 'components/posts/PostItem'
import { PAGE_TITLE } from 'config'

const PostSearchForm = reduxForm({
  form: 'postSearchForm',
})(SearchForm)

class Posts extends Component {
  componentWillMount() {
    const { items, done } = this.props
    if (items.length < 1) {
      this.fetchData(this.props, done)
    } else {
      done()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasChangedLocation(this.props.location, nextProps.location)) {
      this.fetchData(nextProps)
    }
  }

  fetchData({ location }, done) {
    const query = queryString.parse(location.search)
    return this.props.actions.fetchPosts({ query, done })
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
    this.props.history.push(`/posts/new${this.props.location.search}`)
  }

  handleMorePosts = () => {
    return this.props.actions.fetchMorePosts({ after: this.props.pageInfo.endCursor })
  }

  render() {
    const { items, location, pageInfo, pending, error } = this.props
    const search = { ...queryString.parse(location.search) }
    return (
      <div>
        <Helmet>
          <title>{`Posts | ${PAGE_TITLE}`}</title>
        </Helmet>

        <section>
          <Button value="Add Post" onClick={this.handleForm} color="primary" />
        </section>

        <PostSearchForm
          initialValues={search}
          enableReinitialize={true}
          onSubmit={this.handleSearch}
          placeholder="Input post name."
        />

        {pending && <div>Now loading... </div>}
        {error && <div>Oops, An expected error seems to have occurred.</div>}

        <article>
          <ul>
            {items.map(item => <PostItem key={item.id} item={item} onDetail={this.handleDetail} />)}
          </ul>
        </article>

        <aside>
          {pageInfo.hasNextPage && <Button onClick={this.handleMorePosts} value="More" />}
        </aside>
      </div>
    )
  }
}

export default withDone(
  connect(
    state => ({
      items: state.posts.items,
      pageInfo: state.posts.pageInfo,
      pending: state.posts.pending.items,
      error: state.posts.error.items,
    }),
    dispatch => ({
      actions: bindActionCreators(PostsActions, dispatch),
    }),
  )(Posts),
)
