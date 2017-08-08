import moment from 'moment';

export const formatDate = (date, format) => (date && moment(date).format(format || 'YYYY-MM-DD')) || '';
