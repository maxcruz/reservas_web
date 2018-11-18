import React from 'react';
import BraintreeDropin from "braintree-dropin-react";
import braintree from 'braintree-web-drop-in'
import Grid from '@material-ui/core/Grid';

class PaymentForm extends React.Component {

    handlePaymentMethod = (payload) => {
        console.log('payload', payload)
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <BraintreeDropin
                    braintree={braintree}
                    options={{
                        locale: 'es_ES'
                    }}
                    authorizationToken={this.props.paymentToken}
                    handlePaymentMethod={this.handlePaymentMethod}

    				/>

            </Grid>
        )
    }
}

export default PaymentForm
