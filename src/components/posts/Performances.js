import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button } from 'components/form';
import Performance from 'components/posts/Performance';
import styles from './PostForm.scss';

const cx = classNames.bind(styles);

const Performances = ({ fields, meta: { error, submitFailed }, events, formValues }) => {
  return (
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
  )
};

Performances.propTypes = {
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  events: PropTypes.array.isRequired,
  formValues: PropTypes.shape({
    performances: PropTypes.array.isRequired,
  }).isRequired,
};

export default Performances;
