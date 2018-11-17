import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import PaymentForm from './PaymentForm';
import PaymentReview from './PaymentReview';

import modalStyle from "material-dashboard/assets/jss/material-dashboard-pro-react/modalStyle.jsx";
import PaymentConfirm from "./PaymentConfirm";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const steps = ['Pago', 'Confirmar'];

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
            card: {}
        };
        this.cardChanged = this.cardChanged.bind(this)
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <PaymentForm id="card"
                                    card={this.state.card}
                                    onChange={this.cardChanged}/>;
            case 1:
                return <PaymentReview card={this.state.card}
                                      price={this.props.price}
                                      slotInfo={this.props.slotInfo}
                                      user={this.props.user}/>;
            case 2:
                return (<PaymentConfirm code={this.state.code} />);
            default:
                throw new Error('Unknown step');
        }
    }

    performCheckout() {
        const {card} = this.state;
        const {slotInfo, field_id, user} = this.props;
        const {name, number, expires, verify} = card;
        const start = slotInfo.start;
        const end = slotInfo.end;
        this.props.checkout(name, number, expires, verify, field_id, start, end, user.token)
            .then((code) => {
                this.setState(code);
            })
    }

    // TODO: Async loader indicator when pay
    handleNext = () => {
        const {activeStep, card} = this.state;
        if (activeStep === 0) {
            let hasError;
            const {name, number, expires, verify} = card;
            hasError = (name === undefined || name === "");
            hasError = hasError || (number === undefined || number === "");
            hasError = hasError || (expires === undefined || expires === "");
            hasError = hasError || (verify === undefined || verify === "");
            if (hasError) return;
        }
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

    cardChanged(value) {
        this.setState({card: value})
    }

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
                    <DialogActions
                        className={classes.modalFooter + " " + classes.modalFooterCenter}>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={this.handleNext}>
                                        Cerrar
                                    </Button>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        onClick={this.handleBack}>
                                        {activeStep === 0 ? 'Cancelar' : 'Atrás'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.buttonContained}>
                                        {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles, modalStyle)(CheckoutModal);
