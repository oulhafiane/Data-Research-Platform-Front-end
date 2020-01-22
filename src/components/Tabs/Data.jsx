/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Container
} from "reactstrap";
import Axios from 'axios';
import MlResult from './DataTabSrcs/MlResult'
import CardsAndModals from './DataTabSrcs/CardsAndModals/CardsAndModals'


class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      rows: null,
      data: null,
      showMl: false,
      modal: false,
      modaltype: 0
    }
  }
  // componentDidMount() {

  // }
  toggle = (modaltype) => {
    this.setState({ modal: !this.state.modal, modaltype })
  }
  showMlResult = () => {
    const url = 'http://127.0.0.1:5000/training'
    Axios.get(url)
      .then(res =>
        this.setState({
          columns: res.data['columns'],
          rows: res.data['index'], data: res.data['data'],
          showMl: true
        })
      )
      .catch(err => console.log(err));
  }
  render() {
    const { columns, rows, data, showMl, modal, modaltype } = this.state
    return (
      <Container>
        {!showMl
          ? <CardsAndModals
            toggle={this.toggle}
            modal={modal}
            showMlResult={this.showMlResult}
            modaltype={modaltype}
          />
          : <MlResult
            data={data}
            columns={columns}
            rows={rows}
          />
        }
      </Container>
    );
  }
}

export default Data;
