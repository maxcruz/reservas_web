import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import moment from 'moment';

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing.unit * 2,
    },
});

const getDateDescription = ({start, end}) => {
    return moment(start).format('DD-MM-YYYY')
        + ' ' + moment(start).format('h:mm:ss A')
        + ' - ' + moment(end).format('h:mm:ss A');
};

class PaymentReview extends React.Component {

    render() {
        const {classes, slotInfo, price, user} = this.props;
        const duration = Math.abs(slotInfo.end - slotInfo.start);
        const hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        const totalPrice = '$' + (hours * price).toLocaleString();
        const product = {
            name: 'Reserva de cancha',
            price: totalPrice
        };
        const addresses = [user.email];
        return(
            <React.Fragment>
                <Typography variant="title" gutterBottom>Resumen</Typography>
                <List disablePadding>
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={getDateDescription(slotInfo)}/>
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                </List>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="title" gutterBottom className={classes.title}>
                            Contacto
                        </Typography>
                        <Typography gutterBottom>{addresses.join(', ')}</Typography>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={this.props.onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={this.props.onNext}
                        className={classes.buttonContained}>
                        Siguiente
                    </Button>
                </DialogActions>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(PaymentReview);
