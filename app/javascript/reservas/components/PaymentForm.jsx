import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const PaymentForm = () => (
    <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
            <TextField required id="cardName" label="Nombre en la tarjeta" fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required id="cardNumber" label="Número de tarjeta" fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required id="expDate" label="Expiración" fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Últimos tres dígitos al reverso"
                fullWidth
            />
        </Grid>
    </Grid>
);

export default PaymentForm