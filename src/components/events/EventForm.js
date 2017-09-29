import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { Button, Input } from 'components/form';
import styles from './EventForm.scss';

const cx = classNames.bind(styles);

const validate = ({ name, unit, value }) => {
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

class EventForm extends Component {
  render() {
    const { error, handleSubmit, initialValues, onDelete, onMoveList } = this.props;
    return (
      <form onSubmit={handleSubmit} className={cx('event-form')}>
        <Field type="text" name="name" label="Name" component={Input} />
        <Field type="text" name="unit" label="Unit" component={Input} />
        <Field type="text" name="value" label="Value" component={Input} />
        <Field type="text" name="remark" label="Remark" component={Input} />

        {error && (
          <div className={cx('error')}>
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className={cx('tool')}>
          <Button type="submit" value="Save" className="primary" />
          <Button value="List" onClick={onMoveList} />
          {initialValues && (
            <Button value="Delete" onClick={onDelete} />
          )}
        </div>
      </form>
    );
  }
}

EventForm.propTypes = {
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveList: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'eventForm',
  validate,
})(EventForm);
