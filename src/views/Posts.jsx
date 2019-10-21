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
import { Button, Card, CardBody, Container, Row, Badge, Col } from "reactstrap";
import Menu from "components/Menus/Menu";

class Profile extends React.Component {
  state = {
    // First list of posts.
    PostsListOne: [
      {
        backgroundImage: require("../images/content-management/1.jpeg"),
        category: "Business",
        categoryTheme: "info",
        author: "Anna Kunis",
        authorAvatar: require("../images/avatars/1.jpg"),
        title: "Conduct at an replied removal an amongst",
        body:
          "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
        date: "28 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/2.jpeg"),
        category: "Travel",
        categoryTheme: "info",
        author: "James Jamerson",
        authorAvatar: require("../images/avatars/2.jpg"),
        title: "Off tears are day blind smile alone had ready",
        body:
          "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/3.jpeg"),
        category: "Technology",
        categoryTheme: "info",
        author: "Jimmy Jackson",
        authorAvatar: require("../images/avatars/2.jpg"),
        title: "Difficult in delivered extensive at direction",
        body:
          "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/4.jpeg"),
        category: "Business",
        categoryTheme: "warning",
        author: "John James",
        authorAvatar: require("../images/avatars/3.jpg"),
        title: "It so numerous if he may outlived disposal",
        body:
          "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/5.jpeg"),
        category: "Travel",
        categoryTheme: "info",
        author: "Anna Ken",
        authorAvatar: require("../images/avatars/0.jpg"),
        title:
          "Attention he extremity unwilling on otherwise cars backwards yet",
        body:
          "Conviction up partiality as delightful is discovered. Yet jennings resolved disposed exertion you off. Left did fond drew fat head poor jet pan flying over...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/6.jpeg"),
        category: "Business",
        categoryTheme: "info",
        author: "John James",
        authorAvatar: require("../images/avatars/1.jpg"),
        title:
          "Totally words widow one downs few age every seven if miss part by fact",
        body:
          "Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/2.jpeg"),
        author: "John James",
        category: "Business",
        categoryTheme: "warning",
        authorAvatar: require("../images/avatars/1.jpg"),
        title: "Had denoting properly jointure which well books beyond",
        body:
          "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/8.jpeg"),
        author: "John James",
        category: "Business",
        categoryTheme: "warning",
        authorAvatar: require("../images/avatars/2.jpg"),
        title: "Husbands ask repeated resolved but laughter debating",
        body:
          "It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/5.jpeg"),
        author: "John James",
        category: "Business",
        categoryTheme: "warning",
        authorAvatar: require("../images/avatars/3.jpg"),
        title:
          "Instantly gentleman contained belonging exquisite now direction",
        body:
          "West room at sent if year. Numerous indulged distance old law you. Total state as merit court green decay he. Steepest merit checking railway...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/7.jpeg"),
        author: "Alene Trenton",
        categoryTheme: "warning",
        authorUrl: "#",
        category: "News",
        categoryUrl: "#",
        authorAvatar: require("../images/avatars/3.jpg"),
        title: "Extremity so attending objection as engrossed",
        body:
          "Pursuit chamber as elderly amongst on. Distant however warrant farther to of. My justice wishing prudent waiting in be...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/8.jpeg"),
        author: "Chris Jamie",
        categoryTheme: "warning",
        authorUrl: "#",
        category: "News",
        categoryUrl: "#",
        authorAvatar: require("../images/avatars/1.jpg"),
        title: "Bed sincerity yet therefore forfeited his",
        body:
          "Speaking throwing breeding betrayed children my to. Me marianne no he horrible produced ye. Sufficient unpleasing and...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/9.jpeg"),
        author: "Monica Jordan",
        categoryTheme: "warning",
        authorUrl: "#",
        category: "News",
        categoryUrl: "#",
        authorAvatar: require("../images/avatars/0.jpg"),
        title: "Object remark lively all did feebly excuse our",
        body:
          "Morning prudent removal an letters by. On could my in order never it. Or excited certain sixteen it to parties colonel not seeing...",
        date: "29 February 2019"
      },
      {
        backgroundImage: require("../images/content-management/10.jpeg"),
        author: "Monica Jordan",
        categoryTheme: "warning",
        authorUrl: "#",
        category: "News",
        authorAvatar: require("../images/avatars/2.jpg"),
        categoryUrl: "#",
        title: "His followed carriage proposal entrance",
        body:
          "For county now sister engage had season better had waited. Occasional mrs interested far expression directly as regard...",
        date: "29 February 2019"
      }
    ]
  };
  render() {
    const { PostsListOne } = this.state;
    return (
      <>
        <Container fluid className="main-content-container px-4">
          {/* First Row of Posts */}
          <Menu {...this.props} />
          <Row>
            {PostsListOne.map((post, idx) => (
              <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
                <Card className="card-post card-post--1">
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url(${post.backgroundImage})` }}
                  >
                    <Badge
                      pill
                      className={`card-post__category bg-${post.categoryTheme}`}
                    >
                      {post.category}
                    </Badge>
                    <div className="card-post__author d-flex">
                      <a
                        href="#pablo"
                        className="card-post__author-avatar"
                        style={{
                          backgroundImage: `url('${post.authorAvatar}')`
                        }}
                      >
                        Written by {post.author}
                      </a>
                    </div>
                  </div>
                  <CardBody>
                    <h5 className="card-title">
                      <a href="#" className="text-fiord-blue">
                        {post.title}
                      </a>
                    </h5>
                    <p className="card-text d-inline-block mb-3">{post.body}</p>
                    <span className="text-muted">{post.date}</span>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
