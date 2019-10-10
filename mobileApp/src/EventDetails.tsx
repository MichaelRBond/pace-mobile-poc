import React from "react";
import { Text, View } from "react-native";
import { BroadcastedEvent } from "./service";

export interface Props {
    event: BroadcastedEvent;
}

export default class EventDetails extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const broadCastDate = new Date(this.props.event.date);

        let startDate: Date;
        let endDate: Date;
        const isEvent = this.props.event.start_time != null && this.props.event.end_time != null;
        if (isEvent) {
            startDate = new Date(this.props.event.start_time);
            endDate = new Date(this.props.event.end_time);
        }

        return (
            <View>
                <View>
                    <Text>{this.props.event.subject}</Text>
                </View>
                <View>
                    <Text>{new Date(this.props.event.date)}</Text>
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
                    <Text>{this.props.event.body}</Text>
                </View>
            </View>
        );
    }
}
