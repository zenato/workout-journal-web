import React from 'react';
import PropTypes from 'prop-types';
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
    background-color: #f9f9f9;
  }
  &:active {
    background-color: #ebebeb;
  }
`;
Link.displayName = 'Link';

const Info = styled.div`
  flex: 1;
`;

const Title = styled.span`
  font-weight: bold;
  color: #ff5008;
`;

const ValueUnit = styled.span`
  margin-left: 5px;
  color: #4e4e4e;
`;

const Remark = styled.div`
  color: #a0a0a0;
  font-size: 0.7rem;
  margin-top: 5px;
`;

const EventItem = ({ item, onDetail }) => {
  const handleDetail = e => {
    e.preventDefault();
    onDetail(item.id);
  };
  return (
    <Wrapper>
      <Link href="" onClick={handleDetail}>
        <Info>
          <Title>{item.name}</Title>
          {item.value && (
            <ValueUnit>
              {item.value}
              {item.unit}
            </ValueUnit>
          )}
          <Remark>{item.remark}</Remark>
        </Info>
      </Link>
    </Wrapper>
  );
};

EventItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    unit: PropTypes.string.isRequired,
    remark: PropTypes.string,
  }),
  onDetail: PropTypes.func.isRequired,
};

export default EventItem;
