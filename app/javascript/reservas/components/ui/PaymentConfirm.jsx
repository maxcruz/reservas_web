import React from 'react'
import Typography from "@material-ui/core/Typography/Typography";

class PaymentConfirm extends React.Component {

    render() {
        return(
            <React.Fragment>
                <Typography variant="headline" gutterBottom>
                    Gracias por tu compra.
                </Typography>
                <Typography variant="subheading">
                    Tu número de orden es <b>{this.state.code}</b>. Hemos enviado por correo electrónico la
                    confirmación de su reserva, por favor presentela en el lugar.
                </Typography>
            </React.Fragment>
        )
    }
}

export default PaymentConfirm