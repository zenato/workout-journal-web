import React, { Component } from 'react';
import { handleChangeInput } from 'lib/form';
import ErrorMessage from 'components/form/ErrorMessage';
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
      value: '',
      set1: '',
      set2: '',
      set3: '',
      set4: '',
      set5: '',
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
            <input
              id="post-workout-date"
              type="date"
              name="workout_date"
              value={formatDate(this.state.workout_date)}
              onChange={this.handleChangeInput}
              className="form-control"
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
            <input
              id="post-remark"
              type="text"
              name="remark"
              value={this.state.remark || ''}
              onChange={this.handleChangeInput}
              className="form-control"
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
          <input type="submit" value="Save" className="btn primary" />
          <input type="button" value="List" onClick={this.handleMoveList} className="btn" />
          {this.state.id && (
            <input type="button" value="Delete" onClick={this.handleDelete} className="btn" />
          )}
        </div>
      </form>
    );
  }
}

export default PostForm;
