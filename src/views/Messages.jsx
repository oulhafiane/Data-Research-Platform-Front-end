import React from 'react'
// javascipt plugin for creating charts
import Chart from 'chart.js'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'

// core components
import { chartOptions, parseOptions } from '../variables/charts.jsx'

import HeaderAdmin from 'components/Headers/HeaderAdmin.jsx'
import ShowProfile from 'components/Shows/ShowProfile.jsx'
import ShowPublicProfile from 'components/Shows/ShowPublicProfile.jsx'

class Messages extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: 'data1',
    profile: {
      uuid: '761d09db-6f5e-4969-9745-2c2a10dd2f37',
      email: 'mfilahi@student.1337.ma',
      firstName: 'Mohammed',
      lastName: 'Filahi',
      phone: '0604464402',
      _photo: {
        img:
          'https://waste-to-resources.s3.eu-west-3.amazonaws.com/media/cache/photo_scale_down/user-file-sdZcOo.png',
        thumbnail:
          'http://wtr.oulhafiane.me/media/cache/resolve/photo_thumb/user-file-sdZcOo.png',
      },
      address: '0 RUE HAY AL QODS RUE 41',
      city: 'MOHAMMEDIA',
      country: 'Morocco',
      postalCode: '28801',
      organization: '1337',
      bio:
        'In this process, three output parameters cutting width (kerf), surface roughness (Ra) and heat-affected zone (HAZ) are critical factors which affect the quality and efficiency of the cutting. In this paper, an experimental study was conducted to investigate the cutting quality in terms of kerf, Ra, and HAZ for the 309 stainless steel plasma cutting. First, the research tested the effect of input parameters including current, gas pressure, and cutting speed on the process outputs. Then, the results were used to develop three predictive models by intelligent systems based on genetic algorithm (GA) and artificial neural network (ANN). Finally, a hybrid technique of genetically optimized neural network systems (GONNs) was designed and employed to simultaneously optimize the process outputs. ',
    },
  }
  toggleNavs = (e, index) => {
    e.preventDefault()
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === 'data1' ? 'data2' : 'data1',
    })
    let wow = () => {
      console.log(this.state)
    }
    wow.bind(this)
    setTimeout(() => wow(), 1000)
    // this.chartReference.update();
  }
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions())
    }
  }
  render() {
    return (
      <>
        <HeaderAdmin />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row style={{ marginTop: '40px' }}>
            <Col md="7">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Card tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Project</th>
                      <th scope="col">Status</th>
                      <th scope="col">Completion</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require('assets/img/theme/team-4-800x800.jpg')}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">Jessica Jones</span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          pending
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <Button color="success" outline type="button">
                          Approve
                        </Button>
                        <Button color="danger" outline type="button">
                          Reject
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require('assets/img/theme/team-1-800x800.jpg')}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Mohammed Filahi
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">100%</span>
                          <div>
                            <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <Button color="success" outline type="button">
                          Approve
                        </Button>
                        <Button color="danger" outline type="button">
                          Reject
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </Col>
            <Col md="5">
              <ShowPublicProfile state={this.state} mt="mt-0" />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Messages
