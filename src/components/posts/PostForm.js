import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { handleChangeInput } from 'lib/form';
import { Input, Button, ErrorMessage } from 'components/form';
import Performance from 'components/posts/Performace';
import { formatDate } from 'lib/date'

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performances: [],
      ...props.item,
    };

    this.handleChangeInput = handleChangeInput(this);
  }

  componentWillReceiveProps({ item }) {
    if (this.props.item !== item) {
      this.setState({ ...item });
    }
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

  handleChangePerformance = (idx, performance) => {
    const performances = [...this.state.performances];
    performances[idx] = performance;
    this.setState({ performances });
  };

  handleAddPerformance = (e) => {
    e.preventDefault();
    const performances = [...this.state.performances, {
      event: null,
      value: 0,
      set1: 0,
      set2: 0,
      set3: 0,
      set4: 0,
      set5: 0,
    }];
    this.setState({ performances });
  };

  handleDeletePerformance = (idx) => {
    const performances = [...this.state.performances];
    this.setState({ performances: performances.filter((p, i) => i !== idx) });
  };

  render() {
    const { error } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="item">
          <label htmlFor="post-workout-date">Date</label>
          <div className="field">
            <Input
              id="post-workout-date"
              type="date"
              name="workout_date"
              value={formatDate(this.state.workout_date)}
              onChange={this.handleChangeInput}
            />
            <ErrorMessage error={error} name="workout_date" />
          </div>
        </div>

        <div className="item">
          <label>Perf.</label>
          <div className="field overflow">
            <button onClick={this.handleAddPerformance} className="btn">Add</button>
            {this.state.performances.length > 0 && (
              <table className="performances">
                <colgroup>
                  <col width="*" />
                  <col width="8%" />
                  <col width="5%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="8%" />
                  <col width="5%" />
                  <col width="5%" />
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
                  <th className="num">Tot.</th>
                  <th className="num">Vol.</th>
                  <th>
                  </th>
                </tr>
                </thead>
                <tbody>
                {this.state.performances.map((item, idx) => (
                  <Performance
                    key={idx}
                    events={this.props.events}
                    idx={idx}
                    item={item}
                    error={error}
                    onChange={this.handleChangePerformance}
                    onDelete={this.handleDeletePerformance}
                  />
                ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="item">
          <label htmlFor="post-remark">Remark</label>
          <div className="field">
            <Input
              id="post-remark"
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

PostForm.propTypes = {
  item: PropTypes.object,
  events: PropTypes.array.isRequired,
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveList: PropTypes.func.isRequired,
};

export default PostForm;
