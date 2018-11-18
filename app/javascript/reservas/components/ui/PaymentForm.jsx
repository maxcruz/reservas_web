import React from 'react';
import BraintreeDropin from "braintree-dropin-react";
import braintree from 'braintree-web-drop-in'
import Grid from '@material-ui/core/Grid';
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';

class PaymentForm extends React.Component {

    handlePaymentMethod = (payload) => {
        console.log('payload', payload)
    }

    renderSubmitButton = ({onClick, isDisabled, text}) => {
      return (
          <DialogActions>
              <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={this.props.onClose}>
                  Regresar
              </Button>
              <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={onClick}
                  disabled={isDisabled}>
                  {text}
              </Button>
          </DialogActions>
      )
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <BraintreeDropin
                    braintree={braintree}
                    options={{
                        locale: 'es_ES'
                    }}
                    authorizationToken={this.props.paymentToken}
                    handlePaymentMethod={this.handlePaymentMethod}
                    renderSubmitButton={this.renderSubmitButton}
    				/>
            </React.Fragment>
        )
    }
}

export default PaymentForm
