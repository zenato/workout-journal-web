import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { Button } from 'components/form';
import styles from './EventForm.scss';

const cx = classNames.bind(styles);

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
        <div className={cx('item')}>
          <label htmlFor="name">Name</label>
          <div className={cx('field')}>
            <Field type="text" name="name" component="input" className={cx('form-control')} />
          </div>
        </div>
        <div className={cx('item')}>
          <label htmlFor="value">Value</label>
          <div className={cx('field')}>
            <Field type="text" name="value" component="input" className={cx('form-control')} />
          </div>
        </div>
        <div className={cx('item')}>
          <label htmlFor="unit">Unit</label>
          <div className={cx('field')}>
            <Field type="text" name="unit" component="input" className={cx('form-control')} />
          </div>
        </div>
        <div className={cx('item')}>
          <label htmlFor="remark">Remark</label>
          <div className={cx('field')}>
            <Field type="text" name="remark" component="input" className={cx('form-control')} />
          </div>
        </div>

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
})(EventForm);
