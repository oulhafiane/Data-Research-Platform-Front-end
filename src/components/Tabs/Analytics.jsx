import React from 'react'
import './index.css'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import 'react-pivottable/pivottable.css'
import TableRenderers from 'react-pivottable/TableRenderers'
import createPlotlyComponent from 'react-plotly.js/factory'
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers'

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly)

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot)

class Analytics extends React.Component {
  render() {
    const { data } = this.props.state
    return (
      <div style={{ height: '60vh', overflow: 'scroll' }}>
        <PivotTableUI
          data={data}
          onChange={s => {
            console.log(s)
            this.setState(s)
          }}
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...this.state}
        />
      </div>
    )
  }
}

export default Analytics
