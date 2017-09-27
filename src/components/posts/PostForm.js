import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { createChangeHandler } from 'lib/form';
import { Input, Button, ErrorMessage } from 'components/form';
import Performance from 'components/posts/Performace';
import { formatDate } from 'lib/date'
import styles from './PostForm.scss';

const cx = classNames.bind(styles);

let performanceIndex = 0;
const getUniqueKey = () => ++performanceIndex;

class PostForm extends Component {
  constructor(props) {
    super(props);

    const { performances, ...item } = this.props.item;

    this.state = {
      performances: performances.map(perf => ({
        id: getUniqueKey(),
        ...perf,
      })),
      workoutDate: new Date().getTime(),
      remark: '',
      ...item,
    };
    this.handleChange = createChangeHandler(this);
  }

  componentWillReceiveProps({ item }) {
    const { performances, ...props } = item;
    if (this.props.item !== item) {
      this.setState({
        ...props,
        performances: performances.map(perf => ({ ...perf, id: getUniqueKey() }))
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { performances, ...item } = this.state;
    this.props.onSubmit({
      ..._.omit(item, ['id']),
      performances: performances.map(({ id, event, ...others }) => ({
        ...others,
        event: _.get(event, 'id'),
      })),
    });
  };

  handleDelete = (e) => {
    e.preventDefault();
    this.props.onDelete();
  };

  handleMoveList = (e) => {
    e.preventDefault();
    this.props.onMoveList();
  };

  handleChangePerformance = (id, state) => {
    const current = _.find(this.state.performances, { id });
    const performances = this.state.performances.map(p => p !== current ? p : { ...current, ...state });
    this.setState({ performances });
  };

  handleAddPerformance = (e) => {
    e.preventDefault();
    this.setState({
      performances: [
        ...this.state.performances,
        {
          id: getUniqueKey(),
          event: null,
          value: 0,
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
        },
      ],
    });
  };

  handleDeletePerformance = (id) => {
    this.setState({
      performances: this.state.performances.filter(p => p.id !== id),
    });
  };

  render() {
    const { loading, error, events } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={cx('post-form')}>
        <div className={cx('item')}>
          <label htmlFor="post-workout-date">Date</label>
          <div className={cx('field')}>
            <Input
              id="post-workout-date"
              type="date"
              name="workoutDate"
              value={formatDate(this.state.workoutDate)}
              onChange={this.handleChange}
            />
            <ErrorMessage error={error} name="workoutDate" />
          </div>
        </div>

        <div className={cx('item')}>
          <label>Perf.</label>
          <div className={cx('field')}>
            <Button onClick={this.handleAddPerformance} value="Add" />
            {this.state.performances.length > 0 && (
              <table>
                <colgroup>
                  <col width="*" />
                  <col width="8%" />
                  <col width="5%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="5%" />
                </colgroup>
                <thead>
                <tr>
                  <th>Name</th>
                  <th colSpan={2}>Val.</th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th className={cx('num')}>Tot.</th>
                  <th className={cx('num')}>Vol.</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.performances.map(item => (
                  <Performance
                    key={`performance-${item.id}`}
                    events={events}
                    item={item}
                    error={error}
                    onChange={this.handleChangePerformance}
                    onDelete={this.handleDeletePerformance}
                  />
                ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className={cx('item')}>
          <label htmlFor="post-remark">Remark</label>
          <div className={cx('field')}>
            <Input
              id="post-remark"
              type="text"
              name="remark"
              value={this.state.remark || ''}
              onChange={this.handleChange}
            />
            <ErrorMessage error={error} name="remark" />
          </div>
        </div>

        {!loading && error && (
          <div className={cx('error')}>
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className={cx('tool')}>
          <Button type="submit" value="Save" className="primary" />
          <Button value="List" onClick={this.handleMoveList} />
          {this.state.id && (
            <Button value="Delete" onClick={this.handleDelete} />
          )}
        </div>
      </form>
    );
  }
}

PostForm.propTypes = {
  item: PropTypes.object,
  events: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveList: PropTypes.func.isRequired,
};

export default PostForm;
