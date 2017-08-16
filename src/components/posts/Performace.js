import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button, ErrorMessage } from 'components/form';
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
          <Select
            name="event"
            value={event ? event.id : ''}
            onChange={this.onChange}
          >
            <option>선택하세요</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </Select>
          <ErrorMessage error={error} name={`performances[${idx}].event`} />
        </td>
        <td>
          <Input
            type="number"
            name="value"
            value={value}
            onChange={this.onChange}
          />
        </td>
        <td>
          {event && event.unit}
        </td>
        <td>
          <Input
            type="number"
            name="set1"
            value={set1}
            onChange={this.onChange}
          />
        </td>
        <td>
          <Input
            type="number"
            name="set2"
            value={set2}
            onChange={this.onChange}
          />
        </td>
        <td>
          <Input
            type="number"
            name="set3"
            value={set3}
            onChange={this.onChange}
          />
        </td>
        <td>
          <Input
            type="number"
            name="set4"
            value={set4}
            onChange={this.onChange}
          />
        </td>
        <td>
          <Input
            type="number"
            name="set5"
            value={set5}
            onChange={this.onChange}
          />
        </td>
        <td className="num">{total}</td>
        <td className="num">{volume}</td>
        <td>
          <Button value="Del" onClick={this.onDelete} />
        </td>
      </tr>
    );
  }
}

Performance.propTypes = {
  idx: PropTypes.number.isRequired,
  item: PropTypes.shape({
    event: PropTypes.shape({
      id: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    }),
    value: PropTypes.number,
    set1: PropTypes.number,
    set2: PropTypes.number,
    set3: PropTypes.number,
    set4: PropTypes.number,
    set5: PropTypes.number,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    last_performace: PropTypes.shape({
      value: PropTypes.number.isRequired,
    }),
  })).isRequired,
};

export default Performance;
