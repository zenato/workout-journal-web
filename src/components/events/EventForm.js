import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { createChangeHandler } from 'lib/form';
import { Input, Button, ErrorMessage } from 'components/form';
import styles from './EventForm.scss';

const cx = classNames.bind(styles);

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      unit: 'Kg',
      value: 1,
      remark: '',
      ...props.item,
    };

    this.handleChange = createChangeHandler(this);
  }

  componentWillReceiveProps({ item }) {
    this.setState({ ...item, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleDelete = (e) => {
    e.preventDefault();
    this.props.onDelete();
  };

  handleMoveList = (e) => {
    e.preventDefault();
    this.props.onMoveList();
  };

  render() {
    const { error } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={cx('event-form')}>
        <div className={cx('item')}>
          <label htmlFor="event-name">Name</label>
          <div className={cx('field')}>
            <Input
              id="event-name"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <ErrorMessage error={error} name="name" />
          </div>
        </div>
        <div className={cx('item')}>
          <label htmlFor="event-value">Value</label>
          <div className={cx('field')}>
            <Input
              id="event-value"
              type="number"
              name="value"
              min={1}
              max={999}
              value={this.state.value}
              onChange={this.handleChange}
            />
            <ErrorMessage error={error} name="value" />
          </div>
        </div>
        <div className={cx('item')}>
          <label htmlFor="event-unit">Unit</label>
          <div className={cx('field')}>
            <Input
              id="event-unit"
              type="text"
              name="unit"
              value={this.state.unit}
              onChange={this.handleChange}
            />
            <ErrorMessage error={error} name="unit" />
          </div>
        </div>
        <div className={cx('item')}>
          <label htmlFor="event-remark">Remark</label>
          <div className={cx('field')}>
            <Input
              id="event-remark"
              type="text"
              name="remark"
              value={this.state.remark}
              onChange={this.handleChange}
            />
            <ErrorMessage error={error} name="remark" />
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
          {this.state.id && (
            <Button value="Delete" onClick={this.handleDelete} />
          )}
        </div>
      </form>
    );
  }
}

EventForm.propTypes = {
  item: PropTypes.object,
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveList: PropTypes.func.isRequired,
};

export default EventForm;
