import React, { Component } from 'react';
import {
    Container,
    Modal,
    Button,
} from "reactstrap"
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';

class DeleteModal extends Component {

    render() {
        const {
            boolean,
            toggle
        } = this.props
        console.log("toggle ==> ", boolean)
        return (
            <Container>
                <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={boolean}
                >
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-notification">Your attention is required</h6>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => toggle(2)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className="ni ni-bell-55 ni-3x" />
                            <h4 className="heading mt-4"> Are you sure you want to permanently delete this model ?</h4>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="btn-white"
                            color="default"
                            type="button"
                        // onClick={() => this.deleteToken(this.state.toDelete)}
                        >
                            Yes
                        </Button>
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() =>
                                toggle(2)
                            }
                        >
                            Close
                        </Button>
                    </div>
                </Modal>
            </Container>
        )
    }
}

DeleteModal.propTypes = {

};

export default DeleteModal;
