import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { handleChangeInput } from 'lib/form';
import { Input, Button, ErrorMessage } from 'components/form';

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      ...props.item,
    };

    this.handleChangeInput = handleChangeInput(this);
  }

  componentWillReceiveProps({ error, item }) {
    this.setState({
      error,
      ...item,
    });
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
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="item">
          <label htmlFor="event-name">Name</label>
          <div className="field">
            <Input
              id="event-name"
              type="text"
              name="name"
              value={this.state.name || ''}
              onChange={this.handleChangeInput}
            />
            <ErrorMessage error={error} name="name" />
          </div>
        </div>
        <div className="item">
          <label htmlFor="event-value">Value</label>
          <div className="field">
            <Input
              id="event-value"
              type="text"
              name="value"
              value={this.state.value || ''}
              onChange={this.handleChangeInput}
            />
            <ErrorMessage error={error} name="value" />
          </div>
        </div>
        <div className="item">
          <label htmlFor="event-unit">Unit</label>
          <div className="field">
            <Input
              id="event-unit"
              type="text"
              name="unit"
              value={this.state.unit || ''}
              onChange={this.handleChangeInput}
            />
            <ErrorMessage error={error} name="unit" />
          </div>
        </div>
        <div className="item">
          <label htmlFor="event-remark">Remark</label>
          <div className="field">
            <Input
              id="event-remark"
              type="text"
              name="remark"
              value={this.state.remark || ''}
              onChange={this.handleChangeInput}
            />
            <ErrorMessage error={error} name="remark" />
          </div>
        </div>

        {error && (
          <div className="error">
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className="tool">
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
