import _ from 'lodash';
import React, { Component } from 'react';
import ErrorMessage from 'components/form/ErrorMessage';
import { getValue } from 'lib/form';
import { add } from 'lib/math';

class Performance extends Component {
  onChange = (e) => {
    const { idx, item, events } = this.props;
    const name = e.target.name;
    const value = getValue(e);
    const performance = {...item};

    if (name === 'event') {
      const event = _.head(events.filter(e => e.id === Number(value)));
      performance['event'] = event;
      performance['value'] = _.get(event, 'last_performance.value', event.value)
    } else {
      performance[name] = value;
    }

    this.props.onChange(idx, performance);
  };

  onDelete = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.idx);
  };

  render() {
    const { idx, events, error } = this.props;
    const { event, value, set1, set2, set3, set4, set5 } = this.props.item;
    const total = add(set1, set2, set3, set4, set5);
    const volume = total * value;

    return (
      <tr>
        <td>
          <select
            name="event"
            value={event ? event.id : ''}
            onChange={this.onChange}
            className="form-control">
            <option>선택하세요</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
          <ErrorMessage error={error} name={`performances[${idx}].event`} />
        </td>
        <td>
          <input
            type="number"
            name="value"
            value={value}
            onChange={this.onChange}
            className="form-control"
          />
        </td>
        <td>
          {event && event.unit}
        </td>
        <td>
          <input
            type="number"
            name="set1"
            value={set1}
            onChange={this.onChange}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="number"
            name="set2"
            value={set2}
            onChange={this.onChange}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="number"
            name="set3"
            value={set3}
            onChange={this.onChange}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="number"
            name="set4"
            value={set4}
            onChange={this.onChange}
            className="form-control"
          />
        </td>
        <td>
          <input
            type="number"
            name="set5"
            value={set5}
            onChange={this.onChange}
            className="form-control"
          />
        </td>
        <td className="num">{total}</td>
        <td className="num">{volume}</td>
        <td>
          <button onClick={this.onDelete} className="btn">Del</button>
        </td>
      </tr>
    );
  }
}

export default Performance;
