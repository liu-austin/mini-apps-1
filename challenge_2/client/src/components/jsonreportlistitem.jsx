// jshint esversion:6
import React from 'react';

class JsonReportListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report.text,
      id: this.props.index
    };
  }

  render() {
    return (
      <div className='report-container'>
        <span className='report'>{this.state.report}</span>
        <button className='button'>DOWNLOAD</button>
      </div>
    );
  }
}

export default JsonReportListItem;