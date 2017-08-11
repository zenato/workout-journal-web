import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

const EventItem = ({ item, onDetail }) => (
  <li key={item.id} className="list-item">
    <a href="" onClick={(e) => onDetail(e, item.id)}>
      <div className="info">
        <span className="name">{moment(item.workout_date).format('YYYY-MM-DD')}</span>
        <span className="weekday">{moment(item.workout_date).format('ddd')}</span>
        <div className="remark">{item.performances.map(p => p.event.name).join(' / ')}</div>
      </div>
    </a>
  </li>
);

EventItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    workout_date: PropTypes.string.isRequired,
    performances: PropTypes.arrayOf(PropTypes.shape({
      event: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })),
  }).isRequired,
  onDetail: PropTypes.func.isRequired,
};

export default EventItem;
