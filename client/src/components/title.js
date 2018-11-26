import React, { Component } from 'react';
import moment from 'moment';
class Title extends Component {
  state = {};
  render() {
    const now = moment();
    const date = {
      day: now.format('ddd').toUpperCase(),
      date: now.format('D'),
      month: now.format('MMM').toUpperCase(),
      year: now.format('YYYY')
    };
    return (
      <div className="row">
        <div className="col s12 m5 l4 title-day">{date.day}</div>
        <div className="col s12 m7 l8">
          <div className="row title-month-date">
            <span className="title-month">{date.month}</span>
            <span className="title-date">{date.date}</span>
          </div>
          <div className="row title-year">{date.year}</div>
        </div>
      </div>
    );
  }
}

export default Title;

// import React from 'react';

// const Title = () => {
//   const dateToFormat = ''
//   console.log(formattedDate);
//   return (
//     <div>
//       <h1>MON</h1>
//       <h4>JAN2</h4>
//       <h4>2008</h4>
//     </div>
//   );
// };

// export default Title;
