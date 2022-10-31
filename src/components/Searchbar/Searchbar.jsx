import React, { useState } from "react"
import {Header, Form, Button, Span, Input} from "components/Searchbar/Searchbar.styled"
import PropTypes from 'prop-types';

export function Searchbar ({onSubmit}) {
const [name, setName] = useState("")   

  const handleInputChange = event => {
    setName(event.currentTarget.value)
  }
  
  const reset = () => {
       setName("")
    }

  return (
    <Header className="searchbar">
     <Form className="form" onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name);
        reset() }}>
    <Button type="submit" className="button">
      <Span className="button-label">Search</Span>
    </Button>

    <Input
      className="input"
      name="name"
      value={name}
      onChange={handleInputChange}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </Form>
</Header>
        )
    }    
    

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}