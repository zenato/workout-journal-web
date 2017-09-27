import _ from 'lodash';
import moment from 'moment';

export function getValue (e) {
  const { type, value, checked } = e.target;

  let v = '';
  switch (type) {
    case 'checked':
      v = checked;
      break;
    case 'number':
      v = _.toNumber(value);
      if (e.target.min && _.toNumber(e.target.min) > v) {
        v = _.toNumber(e.target.min);
      } else if (e.target.max && _.toNumber(e.target.max) < v) {
        v = _.toNumber(e.target.max);
      }
      break;
    case 'date':
      v = moment(value).toISOString();
      break;
    default:
      v = value;
  }
  return v;
}

export const createChangeInputHandler = (ctx, propName) => (e) => new Promise((res) => {
  const changeProps = {
    [e.target.name]: getValue(e),
  };

  if (propName) {
    ctx.setState({
      [propName]: {
        ...ctx.state[propName],
        ...changeProps,
      },
    }, res);
  } else {
    ctx.setState(changeProps, res);
  }
});
