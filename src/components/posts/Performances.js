import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormGroup, Button } from 'components/form'
import Performance from 'components/posts/Performance'

const Container = styled.div`
  border: solid 1px #d5d5d5;
  padding: 10px;
  margin-top: 10px;
`

const Index = styled.div`
  color: #ca2a00;
  font-weight: bold;
`

const Performances = ({ fields, meta: { error, submitFailed }, events, formValues }) => {
  return (
    <FormGroup label="Perf.">
      <Button onClick={() => fields.push({})} value="Add" />
      {fields.map((name, index) => (
        <Container key={index}>
          <Index>#{index + 1}</Index>
          <Performance
            key={index}
            name={name}
            events={events}
            values={formValues.performances[index] || {}}
            onDelete={() => fields.remove(index)}
          />
        </Container>
      ))}
    </FormGroup>
  )
}

Performances.propTypes = {
  fields: PropTypes.shape({
    map: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  events: PropTypes.array.isRequired,
  formValues: PropTypes.shape({
    performances: PropTypes.array.isRequired,
  }).isRequired,
}

export default Performances
