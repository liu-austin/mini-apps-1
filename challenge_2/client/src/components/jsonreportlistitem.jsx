// jshint esversion:6
import React from 'react';
import axios from 'axios';

class JsonReportListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report.text,
      id: this.props.index
    };
    this.downloadReport = this.downloadReport.bind(this);
  }

  downloadReport(e) {
    var event = e;
    axios.get(`/reports/${this.state.id}`)
    .then((()=> console.log('Downloading...')))
    .catch(err => console.log(err))
    .finally(() => {
      event.preventDefault();
      window.location.href = `/reports/${this.state.id}`;
    });
  }

  render() {
    return (
      <div className='report-container'>
        <span className='report'>{this.state.report}</span>
        <button onClick={this.downloadReport} className='button'>DOWNLOAD</button>
      </div>
    );
  }
}

export default JsonReportListItem;