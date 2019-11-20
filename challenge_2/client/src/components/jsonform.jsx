// jshint esversion:6
import React from 'react';
import axios from 'axios';

class JsonForm extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      formData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({formData: event.target.value});
  }

  handleSubmit(event) {
    axios.post(`http://localhost:3000/reports`, {
      jsondata: this.state.formData
    }).then(() => this.props.getReports())
    .catch(err => console.log(err));
    this.setState({formData: ''});
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
      <p>JSON INPUT DATA:</p>
      <textarea value={this.state.formData} onChange={this.handleChange} name='jsondata' rows='25' cols='50'/>
      <br/>
      <input type='submit' value='CONVERT TO CSV'/>
      </form>
    );
  }
}

export default JsonForm;