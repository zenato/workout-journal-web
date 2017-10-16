import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FormGroup, Button } from 'components/form';
import Performance from 'components/posts/Performance';
import styles from './Performances.scss';

const cx = classNames.bind(styles);

const Performances = ({ fields, meta: { error, submitFailed }, events, formValues }) => {
  return (
    <FormGroup label="Perf.">
      <Button onClick={() => fields.push({})} value="Add" />
      {fields.map((name, index) => (
        <div key={index} className={cx('performance')}>
          <div className={cx('index')}>#{index + 1}</div>
          <Performance
            key={index}
            name={name}
            events={events}
            values={formValues.performances[index] || {}}
            onDelete={() => fields.remove(index)}
          />
        </div>
      ))}
    </FormGroup>
  );
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
