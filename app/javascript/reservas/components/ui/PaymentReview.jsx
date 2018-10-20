import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

const product = {
    name: 'Reserva Cancha 4',
    price: '$120.000'
};
const addresses = ['max.raul@gmail.com'];
const payments = [
    {name: 'Tipo', detail: 'Visa'},
    {name: 'Nombre', detail: 'Max Cruz'},
    {name: 'Número', detail: 'xxxx-xxxx-xxxx-1234'},
    {name: 'Expiración', detail: '04/2024'},
];

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
        const {classes, slotInfo} = this.props;
        return(
            <React.Fragment>
                <Typography variant="title" gutterBottom>Resumen</Typography>
                <List disablePadding>
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={getDateDescription(slotInfo)}/>
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Total"/>
                        <Typography variant="subheading" className={classes.total}>
                            $120.000
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="title" gutterBottom className={classes.title}>
                            Usuario
                        </Typography>
                        <Typography gutterBottom>Max Cruz</Typography>
                        <Typography gutterBottom>{addresses.join(', ')}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6}>
                        <Typography variant="title" gutterBottom className={classes.title}>
                            Pago
                        </Typography>
                        <Grid container>
                            {payments.map(payment => (
                                <React.Fragment key={payment.name}>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.detail}</Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

PaymentReview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentReview);