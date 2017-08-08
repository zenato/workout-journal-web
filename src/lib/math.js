import _ from 'lodash';

export const add = (...numbers) => numbers.map(_.toNumber).reduce((a, b) => a + b);
