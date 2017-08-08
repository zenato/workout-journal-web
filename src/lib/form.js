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
      break;
    case 'date':
      v = moment(value).toISOString();
      break;
    default:
      v = value;
  }
  return v;
}

export function handleChangeInput (ctx) {
  return function (e) {
    return new Promise((res) => {
      this.setState({
        [e.target.name]: getValue(e),
      }, res);
    });
  }.bind(ctx);
}
