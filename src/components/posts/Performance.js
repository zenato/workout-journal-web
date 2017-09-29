import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form'
import classNames from 'classnames/bind';
import { Button } from 'components/form';
import styles from './Performance.scss';

const cx = classNames.bind(styles);

const renderEvent = ({ events }) => ({ input, meta: { touched, error } }) => {
  const onChange = (e) => {
    e.preventDefault();
    const { id } = _.find(events, { id: e.target.value }) || {};
    input.onChange(id ? { id } : null);
  };
  return (
    <td>
      <select {...input} value={input.value.id} onChange={onChange} className={cx('form-control')}>
        <option>Select event</option>
        {events.map(e => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>
      {touched && error && <span className={cx('error')}>{error}</span>}
    </td>
  );
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <td>
    <input {...input} placeholder={label} type={type} className={cx('form-control')}/>
    {touched && error && <span className={cx('error')}>{error}</span>}
  </td>
);

class Performance extends Component {
  render() {
    const { events, name, onDelete, values } = this.props;
    const total = _.sum([
      values.set1,
      values.set2,
      values.set3,
      values.set4,
      values.set5,
    ].map(_.toNumber).filter(v => !_.isNaN(v)));
    const volume = total * (isNaN(values.value) ? 0 : _.toNumber(values.value));
    const selectedEvent = (values.event ? _.find(events, { id: values.event.id }) : null) || {};
    return (
      <tr className={cx('performance')}>
        <Field name={`${name}.event`} component={renderEvent({ events })} />
        <Field name={`${name}.value`} type="text" component={renderField} />
        <td>{selectedEvent.unit}</td>
        <Field name={`${name}.set1`} type="text" component={renderField} />
        <Field name={`${name}.set2`} type="text" component={renderField} />
        <Field name={`${name}.set3`} type="text" component={renderField} />
        <Field name={`${name}.set4`} type="text" component={renderField} />
        <Field name={`${name}.set5`} type="text" component={renderField} />
        <td>{total} / {volume}</td>
        <td>
          <Button value="Del" onClick={onDelete} />
        </td>
      </tr>
    );
  }
}

Performance.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    last_performace: PropTypes.shape({
      value: PropTypes.number.isRequired,
    }),
  })).isRequired,
};

export default Performance;
