import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import Axios from "axios";
import { DEFAULT_URL } from "../../../config";
import { Button } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MlResult from './MlResult';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class EditableTable extends React.Component {
    state = {
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear' },
        ],
        data: [],
        MlBoolean: false,
    };
    send_data = () => {
        const { data } = this.state;
        let array = []
        data.forEach((elem) => {
            if (array.length == 0) {
                array = [elem]
            } else if (array.length > 0) {
                array = [...array, elem]
            }
        })
        console.log("array ==> ", array)
        const config = {
            headers: { Authorization: "bearer " + this.state.token }
        };
        Axios.post(
            `${DEFAULT_URL}api/current/update_photo`,
            {
                modelname: 'model',
                selectedFeature: { array },
                selectedTarget: { "name": "I" }
            },
            config
        )
            .then(res => {
                this.setState({ MlBoolean: true })
            })
            .catch(error => {
                this.setState({ MlBoolean: true })
            });
    }
    render() {
        const { data, columns, MlBoolean } = this.state;
        return (
            <>
                {!MlBoolean ? (<Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MaterialTable
                            icons={tableIcons}
                            title="table"
                            columns={columns}
                            data={data}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const data = [...prevState.data];
                                                data.push(newData);
                                                return { ...prevState, data };
                                            });
                                        }, 600);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            if (oldData) {
                                                this.setState(prevState => {
                                                    const data = [...prevState.data];
                                                    data[data.indexOf(oldData)] = newData;
                                                    return { ...prevState, data };
                                                });
                                            }
                                        }, 600);
                                    }),
                                onRowDelete: oldData =>
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return { ...prevState, data };
                                            });
                                        }, 600);
                                    }),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            style={{ float: 'right', marginLeft: 30 }}
                            onClick={(e) => {
                                e.preventDefault()
                                this.send_data()
                            }
                            }
                        >
                            Predict
                    </Button>
                    </Grid>
                </Grid>) :
                    <>
                        <MlResult />
                    </>
                }
            </>
        )
    }
}

export default EditableTable