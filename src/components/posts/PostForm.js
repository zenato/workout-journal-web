import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { Button, Input } from 'components/form';
import Performance from 'components/posts/Performance';
import styles from './PostForm.scss';

const cx = classNames.bind(styles);

const validate = ({ workoutDate, performances }) => {
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

const renderPerformances = ({ fields, meta: { error, submitFailed }, events, formValues }) => (
  <div className={cx('item')}>
    <label>Perf.</label>
    <div className={cx('field')}>
      <Button onClick={() => fields.push({})} value="Add" />
      <table>
        <colgroup>
          <col width="*" />
          <col width="8%" />
          <col width="5%" />
          <col width="8%" />
          <col width="8%" />
          <col width="8%" />
          <col width="8%" />
          <col width="8%" />
          <col width="8%" />
          <col width="5%" />
        </colgroup>
        <thead>
        <tr>
          <th>Name</th>
          <th colSpan={2}>Val.</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>Tot. / Vol.</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {fields.map((name, index) => (
          <Performance
            key={index}
            name={name}
            events={events}
            values={formValues.performances[index] || {}}
            onDelete={() => fields.remove(index)}
          />
        ))}
        </tbody>
      </table>
    </div>
  </div>
);

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
        <Field type="date" name="workoutDate" label="Workout Date" component={Input} />
        <FieldArray name="performances" events={events} formValues={formValues} component={renderPerformances} />
        <Field type="text" name="remark" label="Remark" component={Input} />

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

export default reduxForm({
  form: 'postForm',
  validate,
})(PostForm);

