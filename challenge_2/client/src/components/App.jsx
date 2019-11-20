// jshint esversion:6
import React from 'react';
import axios from 'axios';
import JsonForm from './jsonform.jsx';
import JsonReportList from './jsonreportlist.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reports: []
    };
    this.getReports = this.getReports.bind(this);
  }

  getReports() {
    axios.get(`http://localhost:3000/reports`)
    .then(results => results.data)
    .then(data => this.setState({reports: data}))
    .then(() => console.log(this.state.reports))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getReports();
  }

  render() {
    return (
      <div className='center'>
        <h1>CSV REPORT GENERATOR</h1>
        <JsonForm getReports={this.getReports}/>
        <h1>CSV REPORTS</h1>
        <JsonReportList reports={this.state.reports}/>
      </div>
    );
  }
}

export default App;