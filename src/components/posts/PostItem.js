import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PostItem.scss';

const cx = classNames.bind(styles);

const EventItem = ({ item, onDetail }) => (
  <li key={item.id} className={cx('list-item')}>
    <a href="" onClick={(e) => onDetail(e, item.id)}>
      <div className={cx('info')}>
        <span className={cx('name')}>{moment(item.workoutDate).format('YYYY-MM-DD')}</span>
        <span className={cx('weekday')}>{moment(item.workoutDate).format('ddd')}</span>
        <div className={cx('remark')}>{item.performances.map(p => p.event.name).join(' / ')}</div>
      </div>
    </a>
  </li>
);

EventItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    workoutDate: PropTypes.string.isRequired,
    performances: PropTypes.arrayOf(PropTypes.shape({
      event: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })),
  }).isRequired,
  onDetail: PropTypes.func.isRequired,
};

export default EventItem;
