import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { BroadcastedEvent } from "./service";

export interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class EventDetails extends React.Component<Props, BroadcastedEvent> {
    constructor(props: Props) {
        super(props);
        this.state = props.navigation.getParam("event");
    }

    public render() {
        const event = this.state;
        const createdDate = formatUnixTimestamp(event.created_date);

        let startDate: string;
        let endDate: string;
        const isEvent = event.event != null;
        if (isEvent) {
            startDate = formatUnixTimestamp(event.event.start_time);
            endDate = formatUnixTimestamp(event.event.end_time);
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text>{event.subject}</Text>
                </View>
                <View>
                    <Text>{createdDate}</Text>
                </View>
                {isEvent &&
                    <View>
                        <Text>Event: {startDate} - {endDate}</Text>
                    </View>
                }
                <View>
                    <Text>--- Message ---</Text>
                </View>
                <View>
                    <Text>{event.body}</Text>
                </View>
            </View>
        );
    }
}

const formatUnixTimestamp = (ts: number): string => {
    const d = new Date(ts * 1000);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();
    return year + "-" + month + "-" + day + " @ " + hour + ":" + minute;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
});
