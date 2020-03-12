import React from 'react'
import {
  Card,
  Container,
  CardHeader,
  Table,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'
import Axios from 'axios'
import { DEFAULT_URL } from '../config'
import { Link } from 'react-router-dom'
import ModalCreateDataset from 'components/Modals/ModalCreateDataset'

class MyDataSets extends React.Component {
  state = {
    token: localStorage.getItem('token'),
    datasets: [],
    limit: 12,
    currentPage: 1,
    totalPages: 0,
    itemsCount: 0,
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
    })
  }
  gotoTokenPage = page => {
    this.setState({ currentPage: page }, () => {
      this.loadDatasets()
    })
  }
  deleteDataset = uuid => {
    const config = {
      headers: { Authorization: 'bearer ' + this.state.token },
    }
    Axios.delete(`${DEFAULT_URL}api/current/dataset/${uuid}`, config)
      .then(res => {
        this.loadDatasets()
      })
      .catch(error => {
        console.log(error.response)
      })
  }
  loadDatasets = () => {
    const config = {
      headers: { Authorization: 'bearer ' + this.state.token },
    }
    Axios.get(
      `${DEFAULT_URL}api/current/dataset?limit=${this.state.limit}&page=${this.state.currentPage}`,
      config,
    )
      .then(res => {
        this.setState(() => ({
          datasets: res.data.datasets,
          totalPages: res.data.nbPages,
          itemsCount: res.data.itemsCount,
          currentPage: res.data.currentPage,
        }))
      })
      .catch(error => {
        console.log(error.response)
      })
  }
  componentDidMount() {
    this.loadDatasets()
  }
  render() {
    let paginations = []
    for (let i = 0; i < this.state.totalPages; i++) {
      paginations.push(
        <PaginationItem
          key={i}
          className={i + 1 === this.state.currentPage ? 'active' : ''}
        >
          <PaginationLink
            href="#pablo"
            onClick={e => {
              e.preventDefault()
              this.gotoTokenPage(i + 1)
            }}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }
    const groupBadgeStyles = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center',
    }
    return (
      <>
        {/* Page content */}
        <Container fluid style={{ marginLeft: '50px' }}>
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">My Datasets</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Privacy</th>
                  <th scope="col">Creation Date</th>
                  <th scope="col">Nb Pages</th>
                  <th scope="col">Is Survey</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {this.state.datasets.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <Link to={`/data/mydataset/${value.uuid}`}>
                          {value.name}
                        </Link>
                      </td>
                      <td>{value.description}</td>
                      <td>{value.privacy === 0 ? 'PRIVATE' : 'PUBLIC'}</td>
                      <td>{value.creationDate}</td>
                      <td>{value.parts.length}</td>
                      <td>{value.fileExcel ? 'NO' : 'YES'}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Download
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => {
                                e.preventDefault()
                                this.deleteDataset(value.uuid)
                              }}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
                >
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault()
                        this.gotoTokenPage(1)
                      }}
                    >
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {paginations}
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault()
                        this.gotoTokenPage(this.state.totalPages)
                      }}
                    >
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
                <Pagination
                  className="pagination mb-0"
                  style={{ marginTop: '-35px' }}
                >
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={() => this.toggleModal('defaultModal')}
                    >
                      <i className="ni ni-fat-add" />
                      <span className="sr-only">+</span>
                    </PaginationLink>
                    <ModalCreateDataset
                      defaultModal={this.state.defaultModal}
                      toggleModal={this.toggleModal}
                      history={this.props.history}
                    />
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </Card>
        </Container>
      </>
    )
  }
}

export default MyDataSets
