import React from "react";
import { Text, View } from "react-native";
import { BroadcastedEvent } from "./service";

export interface Props {
    navigation: any;
    event: BroadcastedEvent;
}

export default class EventDetails extends React.Component<Props,{}>{
    constructor(props: Props) {
        super(props);
        console.log('below')
        console.log(props.navigation.state.params)
    }

    public render() {
        let event = this.props.navigation.state.params.event;
        const broadCastDate = new Date(event.date);

        let startDate: Date;
        let endDate: Date;
        const isEvent = event.start_time != null && event.end_time != null;
        if (isEvent) {
            startDate = new Date(event.start_time);
            endDate = new Date(event.end_time);
        }
        // {event.subject}
        return (
            <View>
                <View>
                    <Text>{event.subject}</Text>
                </View>
                <View>
                    <Text>{new Date(event.date).toString()}</Text>
                </View>
                {isEvent &&
                    <View>
                        <Text>Event: {startDate.toString()} - {endDate.toString()}</Text>
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
