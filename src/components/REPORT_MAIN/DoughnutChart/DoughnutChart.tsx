import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DoughnutChart = ({chartData}: {chartData: {labels: string[],datasets: object[]}}) => {
    return (
        <Doughnut
            data={chartData}
            options={{
                maintainAspectRatio: false,
                legend: {
                    display: false
                }
            }}
        />
    )
}

export default DoughnutChart