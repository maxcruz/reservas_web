import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class PaymentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card: {}
        };
        this.updateFormState = this.updateFormState.bind(this)
    }

    updateFormState(event) {
        const field = event.target.name;
        let card = this.state.card;
        card[field] = event.target.value;
        this.props.onChange(card);
        return this.setState({card: card});
    }

    render() {
        return(
            <Grid container spacing={24}>
                <Grid item xs={12} md={6}>
                    <TextField required
                        name="name"
                        label="Nombre en la tarjeta"
                        value={this.state.name}
                        onChange={this.updateFormState}
                        fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required
                        name="number"
                        label="Número de tarjeta"
                        value={this.state.number}
                        onChange={this.updateFormState}
                        fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required
                        name="expiration"
                        label="Expiración"
                        value={this.state.expiration}
                        onChange={this.updateFormState}
                        helperText="MM/YY"
                        fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required
                        name="cvv"
                        label="CVV"
                        value={this.state.cvv}
                        onChange={this.updateFormState}
                        helperText="Últimos tres dígitos al reverso"
                        fullWidth/>
                </Grid>
            </Grid>
        )
    }
}

export default PaymentForm