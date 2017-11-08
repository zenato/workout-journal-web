import queryString from 'query-string'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import { fetchPosts, fetchMorePosts } from 'state/actions/posts'
import { hasChangedLocation } from 'lib/router'
import { Button } from 'components/form'
import SearchForm from 'components/SearchForm'
import PostItem from 'components/posts/PostItem'
import { PAGE_TITLE } from 'config'

const PostSearchForm = reduxForm({
  form: 'postSearchForm',
})(SearchForm)

class Posts extends Component {
  static async preload({ state, dispatch, query }) {
    return new Promise(resolve => {
      if (state.posts.items) {
        resolve()
      } else {
        dispatch(fetchPosts({ query, done: resolve }))
      }
    })
  }

  componentWillReceiveProps({ location }) {
    if (hasChangedLocation(this.props.location, location)) {
      const query = queryString.parse(location.search)
      return this.props.fetchPosts({ query })
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
    this.props.history.push(`/posts/new${this.props.location.search}`)
  }

  handleMorePosts = () => {
    return this.props.fetchMorePosts({ after: this.props.pageInfo.endCursor })
  }

  render() {
    const { items, location, pageInfo, pending, hasError } = this.props
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
        {hasError && <div>Oops, An expected error seems to have occurred.</div>}

        <article>
          <ul>
            {items &&
              items.map(item => (
                <PostItem key={item.id} item={item} onDetail={this.handleDetail} />
              ))}
          </ul>
        </article>

        <aside>
          {pageInfo &&
            pageInfo.hasNextPage && <Button onClick={this.handleMorePosts} value="More" />}
        </aside>
      </div>
    )
  }
}

export default connect(
  state => ({
    items: state.posts.items,
    pageInfo: state.posts.pageInfo,
    pending: state.posts.pending.items,
    hasError: !!state.posts.error.items,
  }),
  dispatch => ({
    ...bindActionCreators({ fetchPosts, fetchMorePosts }, dispatch),
  }),
)(Posts)
