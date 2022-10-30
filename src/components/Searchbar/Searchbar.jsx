import React, { Component } from "react"
import {Header, Form, Button, Span, Input} from "components/Searchbar/Searchbar.styled"
import PropTypes from 'prop-types';
export class Searchbar extends Component{
     state = {
       name : ""
  }
  
    handleInputChange = event => {
    const {name, value} = event.currentTarget
    this.setState(
      {
        [name]: value,
      })
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state)
    this.reset()
    
    }

  reset = () => {
        this.setState({
    name: '',
    })
    }

  render() {
       const { name } = this.state
        return (
            <Header className="searchbar">
  <Form className="form" onSubmit={(e) => {e.preventDefault();
                    this.props.onSubmit(name);
                    this.reset()}}>
    <Button type="submit" className="button">
      <Span className="button-label">Search</Span>
    </Button>

    <Input
      className="input"
      name="name"
      value={name}
      onChange={this.handleInputChange}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </Form>
</Header>
        )
    }    
    
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}