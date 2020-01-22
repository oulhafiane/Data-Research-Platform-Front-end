import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
    Pie,
    Line,
    Doughnut,
    Bar,
    Polar,
    HorizontalBar
} from 'react-chartjs-2';
import {
    Polardata,
    data,
    BarData,
    Doughnutdata,
    linedata,
    Horizontaldata
} from './data'

const Hmix = () => {
    const options = {
        responsive: true,
        tooltips: {
            mode: 'label'
        },
        elements: {
            line: {
                fill: false
            }
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                }
            ]
        }
    };

    const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("This text drawn by a plugin", 100, 100);
        }
    }];
    return (
        <div>
            <Bar
                data={data}
                options={options}
                plugins={plugins}
            />
        </div>
    );
}
const Hspline = () => {
    const options = {
        lables: ['mon', 'th', 'th', 'th', 'th'],
        chart: {
            type: 'spline'
        },
        title: {
            text: 'My chart'
        },
        series: [
            {
                data: [1, 2, 1, 4, 3, 6]
            }
        ]
    };
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}

const CPolar = () => {
    return (
        <Polar data={Polardata}
            width='100%'
            height='80%'
            options={{
                responsive: true
            }}
        />
    )
}

const CBar = () => {
    return (
        <Bar
            data={BarData}
            width={100}
            height={50}
            options={{
                responsive: true,
                maintainAspectRatio: false
            }}
        />
    )
}

const CDoughnut = () => {
    return (
        <Doughnut data={Doughnutdata}
            width='100%'
            height='80%'
            options={{
                responsive: true
            }}
        />
    )
}

const CHorizontalBar = () => {
    return (
        <HorizontalBar data={Horizontaldata}
            width='100%'
            height='80%'
            options={{
                responsive: true
            }}
        />
    )
}

const CPie = () => {
    return (
        <Pie data={data}
            width='100%'
            height='80%'
            options={{
                responsive: true
            }}
        />
    )
}

const CLine = () => {
    return (
        <Line data={linedata}
            width='100%'
            height='80%'
            options={{
                responsive: true
            }}
        />
    )
}

export {
    Hspline,
    CBar,
    CDoughnut,
    CPie,
    CHorizontalBar,
    CLine,
    CPolar,
    Hmix,
}