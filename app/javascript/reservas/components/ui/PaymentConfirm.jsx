import React from 'react'
import Typography from "@material-ui/core/Typography/Typography";

class PaymentConfirm extends React.Component {

    render() {
        if (!this.props.code) {
            return (
                <Typography variant="subheading" align="center">
                    Algo salió mal :-(
                </Typography>
            )
        }
        return(
            <React.Fragment>
                <Typography variant="h5" gutterBottom>
                    Gracias por tu compra.
                </Typography>
                <Typography variant="subheading">
                    Tu número de orden es <b>{this.props.code}</b>. Hemos enviado por correo electrónico la
                    confirmación de su reserva, por favor presentela en el lugar.
                </Typography>
            </React.Fragment>
        )
    }
}

export default PaymentConfirm
