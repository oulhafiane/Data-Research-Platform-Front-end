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
import Axios from "axios";
import { DEFAULT_URL } from "../config";

// reactstrap components
import { Container } from "reactstrap";
import ShowPublicProfile from "components/Shows/ShowPublicProfile";

class PublicProfile extends React.Component {
  state = {
    uuid: this.props.match.params.uuid,
    profile: {},
    photo_user: require("assets/img/theme/user-profile.png")
  };

  cardStats = { padding: ".275rem" };

  componentDidMount() {
    Axios.get(
      `${DEFAULT_URL}api/profile/${
        this.state.uuid
      }?timestamp=${new Date().getTime()}`
    )
      .then(res => {
        console.log(res.data);
        this.setState({ profile: res.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <>
        <Container>
          <ShowPublicProfile state={this.state} mt="mt--6" />
        </Container>
      </>
    );
  }
}

export default PublicProfile;
