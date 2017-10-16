import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'lib/date';
import classNames from 'classnames/bind';
import styles from './PostItem.scss';

const cx = classNames.bind(styles);

const PostItem = ({ item, onDetail }) => {
  const handleClick = e => {
    e.preventDefault();
    onDetail(item.id);
  };
  return (
    <li key={item.id} className={cx('list-item')}>
      <a href="" onClick={handleClick}>
        <div className={cx('info')}>
          <span className={cx('name')}>{formatDate(item.workoutDate)}</span>
          <span className={cx('weekday')}>{formatDate(item.workoutDate, 'ddd')}</span>
          <div className={cx('remark')}>{item.performances.map(p => p.event.name).join(' / ')}</div>
        </div>
      </a>
    </li>
  );
};

PostItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    workoutDate: PropTypes.string.isRequired,
    performances: PropTypes.arrayOf(
      PropTypes.shape({
        event: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ),
  }).isRequired,
  onDetail: PropTypes.func.isRequired,
};

export default PostItem;
