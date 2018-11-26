// noinspection ES6UnusedImports
import styles from './Field.scss'
import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import Typography from '@material-ui/core/Typography';
import BigCalendar from "react-big-calendar";
import moment from "moment";
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
import Chip from '@material-ui/core/Chip';
import grey from '@material-ui/core/colors/grey';

import CheckoutModal from './CheckoutModal';
import {Redirect} from "react-router-dom";

const localized = BigCalendar.momentLocalizer(moment);

const calendar_messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  showMore: total => `+ Más (${total})`
};

const stylesMain = () => ({
    stats: {
        color: 'grey',
        fontSize: '14pt',
    },
    chip: {
        marginLeft: '3px',
        marginRight: '3px',
    }
});

class Field extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            checkout: false,
            view: 'month',
            selectedDate: new Date(),
            selectedSlot: null,
            selectedPrice: null,
            paymentToken: null,
            isAdmin: false,
            toHome: false,
            toLogin: false,
        };
    }

    componentWillMount() {
        const {field, user} = this.props;
        if (!field.id) {
            this.setState({toHome: true});
            return;
        }
        this.props.fetchPromos(field.id, user.token)
            .then(() => {
                const fetchedPromos = this.props.field.promos ? this.props.field.promos : []
                const newEvents = [...this.state.events, ...fetchedPromos.map(this.convertDate)];
                this.setState({
                    events: newEvents
                })
            });
        this.props.fetchEvents(field.id, user.token)
            .then(() => {
                const fetchedEvents = this.props.field.events ? this.props.field.events : []
                const newEvents = [...this.state.events, ...fetchedEvents.map(this.convertDate)];
                this.setState({
                    events: newEvents
                })
            });
    }

    static selectedEvent(event) {
        alert(event.title);
    }

    openCheckoutModal(slotInfo, price) {
        if (slotInfo.start === slotInfo.end && this.state.view !== 'day') {
            this.setState({
                view: 'day',
                selectedDate: slotInfo.start,
            });
            return;
        }
        const {email, token} = this.props.user
        if (email && token) {
            const {events} = this.state
            const hourEvents = events.filter(event => event.start <= slotInfo.start && event.end >= slotInfo.end)
            const clashEvents = hourEvents.filter(event => !event.isPromo)
            if (clashEvents[0]) {
                alert(clashEvents[0].title);
                return;
            }
            const promo = hourEvents.filter(event => event.isPromo)
            const finalPrice = (promo[0]) ? promo[0].price : price
            this.props.paymentToken(token)
                .then((transaction) => {
                    this.setState({
                        checkout: true,
                        selectedSlot: slotInfo,
                        selectedPrice: finalPrice,
                        paymentToken: transaction.token,
                        isAdmin: transaction.is_admin
                    });
                });
        } else {
            this.setState({toLogin: true});
        }
    }

    addNewEvent(title, slotInfo) {
        const newEvent = {
            title: title,
            start: slotInfo.start,
            end: slotInfo.end,
            isMine: true
        };
        this.setState({events: [...this.state.events, newEvent]});
    }

    convertDate = (event) => {
        const newEvent = event;
        newEvent.start = new Date(event.start);
        newEvent.end = new Date(event.end);
        return newEvent;
    };

    static eventStyle(event) {
        let newStyle = {
            backgroundColor: "#B0BEC5BF",
            color: 'black',
            borderRadius: "5px",
            width: "60%",
            padding: "5px",
            margin: "1px",
            border: "none"
        };
        if (event.isPromo) {
            newStyle.backgroundColor = "#E3325A40"
        }
        if (event.isMine) {
            newStyle.backgroundColor = "#4054AFBF"
        }
        return {className: "", style: newStyle};
    }

    render() {
        const {classes, field, user} = this.props;
        const {events, toHome, toLogin} = this.state;
        if (toHome) {
            return <Redirect to='/'/>
        }
        // TODO: Fix warning regarding the calendar when navigate to login
        if(toLogin) {
            return <Redirect to='/login'/>
        }
        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton
                            className={classes.button}
                            aria-label="Back"
                            onClick={() => {
                                this.setState({toHome: true})
                            }}>
                            <BackIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            Cancha #{field.number}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <br/>
                    <GridContainer spacing={16} justify="center">
                        <GridItem lg={3}>
                            <Card>
                                <CardHeader color="warning" stats icon>
                                    <CardIcon color="warning">
                                        <MoneyIcon/>
                                    </CardIcon>
                                    <br />
                                    <Typography
                                        variant={"h5"}
                                        color={"textSecondary"}
                                        align={"center"}>
                                        ${field.price.toLocaleString()}
                                        </Typography>
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
                                        <StoreIcon/>
                                    </CardIcon>
                                    <br />
                                    <Typography
                                        variant={"h5"}
                                        color={"textSecondary"}
                                        align={"center"}>
                                        {field.roof ? ' Si ' : ' No '}
                                        </Typography>
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
                                        <PlayerIcon/>
                                    </CardIcon>
                                    <br />
                                    <Typography
                                        variant={"h5"}
                                        color={"textSecondary"}
                                        align={"center"}>
                                        {field.size}
                                        </Typography>
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
                        <Chip
                            label="Mis reservas"
                            color="primary"
                            className={classes.chip}
                        />
                        <Chip
                            label="Reservas de otros"
                            color="default"
                            className={classes.chip}/>
                        <Chip
                            label="Promoción"
                            color="secondary"
                            className={classes.chip}/>
                    </GridContainer>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={10}>
                            <Card>
                                <CardBody calendar>
                                    <BigCalendar
                                        selectable
                                        culture='es-ES'
                                        localizer={localized}
                                        messages={calendar_messages}
                                        events={events}
                                        style={{height: '80vh'}}
                                        defaultView='week'
                                        date={this.state.selectedDate} 
                                        timeslots={1}
                                        step={60}
                                        min={new Date(2017, 10, 0, 9, 0, 0)}
                                        max={new Date(2017, 10, 0, 22, 0, 0)}
                                        onView={view => {
                                            this.setState({view: view});
                                        }}
                                        views={['month', 'week', 'day', 'agenda']}
                                        view={this.state.view}
                                        onNavigate={(day) => {
                                            this.setState({selectedDate: day});
                                        }}
                                        onSelectEvent={event => Field.selectedEvent(event)}
                                        onSelectSlot={slotInfo => this.openCheckoutModal(slotInfo, field.price)}
                                        eventPropGetter={Field.eventStyle}
                                    />
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </main>
                {this.state.checkout ?
                    <CheckoutModal
                        show={true}
                        onClose={(title, slotInfo) => {
                            if (title !== undefined && slotInfo !== undefined) {
                                this.addNewEvent(title, slotInfo);
                            }
                            this.setState({checkout: false});
                        }}
                        slotInfo={this.state.selectedSlot}
                        price={this.state.selectedPrice}
                        paymentToken={this.state.paymentToken}
                        isAdmin={this.state.isAdmin}
                        field_id={this.props.field.id}
                        user={user}
                        checkout={this.props.checkout}
                    /> : null}
            </React.Fragment>
        );
    }
}

Field.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(stylesMain)(Field);
