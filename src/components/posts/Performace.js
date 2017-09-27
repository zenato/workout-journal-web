import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { getValue } from 'lib/form';
import { add } from 'lib/math';
import { Input, Select, Button } from 'components/form';
import styles from './Performance.scss';

const cx = classNames.bind(styles);

class Performance extends Component {
  onChange = (e) => {
    const { item, events, onChange } = this.props;
    const name = e.target.name;
    const value = getValue(e);
    const state = {};

    if (name === 'event') {
      const event = _.head(events.filter(e => e.id === value));
      state.event = event;
      state.value = _.get(event, 'lastPerformance.value', event.value);
    } else {
      state[name] = value;
    }
    onChange(item.id, state);
  };

  onDelete = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.item.id);
  };

  render() {
    const { events, item } = this.props;
    const total = add(item.set1, item.set2, item.set3, item.set4, item.set5);
    const volume = total * item.value;

    return (
      <tr className={cx('performance')}>
        <td>
          <Select name="event" value={item.event ? item.event.id : ''} onChange={this.onChange}>
            <option>Select event</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </Select>
        </td>
        <td>
          <Input type="number" name="value" value={item.value} onChange={this.onChange} />
        </td>
        <td>
          {item.event && item.event.unit}
        </td>
        <td>
          <Input type="number" name="set1" value={item.set1} onChange={this.onChange} />
        </td>
        <td>
          <Input type="number" name="set2" value={item.set2} onChange={this.onChange} />
        </td>
        <td>
          <Input type="number" name="set3" value={item.set3} onChange={this.onChange} />
        </td>
        <td>
          <Input type="number" name="set4" value={item.set4} onChange={this.onChange} />
        </td>
        <td>
          <Input type="number" name="set5" value={item.set5} onChange={this.onChange} />
        </td>
        <td className="num">
          {total}
        </td>
        <td className="num">
          {volume}
        </td>
        <td>
          <Button value="Del" onClick={this.onDelete} />
        </td>
      </tr>
    );
  }
}

Performance.propTypes = {
  item: PropTypes.shape({
    event: PropTypes.shape({
      id: PropTypes.string.isRequired,
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    last_performace: PropTypes.shape({
      value: PropTypes.number.isRequired,
    }),
  })).isRequired,
};

export default Performance;
