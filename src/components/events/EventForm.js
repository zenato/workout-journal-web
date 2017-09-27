import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { Button } from 'components/form';
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={cx('item')}>
    <label>{label}</label>
    <div className={cx('field')}>
      <input {...input} placeholder={label} type={type} className={cx('form-control')}/>
      {touched && error && <span className={cx('error')}>{error}</span>}
    </div>
  </div>
);

class EventForm extends Component {
  handleDelete = () => {
    this.props.onDelete();
  };

  handleMoveList = () => {
    this.props.onMoveList();
  };

  render() {
    const { error, handleSubmit, initialValues } = this.props;
    return (
      <form onSubmit={handleSubmit} className={cx('event-form')}>
        <Field type="text" name="name" label="Name" component={renderField} />
        <Field type="text" name="unit" label="Unit" component={renderField} />
        <Field type="text" name="value" label="Value" component={renderField} />
        <Field type="text" name="remark" label="Remark" component={renderField} />

        {error && (
          <div className={cx('error')}>
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className={cx('tool')}>
          <Button type="submit" value="Save" className="primary" />
          <Button value="List" onClick={this.handleMoveList} />
          {initialValues && (
            <Button value="Delete" onClick={this.handleDelete} />
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
