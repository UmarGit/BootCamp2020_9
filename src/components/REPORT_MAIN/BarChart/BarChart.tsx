import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = ({chartData}: {chartData: {labels: string[],datasets: object[]}}) => {
    return (
        <Bar
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

export default BarChart