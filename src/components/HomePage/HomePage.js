import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { homePageTextSamples } from '../../utils/constants';

import './HomePage.css';

function HomePage() {
  return (
    <div className='dasboard-main-container p-2'>
      <div className='dasboard-container container-fluid'>
        <div className='top-charts-container row'>
          {/* <div className='col-12 col-md-6 mb-2'>
            <div className='card card-container shadow'>
              <PieChart
                series={[
                  {
                    paddingAngle: 5,
                    innerRadius: 60,
                    outerRadius: 80,
                    data: homePageTextSamples.PIE_CHART_DATA
                  },
                ]}
                margin={{ right: 5 }}
                className='chart-styling'
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'top', horizontal: 'middle' },
                    padding: 6,
                  },
                }}
              />
            </div>
          </div> */}
          <div className='col-12 col-md-6 mb-2'>
            <div className='card card-container shadow'>
              <BarChart
                className='chart-styling'
                series={[
                  { data: homePageTextSamples.BAR_GRAPH_DATA, label: 'No of Projects', id: 'pvId', },
                ]}
                xAxis={[{ data: homePageTextSamples.BAR_GRAPH_X_AXIS_DATA, scaleType: 'band', disableLine: true, disableTicks: true }]}
                yAxis={[{
                  disableTicks: true, 
                }]}
              />
            </div>
          </div>
        </div>
        <div className='top-charts-container row'>
          <div className='col-12 mb-2'>
            <div className='card card-container shadow'>
              <LineChart
                className='chart-styling'
                series={[{ data: homePageTextSamples.LINE_GRAPH_DATA , label: 'No.of Check List', area: false, showMark: false }]}
                xAxis={[{ scaleType: 'point', data: homePageTextSamples.LINE_GRAPH_X_AXIS_DATA,  }]}
                yAxis={[{ disableLine: true,
                  disableTicks: true,}]}
                grid={{  horizontal: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
