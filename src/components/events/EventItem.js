import React from 'react';

const EventItem = ({ item, onDetail }) => (
  <li key={item.id} className="list-item">
    <a href="" onClick={(e) => onDetail(e, item.id)}>
      <div className="info">
        <span className="name">{item.name}</span>
        {item.value && (
          <span className="value-unit">{item.value}{item.unit}</span>
        )}
        <div className="remark">{item.remark}</div>
      </div>
    </a>
  </li>
);

export default EventItem;
