import {Body, Card, CardItem, Button, Icon} from "native-base";
import React, {useState} from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { Communication } from "./service";

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface DateProps {
    startDate: number;
    endDate?: number;
}

interface State {
    communication: Communication;
    hasRSVP: boolean;
}

export default class EventDetails extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            communication: props.navigation.getParam("event"),
            hasRSVP: false,
        };
    }

    public render() {
        const {communication, hasRSVP} = this.state;
        const createdDate = formatUnixTimestamp(communication.created_date);

        let startDate: string;
        let endDate: string;
        const isEvent = communication.event != null;
        if (isEvent) {
            startDate = formatUnixTimestamp(communication.event.start_date);
            endDate = formatUnixTimestamp(communication.event.end_date);
        }

        return (
            <View style={styles.container}>
                <Card style={styles.card}>
                    <CardItem style={styles.cardItem}>
                        <Body>
                            <Text style={styles.subjectText}>
                                {communication.subject}
                            </Text>
                        </Body>
                    </CardItem>
                    <View style={styles.row}>
                        <Text style={styles.posted}>posted at: </Text>
                        <Text style={styles.dateText}>{createdDate}</Text>
                    </View>
                    <Text style={styles.eventDetails}>Event Details :</Text>
                    <Text style={styles.messageBody}>{communication.body}</Text>
                {isEvent && 
                <View style={[styles.row, styles.dateTimeContainer]}>
                    <DateComponent startDate={communication.event.start_date}/>
                    <TimeComponent startDate={communication.event.start_date} endDate={communication.event.end_date}/>
                    <RSVPComponent onRSVPPressed={() => this.onRSVPPressed()}/>
                </View>
                }
                {this.state.hasRSVP && <Text style={styles.successRSVP}>You are going to this event.</Text>}
                </Card>
            </View>
        );
    }

    private onRSVPPressed = () => {
        this.setState({
            hasRSVP: !this.state.hasRSVP,
        }, () => {
            const {hasRSVP} = this.state;
            Alert.alert("Your RSVP status has changed",  hasRSVP ? "You have been added to the list" : "You have been removed from the list");
        });
    }
}

const formatUnixTimestamp = (ts: number): string => {
    return `${getPrettyDate(ts)} ${getPrettyTime(ts)}`;
};

const getPrettyDate = (ts: number): string => {
    const d = new Date(ts * 1000);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${month}-${day}-${year}`;
};

const getPrettyTime = (ts: number): string => {
    const d = new Date(ts * 1000);
    const hour = d.getHours();
    const minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes();
    const ampm = hour < 12 ? "AM" : "PM";
    return `${hour % 12}:${minute} ${ampm}`;
};

const getDateIconName = (ts: number, letterIndex: number) => {
    const dateArray = getPrettyDate(ts).split("-");
    const date = dateArray[1];
    return `numeric-${date.charAt(letterIndex)}`;
};

const getMonthName = (ts:number) => {
    const timestampArray = getPrettyDate(ts).split("-");
    const date = timestampArray[0];
    return months[parseInt(date)-1];
};

const DateComponent = (props: DateProps) => {
    const {startDate} = props;
    return (
        <View style={styles.dateContainer}>
            <Icon
                style={[styles.icon, {fontSize: 40}]}
                name="calendar"
                type="MaterialCommunityIcons"
            />
            <Button primary badge>
                <Icon
                    style={styles.icon}
                    name={getDateIconName(startDate, 0)}
                    type="MaterialCommunityIcons"
                />
                <Icon
                    style={styles.icon}
                    name={getDateIconName(startDate, 1)}
                    type="MaterialCommunityIcons"
                />
            </Button>
            <Button warning badge style={styles.monthButton}>
                <Text style={styles.timeText}>{getMonthName(startDate)}</Text>
            </Button>
        </View>
    );
};

export const RSVPComponent = ({onRSVPPressed}) => {
    return (
        <View>
            <Button info badge onPress={() => onRSVPPressed()}>
                <Text style={styles.rsvpText}>RSVP</Text>
            </Button>
        </View>
    );
};

const TimeComponent = (props: DateProps) => {
    const {startDate, endDate} = props;
    return (
        <View style={styles.dateContainer}>
            <Icon
                style={[styles.icon, {fontSize: 40}]}
                name="clock-outline"
                type="MaterialCommunityIcons"
            />
            <Button success badge>
                <Text style={styles.timeText}>{getPrettyTime(startDate)}</Text>
            </Button>
            <Button danger badge style={styles.timeButton}>
                <Text style={styles.timeText}>{getPrettyTime(endDate)}</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    successRSVP: {
        backgroundColor: "#B9F6CA",
        padding: 10,
        color: "#424242",
        fontSize: 15,
        fontWeight: "bold"
    },
    rsvpText: {
        color: "white",
        fontSize: 15,
        padding: 5,
        fontWeight: "bold",
    },
    dateTimeContainer: {
        justifyContent: "space-around",
        alignSelf: "baseline",
        alignItems: "center",
    },
    monthButton: {
        marginTop: 5,
        padding: 12,
    },
    timeText: {
        color: "white",
        fontSize: 15,
        padding: 5,
    },
    timeButton: {
        marginTop: 5,
    },
    container: {
        alignContent: "center",
        flex: 1,
        justifyContent: "center",
        margin: 5,
    },
    monthText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    dateContainer: {
        paddingTop: 20,
        paddingBottom: 15,
        paddingLeft: 20,
        width: "40%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    cardItem: {
        paddingBottom: 5,
        paddingLeft: 0,
    },
    card: {
        padding: 20,
    },
    eventDetails: {
        fontWeight: "bold",
        color: "#616161",
        fontSize: 20,
        marginTop: 15,
    },
    messageBody: {
        color: "#212121",
        fontSize: 15,
        marginTop: 8,
    },
    icon: {
        paddingBottom: 3,
        marginRight: 0,
        marginLeft: 0,
        fontSize: 30,
    },
    dateText: {
        color: "#424242",
        fontStyle: "italic",
        fontSize: 15,
    },
    posted: {
        color: "#212121",
        fontSize: 15,
        fontWeight: "500",
    },
    row: {
        flexDirection: "row",
    },
    subjectText: {
        color: "#212121",
        fontSize: 25,
        fontWeight: "bold",
        padding: 0
    },
});