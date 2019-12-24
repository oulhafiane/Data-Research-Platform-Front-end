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
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

class Data extends React.Component {
  render() {
    return (
      <>
        <p className="description">
          Raw denim you probably haven't heard of them jean shorts Austin.
          Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
          cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
          butcher retro keffiyeh dreamcatcher synth.
        </p>
        <p className="description">
          Raw denim you probably haven't heard of them jean shorts Austin.
          Nesciunt tofu stumptown aliqua, retro synth master cleanse.
        </p>
      </>
    );
  }
}

export default Data;
