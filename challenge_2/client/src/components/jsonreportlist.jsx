// jshint esversion:6
import React from 'react';
import JsonReportListItem from './jsonreportlistitem.jsx';

const JsonReportList = (props) => {
  return (
    <div>
    {
      props.reports.length ?
      (
        props.reports.map((report, index) => {
          return (
            <JsonReportListItem report={report} index={index} key={index}/>
          );
        })
      )
      :
      (
        <p>NO REPORTS GENERATED</p>
      )
    }
    </div>
  );
 };

 export default JsonReportList;