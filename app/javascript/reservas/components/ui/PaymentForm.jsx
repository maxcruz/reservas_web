import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={[/\d/, /\d/, '/', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask/>
    );
}

class PaymentForm extends React.Component {

    constructor(props) {
        super(props);
        const card = (this.props.card) ? this.props.card : {};
        this.state = {
            card: card
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
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
            <Grid container spacing={24}>
                <Grid item xs={12} md={6}>
                    <TextField required
                               name="name"
                               label="Nombre en la tarjeta"
                               defaultValue={this.state.card.name}
                               onChange={this.updateFormState}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required
                               name="number"
                               label="Número de tarjeta"
                               defaultValue={this.state.card.number}
                               onChange={this.updateFormState}
                               type="number"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required
                               name="expires"
                               label="Expiración"
                               defaultValue={this.state.card.expires}
                               onChange={this.updateFormState}
                               helperText="MM/YY"
                               InputProps={{
                                   inputComponent: TextMaskCustom,
                               }}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               fullWidth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required
                               name="verify"
                               label="CVV"
                               defaultValue={this.state.card.verify}
                               onChange={this.updateFormState}
                               helperText="Últimos tres dígitos al reverso"
                               type="number"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               fullWidth/>
                </Grid>
            </Grid>
            </FormControl>
        )
    }
}

export default withStyles(styles)(PaymentForm)