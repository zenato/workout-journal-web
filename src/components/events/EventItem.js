import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './EventItem.scss';

const cx = classNames.bind(styles);

const EventItem = ({ item, onDetail }) => (
  <li key={item.id} className={cx('event-item')}>
    <a href="" onClick={(e) => onDetail(e, item.id)}>
      <div className={cx('info')}>
        <span className={cx('name')}>{item.name}</span>
        {item.value && (
          <span className={cx('value-unit')}>{item.value}{item.unit}</span>
        )}
        <div className={cx('remark')}>{item.remark}</div>
      </div>
    </a>
  </li>
);

EventItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    remark: PropTypes.string,
  }),
  onDetail: PropTypes.func.isRequired,
};

export default EventItem;
