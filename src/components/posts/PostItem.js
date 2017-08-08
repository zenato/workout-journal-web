import moment from 'moment';
import React from 'react';

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

export default EventItem;
