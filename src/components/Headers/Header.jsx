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
import React from "react";

// reactstrap components
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <Link to="/">
                  <h1 className="display-2 text-white">
                    Research Fruit Picking
                  </h1>
                </Link>{" "}
                <p className="text-white mt-0 mb-5">
                  Research Fruit Picking aims to foster research
                  driven-innovation to solve smallholder farmers challenges
                  across Africa. Research Fruit Picking gives you exposure and
                  allows you to share, discuss and get feedback on your
                  research-based ideas. <br />
                  As an innovation lab, we are committed to support best ideas
                  along the innovation and entrepreneurship journeys. <br />
                  Don’t hesitate and take part of our research fruit picking
                  community !
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
