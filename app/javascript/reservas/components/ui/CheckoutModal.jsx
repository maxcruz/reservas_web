import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';

import PaymentReview from './PaymentReview';
import PaymentForm from './PaymentForm';
import PaymentConfirm from "./PaymentConfirm";

import modalStyle from "material-dashboard/assets/jss/material-dashboard-pro-react/modalStyle.jsx";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const steps = ['Revisión', 'Pago', 'Confirmar'];

const styles = () => ({
    buttons: {
        margin: '5px',
        textAlign: 'left',
    },
    buttonContained: {
        marginLeft: '10px',
    }
});

class CheckoutModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            activeStep: 0,
            code: null,
        };
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <PaymentReview
                                price={this.props.price}
                                slotInfo={this.props.slotInfo}
                                user={this.props.user}
                                onClose={this.handleBack}
                                onNext={this.handleNext}
                                />;
            case 1:
                return <PaymentForm
                                paymentToken={this.props.paymentToken}
                                />;
            case 2:
                return <PaymentConfirm
                                code={this.state.code}
                                />;
            default:
                throw new Error('Unknown step');
        }
    }

    performCheckout() {
        const {slotInfo, field_id, user} = this.props;
        const start = slotInfo.start;
        const end = slotInfo.end;
        this.props.checkout("name", "number", "expires", "verify", field_id, start, end, user.token)
            .then((code) => {
                this.setState(code);
            })
    }

    handleNext = () => {
        const {activeStep} = this.state;
        if (activeStep === 1) {
            this.performCheckout()
        }
        if (activeStep === steps.length) {
            this.setState({show: false});
            if (this.state.code){
                this.props.onClose(this.state.code, this.props.slotInfo);
            } else {
                this.props.onClose();
            }
            return;
        }
        this.setState({activeStep: activeStep + 1});
    };

    handleBack = () => {
        const {activeStep} = this.state;
        if (activeStep === 0) {
            this.setState({show: false});
            this.props.onClose();
            return;
        }
        this.setState({activeStep: activeStep - 1});
    };

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    classes={{
                        root: classes.center,
                        paper: classes.modal
                    }}
                    open={this.state.show}>
                    <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {this.getStepContent(activeStep)}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles, modalStyle)(CheckoutModal);
