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
import BigCalendar from "react-big-calendar";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import CardContent from '@material-ui/core/CardContent';
import GridContainer from "material-dashboard/components/Grid/GridContainer.jsx";
import GridItem from "material-dashboard/components/Grid/GridItem.jsx";
import Card from "material-dashboard/components/Card/Card.jsx";
import CardHeader from "material-dashboard/components/Card/CardHeader.jsx";
import CardIcon from "material-dashboard/components/Card/CardIcon.jsx";
import CardBody from "material-dashboard/components/Card/CardBody.jsx";
import CardFooter from "material-dashboard/components/Card/CardFooter.jsx";
import MoneyIcon from '@material-ui/icons/AttachMoney';
import PlayerIcon from '@material-ui/icons/DirectionsRun'
import StoreIcon from "@material-ui/icons/Store";

import CheckoutModal from './CheckoutModal';

const localizer = BigCalendar.momentLocalizer(moment);

const stylesMain = theme => ({
  cardTitle: {
    color: 'grey',
    textAlign: 'center',
  },
  stats: {
    color: 'grey',
    fontSize: '14pt',
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
      checkout: false,
      view: 'month',
      selectedSlot: null,
      selectedDate: new Date()
    };
  }

  selectedEvent(event) {
    alert(event.title);
  }

  openCheckoutModal(slotInfo) {
    if (slotInfo.start == slotInfo.end && this.state.view != 'day') {
      this.setState({
        view:'day',
        selectedDate: slotInfo.start,
      });
      return;
    }
    this.setState({
      checkout: true,
      selectedSlot: slotInfo
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
              Cancha #4
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <br />
          <GridContainer spacing={16} justify="center">
            <GridItem lg={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <MoneyIcon />
                  </CardIcon>
                  <h2 className={classes.cardTitle}>$120,000</h2>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    Precio
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem lg={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <StoreIcon />
                  </CardIcon>
                  <h2 className={classes.cardTitle}>Si</h2>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    Techada
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem lg={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <PlayerIcon />
                  </CardIcon>
                  <h2 className={classes.cardTitle}>11</h2>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    Jugadores
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <Card>
                <CardBody calendar>
                  <BigCalendar
                    selectable
                    localizer={localizer}
                    events={this.state.events}
                    style={{ height: '80vh' }}
                    defaultView="month"
                    date={this.state.selectedDate}
                    timeslots={1}
                    step={60}
                    onView={view => {
                      this.setState({
                        view: view
                      });
                    }}
                    views={['month', 'week', 'day']}
                    view={this.state.view}
                    onNavigate={(day) => {
                      this.setState({
                        selectedDate: day
                      });
                    }}
                    onSelectEvent={event => this.selectedEvent(event)}
                    onSelectSlot={slotInfo => this.openCheckoutModal(slotInfo)}
                    eventPropGetter={this.eventColors}
                    />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </main>
        { this.state.checkout ?
          <CheckoutModal
            show={true}
            onClose={() => { this.setState({ checkout: false }) }}
            slotInfo={this.state.selectedSlot}
            />
          :
          null
        }
      </React.Fragment>
    );
  }
}

Field.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(stylesMain)(Field);
