import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { formatDate } from 'lib/date';
import { Button } from 'components/form';
import Performance from 'components/posts/Performace';
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
      if (performance.set1 && !/^[0-9]{1,3}$/.test(performance.set1)) {
        performanceErrors.set1 = 'Must be numeric, 0-999';
      }
      if (performance.set2 && !/^[0-9]{1,3}$/.test(performance.set2)) {
        performanceErrors.set2 = 'Must be numeric, 0-999';
      }
      if (performance.set3 && !/^[0-9]{1,3}$/.test(performance.set3)) {
        performanceErrors.set3 = 'Must be numeric, 0-999';
      }
      if (performance.set4 && !/^[0-9]{1,3}$/.test(performance.set4)) {
        performanceErrors.set4 = 'Must be numeric, 0-999';
      }
      if (performance.set5 && !/^[0-9]{1,3}$/.test(performance.set5)) {
        performanceErrors.set5 = 'Must be numeric, 0-999';
      }
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={cx('item')}>
    <label>{label}</label>
    <div className={cx('field')}>
      <input
        {...input}
        type={type}
        value={type === 'date' ? formatDate(input.value) : input.value}
        placeholder={label}
        className={cx('form-control')}
      />
      {touched && error && <span className={cx('error')}>{error}</span>}
    </div>
  </div>
);

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
        <Field type="date" name="workoutDate" label="Workout Date" component={renderField} />
        <FieldArray name="performances" events={events} formValues={formValues} component={renderPerformances} />
        <Field type="text" name="remark" label="Remark" component={renderField} />

        {!loading && error && (
          <div className={cx('error')}>
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className={cx('tool')}>
          <Button type="submit" value="Save" className={cx('primary')} />
          <Button value="List" onClick={this.handleMoveList} />
          {initialValues && (
            <Button value="Delete" onClick={this.handleDelete} />
          )}
        </div>
      </form>
    );
  }
}

PostForm.propTypes = {
  initialValues: PropTypes.object,
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

