import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'lib/date';
import styled from 'styled-components';

const Wrapper = styled.li`
  border: solid 1px #c7c7c7;
  margin-bottom: 5px;
  background-color: #fff;
`;

const Link = styled.a`
  padding: 10px;
  display: flex;
  &:hover {
    background-color: #efefef;
  }
  &:active {
    background-color: #d7d7d7;
  }
`;
Link.displayName = 'Link';

const Info = styled.div`
  flex: 1;
`;

const WorkoutDate = styled.span`
  font-weight: bold;
  color: #ff5008;
`;

const Weekday = styled.span`
  margin-left: 3px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #7c7c7c;
`;

const Remark = styled.div`
  color: #a0a0a0;
  font-size: 0.7rem;
  margin-top: 5px;
`;

const PostItem = ({ item, onDetail }) => {
  const handleClick = e => {
    e.preventDefault();
    onDetail(item.id);
  };
  return (
    <Wrapper>
      <Link href="" onClick={handleClick}>
        <Info>
          <WorkoutDate>{formatDate(item.workoutDate)}</WorkoutDate>
          <Weekday>{formatDate(item.workoutDate, 'ddd')}</Weekday>
          <Remark>{item.performances.map(p => p.event.name).join(' / ')}</Remark>
        </Info>
      </Link>
    </Wrapper>
  );
};

PostItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    workoutDate: PropTypes.string.isRequired,
    performances: PropTypes.arrayOf(
      PropTypes.shape({
        event: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ),
  }).isRequired,
  onDetail: PropTypes.func.isRequired,
};

export default PostItem;
