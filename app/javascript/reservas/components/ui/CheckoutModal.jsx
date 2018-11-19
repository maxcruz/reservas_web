import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PaymentReview from './PaymentReview';
import PaymentForm from './PaymentForm';
import PaymentConfirm from "./PaymentConfirm";

import modalStyle from "material-dashboard/assets/jss/material-dashboard-pro-react/modalStyle.jsx";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

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
        this.steps = (this.props.isAdmin) ? ['Revisión', 'Confirmar']
                                          : ['Revisión', 'Pago', 'Confirmar'];

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
                                onBack={this.handleBack}
                                onNext={(nonce) => {
                                    this.handleNext(nonce)
                                }}
                                />;
            case 2:
                return <PaymentConfirm
                                isAdmin={this.props.isAdmin}
                                code={this.state.code}
                                onBack={this.handleBack}
                                onNext={this.handleNext}
                                />;
            default:
                throw new Error('Unknown step');
        }
    }

    performCheckout(nonce, nextStep) {
        const {slotInfo, field_id, user} = this.props;
        const start = slotInfo.start;
        const end = slotInfo.end;
        this.props.checkout(nonce, field_id, start, end, user.token)
            .then((code) => {
                this.setState({
                    code: code.code,
                    activeStep: nextStep
                });
            })
            .catch(() => {
                this.setState({
                    activeStep: nextStep
                });
            })
    }

    handleNext = (nonce) => {
        const {activeStep} = this.state;
        if (this.props.isAdmin) {
            if (activeStep === 0) {
                this.performCheckout("", activeStep + 2)
            } else {
                this.props.onClose(this.state.code, this.props.slotInfo);
            }
            return;
        }
        if (activeStep === 1 && nonce) {
            this.performCheckout(nonce, activeStep + 1)
            return;
        }
        if (activeStep === (this.steps.length - 1)) {
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
        if (this.props.isAdmin && activeStep === 2) {
            this.setState({activeStep: 0});
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
                            {this.steps.map(label => (
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
