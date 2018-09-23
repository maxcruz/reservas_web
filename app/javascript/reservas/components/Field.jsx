import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  mainTitle: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainTitleContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
});

class Field extends React.Component {

    render() {

        const { classes } = this.props;

        return (
          <React.Fragment>
            <CssBaseline />
              <AppBar position="static" color="default">
                <Toolbar >
                  <IconButton className={classes.button} aria-label="Back" href="/">
                    <BackIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit">
                    Reservar
                  </Typography>
                </Toolbar>
              </AppBar>
              <main>
                <Paper className={classes.mainTitle}>
                      <div className={classes.mainTitleContent}>
                        <Typography
                          variant="display1"
                          color="inherit"
                          gutterBottom>
                          Cancha #4
                        </Typography>
                        <Typography variant="subheading" color="inherit">
                          Techada: Si
                        </Typography>
                        <Typography variant="subheading" color="inherit">
                           Tamaño: 11
                        </Typography>
                      </div>

                </Paper>
              </main>
          </React.Fragment>
        );
    }
}

Field.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Field);
