import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Typography from '@material-ui/core/Typography';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import PaymentForm from './PaymentForm';
import PaymentReview from './PaymentReview';

import modalStyle from "material-dashboard/assets/jss/material-dashboard-pro-react/modalStyle.jsx";

const styles = theme => ({
  buttons: {
    margin: '5px',
    textAlign: 'left',
  },
  buttonContained: {
    marginLeft: '10px',
  }
});

const steps = ['Pago', 'Confirmar'];

class CheckoutModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      activeStep: 0
    };
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <PaymentForm />;
      case 1:
        return <PaymentReview slotInfo={this.props.slotInfo} />;
      case 2:
        return (
          <React.Fragment>
            <Typography variant="headline" gutterBottom>
              Gracias por tu compra.
            </Typography>
            <Typography variant="subheading">
              Tu número de orden es <b>#2001539</b>. Hemos enviado por correo electrónico la
              confirmación de su reserva, por favor presentela en el lugar.
            </Typography>
          </React.Fragment>
        );

      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = () => {
    const { activeStep } = this.state;
    if (activeStep == steps.length) {
      this.setState({ show: false });
      this.props.onClose();
      return;
    }
    this.setState({ activeStep: activeStep + 1 });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    if (activeStep == 0) {
      this.setState({ show: false });
      this.props.onClose();
      return;
    }
    this.setState({ activeStep: activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  render(){

    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <div>
        <Dialog
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
            className={classes.modalFooter + " " +classes.modalFooterCenter}>
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
