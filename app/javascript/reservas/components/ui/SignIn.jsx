import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Redirect} from "react-router-dom";

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {},
            toHome: props.session
        };
        this.updateFormState = this.updateFormState.bind(this)
    }

    updateFormState(event) {
        const field = event.target.name;
        let form = this.state.form;
        form[field] = event.target.value;
        return this.setState({form: form});
    }

    tryLogin() {
        const {email, password} = this.state.form;
        if (email && password) {
            this.props.login(email, password)
                .then(success => {
                    if (success === true) {
                        this.setState({toHome: true})
                    }
                })
                .catch(() => {
                    alert("Usuario o contraseña incorrectos.")
                })
        } else {
            alert("Ingrese su usuario y contraseña por favor.")
        }
    }

    render() {
        const { classes } = this.props;
        if (this.state.toHome === true) {
            return <Redirect to='/'/>
        }
        return(
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">
                            Ingresar
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">
                                    Correo
                                </InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.updateFormState}
                                    autoComplete="email"
                                    autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.updateFormState}
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.tryLogin()
                                }}
                                className={classes.submit}
                            >
                                Ingresar
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    this.setState({toHome: true})
                                }}
                                className={classes.submit}
                            >
                                Cancelar
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
