import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames/bind';
import { FormGroup, Input, Button } from 'components/form';
import styles from './Performance.scss';

const cx = classNames.bind(styles);

const renderEvent = ({ events }) => ({ input, meta: { touched, error } }) => {
  const onChange = e => {
    e.preventDefault();
    const { id } = _.find(events, { id: e.target.value }) || {};
    input.onChange(id ? { id } : null);
  };
  return (
    <div>
      <select {...input} value={input.value.id} onChange={onChange} className={cx('form-control')}>
        <option>Select event</option>
        {events.map(e => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      {touched && error && <span className={cx('error')}>{error}</span>}
    </div>
  );
};

const Performance = ({ events, name, onDelete, values }) => {
  const total = _.sum(
    _.range(1, 6).map(i => {
      const value = _.toNumber(values[`set${i}`]);
      return isNaN(value) ? 0 : value;
    }),
  );
  const volume = total * (isNaN(values.value) ? 0 : _.toNumber(values.value));
  const selectedEvent = (values.event ? _.find(events, { id: values.event.id }) : null) || {};
  return (
    <div>
      <FormGroup label="Event">
        <Field name={`${name}.event`} component={renderEvent({ events })} />
      </FormGroup>
      <FormGroup label="Value">
        <Field name={`${name}.value`} type="text" component={Input} />
      </FormGroup>
      <FormGroup label="Unit">{selectedEvent.unit}</FormGroup>
      <FormGroup label="Set1">
        <Field name={`${name}.set1`} type="text" component={Input} />
      </FormGroup>
      <FormGroup label="Set2">
        <Field name={`${name}.set2`} type="text" component={Input} />
      </FormGroup>
      <FormGroup label="Set3">
        <Field name={`${name}.set3`} type="text" component={Input} />
      </FormGroup>
      <FormGroup label="Set4">
        <Field name={`${name}.set4`} type="text" component={Input} />
      </FormGroup>
      <FormGroup label="Set5">
        <Field name={`${name}.set5`} type="text" component={Input} />
      </FormGroup>
      <FormGroup label="Tot. / Vol.">
        {total} / {volume}
      </FormGroup>
      <FormGroup>
        <Button value="Del" onClick={onDelete} />
      </FormGroup>
    </div>
  );
};

Performance.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      last_performace: PropTypes.shape({
        value: PropTypes.number.isRequired,
      }),
    }),
  ).isRequired,
};

export default Performance;
