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
import Axios from "axios";
import { DEFAULT_URL } from "../config";

// reactstrap components
import { Container, Row } from "reactstrap";
import ShowPost from "components/Shows/ShowPost";
import ShowComments from "components/Shows/ShowComments";

class Post extends React.Component {
  state = {
    id: this.props.match.params.id,
    token: localStorage.getItem("token"),
    imgs: { 0: { img: require("assets/img/theme/profile-cover.jpg") } },
    prob: {},
    categories: {
      0: {
        id: 1,
        title: "Domain",
        sub_categories: { 0: { id: 1, title: "Category" } }
      }
    },
    uploading: false,
    id_domain: 0,
    id_category: 0,
    images_available: 1,
    disabled: true,
    photo_user: require("assets/img/theme/user-profile.png"),
    showSolution: false,
    showAdvantage: false,
    showApplications: false
  };

  componentDidMount() {
    Axios.get(`${DEFAULT_URL}api/problematic/${this.state.id}`)
      .then(res => {
        this.setState({ prob: res.data });
        if (res.data.photos[0].img)
          this.setState({ images_available: 1, imgs: res.data.photos });
        if (res.data.solution) this.setState({ showSolution: true });
        if (res.data.advantage) this.setState({ showAdvantage: true });
        if (res.data.possibleApplication)
          this.setState({ showApplications: true });
        if (res.data.category) {
          this.setState({
            categories: {
              0: {
                id: res.data.category.parent_category.id,
                title: res.data.category.parent_category.title,
                sub_categories: {
                  0: {
                    id: res.data.category.id,
                    title: res.data.category.title
                  }
                }
              }
            }
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <>
        {/* Page content */}
        <Container fluid className="main-content-container px-4">
          <Row>
            <ShowPost state={this.state} width="8" height="600px" />
            <ShowComments state={this.state} />
          </Row>
        </Container>
      </>
    );
  }
}

export default Post;
