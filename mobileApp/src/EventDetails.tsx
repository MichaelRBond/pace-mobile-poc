import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { Communication } from "./service";
import { ColorHeader } from "./Header";

export interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class EventDetails extends React.Component<Props, Communication> {
    constructor(props: Props) {
        super(props);
        this.state = props.navigation.getParam("event");
    }

    public render() {
        const communication = this.state;
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
                <ColorHeader title={communication.subject}/>
                <View>
                    <Text>{communication.subject}</Text>
                </View>
                <View>
                    <Text>{createdDate}</Text>
                </View>
                {isEvent &&
                    <View>
                        <Text>Event: {startDate} to {endDate}</Text>
                    </View>
                }
                <View>
                    <Text>--- Message ---</Text>
                </View>
                <View>
                    <Text>{communication.body}</Text>
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
    const minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes();
    const ampm = hour < 12 ? "AM" : "PM";
    return `${year}-${month}-${day} @ ${hour % 12}:${minute} ${ampm}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
});
