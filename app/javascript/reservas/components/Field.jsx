import styles from './Field.scss'
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

import BigCalendar from "react-big-calendar";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const stylesMain = theme => ({
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

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
  {
    title: "All Day Event",
    allDay: true,
    start: new Date(y, m, 1),
    end: new Date(y, m, 1),
    color: "default"
  },
  {
    title: "Meeting",
    start: new Date(y, m, d - 1, 10, 30),
    end: new Date(y, m, d - 1, 11, 30),
    allDay: false,
    color: "green"
  },
  {
    title: "Lunch",
    start: new Date(y, m, d + 7, 12, 0),
    end: new Date(y, m, d + 7, 14, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "Nud-pro Launch",
    start: new Date(y, m, d - 2),
    end: new Date(y, m, d - 2),
    allDay: true,
    color: "azure"
  },
  {
    title: "Birthday Party",
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false,
    color: "azure"
  },
  {
    title: "Click for Creative Tim",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "orange"
  },
  {
    title: "Click for Google",
    start: new Date(y, m, 21),
    end: new Date(y, m, 22),
    color: "rose"
  }
];

class Field extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: events,
      alert: null
    };
    this.hideAlert = this.hideAlert.bind(this);
  }
  selectedEvent(event) {
    alert(event.title);
  }
  addNewEventAlert(slotInfo) {
    this.setState({
      alert: (
        <SweetAlert
          input
          showCancel
          style={{ display: "block", marginTop: "-100px" }}
          title="Input something"
          onConfirm={e => this.addNewEvent(e, slotInfo)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          />
      )
    });
  }
  addNewEvent(e, slotInfo) {
    var newEvents = this.state.events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    this.setState({
      alert: null,
      events: newEvents
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  eventColors(event, start, end, isSelected) {
    var backgroundColor = "event-";
    event.color
    ? (backgroundColor = backgroundColor + event.color)
    : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  }

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default">
          <Toolbar >
            <IconButton
              className={classes.button}
              aria-label="Back"
              href="/">
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
          <BigCalendar
            selectable
            events={this.state.events}
            defaultView="month"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={event => this.selectedEvent(event)}
            onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
            eventPropGetter={this.eventColors}
            />
        </main>
      </React.Fragment>
    );
  }
}

Field.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesMain)(Field);
