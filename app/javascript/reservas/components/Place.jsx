import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import StreetViewIcon from '@material-ui/icons/Streetview';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import CarIcon from '@material-ui/icons/LocalParking';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  title: {
    flexGrow: 1,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 800,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    textAlign:'center',
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class Place extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <StreetViewIcon className={classes.icon} />
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}>
              Reservas App
            </Typography>
            <Button
              variant="flat"
              color="inherit"
              href="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                variant="display3"
                align="center"
                color="textPrimary"
                gutterBottom>
                Nombre Lugar
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textSecondary"
                paragraph>
                Una pequeña descripción del lugar junto con la dirección.
              </Typography>
              <div>
                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="123-456-7890"
                        secondary="Phone"
                        />
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="foo@foo.com"
                        secondary="Email"
                        />
                    </ListItem>
                  </Grid>
                  <Grid item xs={4}>
                    <ListItem>
                      <ListItemIcon>
                        <CarIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Si"
                        secondary="Parqueo"
                        />
                    </ListItem>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.heroButtons}>
                <Button variant="outlined" color="primary">
                  Editar
                </Button>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>

            <Grid container spacing={40}>
              {cards.map(card => (
                <Grid item key={card} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                      // eslint-disable-line max-len
                      title="Image title"
                      />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2">
                        Cancha X
                      </Typography>
                      <Typography>
                        Tamaño: X
                      </Typography>
                      <Typography>
                        Techada: X
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        href="/field">
                        Reservar
                      </Button>
                      <Button size="small" color="primary">
                        Editar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>

        <footer className={classes.footer}>
          <Typography
            variant="title"
            align="center"
            gutterBottom>
            © 2018
          </Typography>
          <Typography
            variant="subheading"
            align="center"
            color="textSecondary"
            component="p">
            Sistema de reserva de espacios deportivos.
          </Typography>
        </footer>

      </React.Fragment>
    );
  }
}

Place.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Place);
