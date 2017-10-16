import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames/bind';
import { FormGroup, Button, Input } from 'components/form';
import styles from './EventForm.scss';

const cx = classNames.bind(styles);

const EventForm = ({ hasError, handleSubmit, initialValues, onDelete, onMoveList }) => (
  <form onSubmit={handleSubmit} className={cx('event-form')}>
    <FormGroup label="Name">
      <Field type="text" name="name" component={Input} />
    </FormGroup>
    <FormGroup label="Unit">
      <Field type="text" name="unit" component={Input} />
    </FormGroup>
    <FormGroup label="Value">
      <Field type="text" name="value" component={Input} />
    </FormGroup>
    <FormGroup label="Remark">
      <Field type="text" name="remark" component={Input} />
    </FormGroup>

    {hasError && (
      <div className={cx('error')}>
        <span>Oops, An expected error seems to have occurred.</span>
      </div>
    )}

    <div className={cx('tool')}>
      <Button type="submit" value="Save" className="primary" />
      <Button value="List" onClick={onMoveList} />
      {initialValues && <Button value="Delete" onClick={onDelete} />}
    </div>
  </form>
);

EventForm.propTypes = {
  initialValues: PropTypes.object,
  hasError: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveList: PropTypes.func.isRequired,
};

export const validate = ({ name, unit, value }) => {
  const errors = {};

  if (!name) {
    errors.name = 'Required';
  }
  if (!unit) {
    errors.unit = 'Required';
  }
  if (!value) {
    errors.value = 'Required';
  } else if (!/^[0-9]{1,3}$/.test(value)) {
    errors.value = 'Must be a number, 0-999';
  }

  return errors;
};

export default EventForm;
