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

    render() {
        const {classes, code, onBack, onNext} = this.props;
        return(
            <React.Fragment>
                {code ? (
                    <div className={classes.container}>
                        <Typography variant="h5" gutterBottom>
                            Gracias por tu compra.
                        </Typography>
                        <Typography variant="subheading">
                            Tu número de orden es <b>{code}</b>. Hemos enviado por correo electrónico la
                            confirmación de su reserva, por favor presentela en el lugar.
                        </Typography>
                    </div>
                ) : (
                    <div className={classes.container}>
                        <Typography variant="subheading" align="center">
                            Algo salió mal. Por favor vuelva a intentarlo.
                        </Typography>
                    </div>
                )}
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
