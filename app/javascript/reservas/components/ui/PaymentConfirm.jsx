import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class PaymentConfirm extends React.Component {

    componentSuccess(code, isAdmin, classes) {
        return (
            <div className={classes.container}>
                <Typography variant="h5" gutterBottom>
                    {isAdmin ? 'Bloqueado' : 'Gracias por tu compra.'}
                </Typography>
                {this.confirmMessage(code, isAdmin)}
            </div>
        )
    }

    confirmMessage(code, isAdmin) {
        if (isAdmin) {
            return (
                <Typography variant="subheading">
                    El horario ha sido reservado por el administrador de la cancha.
                </Typography>
            )
        } else {
            return (
                <Typography variant="subheading">
                    Tu número de orden es <b>{code}</b>. Hemos enviado por correo electrónico la confirmación de su reserva, por favor presentela en el lugar.
                </Typography>
            )
        }
    }

    componentError(classes) {
        return (
            <div className={classes.container}>
                <Typography variant="subheading" align="center">
                    Algo salió mal. Por favor vuelva a intentarlo.
                </Typography>
            </div>
        )
    }

    evaluate(code, isAdmin, classes) {
        if (code) {
            return this.componentSuccess(code, isAdmin, classes)
        } else {
            return this.componentError(classes)
        }
    }

    render() {
        const {classes, code, isAdmin, onBack, onNext} = this.props;
        return(
            <React.Fragment>
                {this.evaluate(code, isAdmin, classes)}
                <DialogActions>
                    {!code ? (
                        <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={onBack}>
                            Regresar
                        </Button>) : null}
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={onNext}>
                        Cerrar
                    </Button>
                </DialogActions>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(PaymentConfirm)
