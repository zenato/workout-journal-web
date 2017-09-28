import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { formatDate } from 'lib/date';
import { Button } from 'components/form';
import Performance from 'components/posts/Performace';
import styles from './PostForm.scss';

const cx = classNames.bind(styles);

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

const renderPerformances = ({ events, formValues }) => ({ fields, meta: { touched, error, submitFailed } }) => (
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
        {fields.map((performance, index) => (
          <Performance
            key={index}
            name={performance}
            values={formValues.performances[index] || {}}
            events={events}
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
        <FieldArray name="performances" component={renderPerformances({ events, formValues })} />
        <Field type="text" name="remark" label="Remark" component={renderField} />

        {!loading && error && (
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
})(PostForm);

