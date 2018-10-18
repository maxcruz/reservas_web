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

import CheckoutModal from '../CheckoutModal';
import {Redirect} from "react-router-dom";

const localized = BigCalendar.momentLocalizer(moment);

const stylesMain = () => ({
    cardTitle: {
        color: 'grey',
        textAlign: 'center',
    },
    stats: {
        color: 'grey',
        fontSize: '14pt',
    },
    chip: {
        marginLeft: '3px',
        marginRight: '3px',
    }
});

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();

const events = [
    {
        title: "RESERVED",
        start: new Date(y, m, 1, 16, 0, 0),
        end: new Date(y, m, 1, 17, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 5, 15, 0, 0),
        end: new Date(y, m, 5, 16, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 17, 9, 0, 0),
        end: new Date(y, m, 17, 10, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 20, 11, 0, 0),
        end: new Date(y, m, 20, 12, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 28, 14, 0, 0),
        end: new Date(y, m, 28, 15, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 4, 16, 0, 0),
        end: new Date(y, m, 4, 17, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 11, 18, 0, 0),
        end: new Date(y, m, 11, 19, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 15, 21, 0, 0),
        end: new Date(y, m, 15, 22, 0, 0),
    },
    {
        title: "RESERVED",
        start: new Date(y, m, 8, 16, 0, 0),
        end: new Date(y, m, 8, 17, 0, 0),
    },
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

    componentDidMount() {
        this.props.fetchPromos(this.props.field.id);
    }

    static selectedEvent(event) {
        alert(event.title);
    }

    openCheckoutModal(slotInfo) {
        if (slotInfo.start === slotInfo.end && this.state.view !== 'day') {
            this.setState({
                view: 'day',
                selectedDate: slotInfo.start,
            });
            return;
        }
        this.setState({
            checkout: true,
            selectedSlot: slotInfo
        });
    }

    addNewEvent(title, slotInfo) {
        const newEvents = this.state.events;
        newEvents.push({
            title: title,
            start: slotInfo.start,
            end: slotInfo.end,
            isMine: true
        });
        this.setState({events: newEvents});
    }

    getPromos() {
        return (this.props.field.promos) ?
            this.props.field.promos.map(promo => {
                return {
                    title: 'PRECIO: ' + promo.price.toLocaleString(),
                    start: new Date(promo.start),
                    end: new Date(promo.end),
                    isPromo: true
                };
            }) : [];
    }

    static eventColors(event) {
        let newStyle = {
            backgroundColor: "lightgrey",
            color: 'black',
            borderRadius: "0px",
            border: "none"
        };
        if (event.isPromo) {
            newStyle.backgroundColor = "pink"
        }
        if (event.isMine) {
            newStyle.backgroundColor = "blue"
        }
        return {className: "", style: newStyle};
    }

    render() {
        const {classes, field} = this.props;
        const events = this.getPromos();
        if (!field.id) {
            return <Redirect to='/'/>
        }
        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton
                            className={classes.button}
                            aria-label="Back"
                            href="/">
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
                                    <h2 className={classes.cardTitle}>${field.price.toLocaleString()}</h2>
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
                                    <h2 className={classes.cardTitle}>{field.roof ? 'Si' : 'No'}</h2>
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
                                    <h2 className={classes.cardTitle}>{field.size}</h2>
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
                                        localizer={localized}
                                        events={events}
                                        style={{height: '80vh'}}
                                        defaultView="month"
                                        date={this.state.selectedDate}
                                        timeslots={1}
                                        step={60}
                                        min={new Date(2017, 10, 0, 9, 0, 0)}
                                        max={new Date(2017, 10, 0, 22, 0, 0)}
                                        onView={view => {
                                            this.setState({
                                                view: view
                                            });
                                        }}
                                        views={['month', 'week', 'day', 'agenda']}
                                        view={this.state.view}
                                        onNavigate={(day) => {
                                            this.setState({
                                                selectedDate: day
                                            });
                                        }}
                                        onSelectEvent={event => Field.selectedEvent(event)}
                                        onSelectSlot={slotInfo => this.openCheckoutModal(slotInfo)}
                                        eventPropGetter={Field.eventColors}
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