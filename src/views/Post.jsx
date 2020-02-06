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
import React from 'react'
import Axios from 'axios'
import { DEFAULT_URL } from '../config'
import { connect } from 'react-redux'
import { getUser } from 'actions/userAction'
import authService from '../services/auth-service'
// reactstrap components
import { Container, Row } from 'reactstrap'
import ShowPost from 'components/Shows/ShowPost'
import ShowComments from 'components/Shows/ShowComments'
import MenuPost from 'components/Menus/MenuPost'

class Post extends React.Component {
  state = {
    id: this.props.match.params.id,
    token: localStorage.getItem('token'),
    imgs: { 0: { img: require('assets/img/theme/profile-cover.jpg') } },
    prob: {},
    categories: {
      0: {
        id: 1,
        title: 'Domain',
        sub_categories: { 0: { id: 1, title: 'Category' } },
      },
    },
    countVotes: 0,
    countComments: 0,
    id_domain: 0,
    id_category: 0,
    images_available: 1,
    disabled: true,
    photo_user: require('assets/img/theme/user-profile.png'),
    showSolution: false,
    showAdvantage: false,
    showApplications: false,
    done: false,
    isSearcher: false,
  }

  updateCounts = () => {
    this.setState({
      countComments: this.state.countComments + 1,
    })
  }

  getCounts = () => {
    Axios.get(
      `${DEFAULT_URL}api/problematic/${
        this.state.id
      }/count?timestamp=${new Date().getTime()}`,
    )
      .then(res => {
        this.setState({
          countVotes: res.data.extras.countVotes,
          countComments: res.data.extras.countComments,
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  async componentDidMount() {
    authService.isAuthenticated().then(e => this.setState({ isSearcher: e }))
    await this.props.getUser()
    this.getCounts()
    Axios.get(`${DEFAULT_URL}api/problematic/${this.state.id}`)
      .then(res => {
        this.setState({ prob: res.data })
        if (res.data.photos[0] && res.data.photos[0].img)
          this.setState({ images_available: 1, imgs: res.data.photos })
        if (res.data.solution) this.setState({ showSolution: true })
        if (res.data.advantage) this.setState({ showAdvantage: true })
        if (res.data.possibleApplication)
          this.setState({ showApplications: true })
        if (res.data.category) {
          this.setState({
            categories: {
              0: {
                id: res.data.category.parent_category.id,
                title: res.data.category.parent_category.title,
                sub_categories: {
                  0: {
                    id: res.data.category.id,
                    title: res.data.category.title,
                  },
                },
              },
            },
          })
        }
        this.setState({ done: true })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  render() {
    return (
      <>
        {/* Page content */}
        <Container fluid className="main-content-container px-4">
          {this.state.done ? (
            <>
              {this.props.user ? (
                this.props.user.uuid === this.state.prob.owner.uuid ? (
                  <MenuPost state={this.state} />
                ) : null
              ) : null}
              <Row>
                <ShowPost
                  state={this.state}
                  request={true}
                  width="8"
                  getCounts={this.getCounts}
                />
                <ShowComments
                  state={this.state}
                  user={this.props.user}
                  updateCounts={this.updateCounts}
                />
              </Row>
            </>
          ) : null}
        </Container>
      </>
    )
  }
}

const mapStateProps = state => ({
  photo_user: state.user.photo_user,
  user: state.user.user,
})

export default connect(mapStateProps, { getUser })(Post)
