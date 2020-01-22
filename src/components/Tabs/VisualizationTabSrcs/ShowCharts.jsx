import React from 'react';
import PropTypes from 'prop-types';
import {
    Hspline,
    CLine,
    CBar,
    CDoughnut,
    CPie,
    CHorizontalBar,
    CPolar,
    Hmix
} from './ChartsTypes'

class ShowCharts extends React.Component {
    render() {
        return (
            <div style={{ background: 'white', marginTop: "1rem" }}>
                <div className="container my-container">
                    <div className="row">
                        <div className="col-md-6 col-sm-6" style={{ border: "0.5rem solid #f6f9fc" }}>
                            <CBar />
                        </div>
                        <div className="col-md-6 col-sm-6 " style={{ border: "0.5rem solid #f6f9fc" }}>
                            <CPie />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 " style={{ border: "0.5rem solid #f6f9fc" }}>
                            <CPolar />
                        </div>
                        <div className="col-md-6 col-sm-6 " style={{ border: "0.5rem solid #f6f9fc" }}>
                            <CLine />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 " style={{ border: "0.5rem solid #f6f9fc" }}>
                            <Hspline />
                        </div>
                        <div className="col-md-6 col-sm-6 " style={{ border: "0.5rem solid #f6f9fc" }}>
                            <CDoughnut />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 " style={{ border: "0.5rem solid #f6f9fc" }}>
                            <CHorizontalBar />
                        </div>
                        <div className="col-md-6 col-sm-6 " style={{ border: "0.5rem solid #f6f9fc" }}>
                            <CHorizontalBar />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

ShowCharts.propTypes = {

};

export default ShowCharts