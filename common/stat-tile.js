import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, defaults } from 'chart.js';
import { Chart } from 'react-chartjs-2';

const StatTile = ({value, desc, data, background}) => {

  let tileStyle = {
    display: 'flex',
    padding: '20px',
    background:'#00c292',
    color:'#fff'
  };
  if (background != null) {
    tileStyle.background = background;
  }

  let option = {
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
              display:false,
          },
      }],
      yAxes: [{
        display: false,
        gridLines: {
              display:false,
          },
      }]
    },
    legend: {
          display: false
       }
  }

  let type = 'bar';

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
      <div className="sm-res-mg-t-30 tb-res-mg-t-30" style={tileStyle}>
        <div>
          <h2>{value}</h2>
          <p> {desc} </p>
        </div>
        <div className="status-tile" style={{marginLeft: 'auto', marginTop: '10px', width:'50%'}}>
          <Chart
            type= {type}
            data= {data}
            options={option}
           />
        </div>
      </div>
    </div>
  );
};

StatTile.propTypes = {
  value: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  background: PropTypes.string,
};

export default StatTile;
