/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Container, Row, Col, Card, CardImg } from "reactstrap";

class HeaderLanding extends React.Component {
  render() {
    return (
      <header className="footer">
        <Container className="container-lg">
          <Row>
            <Col className="mb-5 mb-lg-0" md="6">
              <p className="lead justify-content-center text-center">
                Explore the data section
              </p>
              <Card className="card-lift--hover shadow border-0">
                <Link to="/data/map">
                  <CardImg alt="..." src={require("assets/img/map.png")} />
                </Link>
              </Card>
            </Col>
            <Col className="mb-5 mb-md-0" md="6">
              <p className="lead justify-content-center text-center">
                Explore the research section
              </p>
              <Card className="card-lift--hover shadow border-0">
                <Link to="/default/posts">
                  <CardImg
                    alt="..."
                    src={require("assets/img/theme/landing.jpg")}
                  />
                </Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}

export default HeaderLanding;
