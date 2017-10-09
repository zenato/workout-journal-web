import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form'
import classNames from 'classnames/bind';
import { FormGroup, Button, Input } from 'components/form';
import Performances from './Performances';
import styles from './PostForm.scss';

const cx = classNames.bind(styles);

class PostForm extends Component {
  handleDelete = (e) => {
    e.preventDefault();
    this.props.onDelete();
  };

  handleMoveList = (e) => {
    e.preventDefault();
    this.props.onMoveList();
  };

  render() {
    const { initialValues, handleSubmit, loading, error, events, formValues } = this.props;
    return (
      <form onSubmit={handleSubmit} className={cx('post-form')}>
        <FormGroup label="Workout Date">
          <Field type="date" name="workoutDate" component={Input} />
        </FormGroup>
        <FieldArray name="performances" events={events} formValues={formValues} component={Performances} />
        <FormGroup label="Remark">
          <Field type="text" name="remark" component={Input} />
        </FormGroup>

        {!loading && error && (
          <div className={cx('error')}>
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className={cx('tool')}>
          <Button type="submit" value="Save" className={cx('primary')} />
          <Button value="List" onClick={this.handleMoveList} />
          {initialValues.id && (
            <Button value="Delete" onClick={this.handleDelete} />
          )}
        </div>
      </form>
    );
  }
}

PostForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveList: PropTypes.func.isRequired,
};

export const validate = ({ workoutDate, performances }) => {
  const errors = {};

  if (!workoutDate) {
    errors.workoutDate = 'Required';
  }

  const performanceArrayErrors = [];
  (performances || []).forEach((performance, idx) => {
    const performanceErrors = {};
    if (performance) {
      if (!performance.event) {
        performanceErrors.event = 'Required';
      }
      if (!performance.value) {
        performanceErrors.value = 'Required';
      } else if (!/^[0-9]{1,3}$/.test(performance.value)) {
        performanceErrors.value = 'Must be numeric, 0-999';
      }
      ['set1', 'set2', 'set3', 'set4', 'set5'].forEach(fieldName => {
        const value = performance[fieldName];
        if (value && !/^[0-9]{1,3}$/.test(value)) {
          performanceErrors[fieldName] = 'Must be numeric, 0-999';
        }
      });
    }
    if (Object.keys(performanceErrors).length) {
      performanceArrayErrors[idx] = performanceErrors;
    }
  });

  if (performanceArrayErrors.length > 0) {
    errors.performances = performanceArrayErrors;
  }

  return errors;
};

export default PostForm;
