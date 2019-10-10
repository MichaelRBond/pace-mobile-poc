import React from "react";
import { BroadcastedEvent } from "./service";
import { Text } from "native-base";

export interface Props {
    event: BroadcastedEvent;
}

export default class EventDetails extends React.Component<Props,{}>{
    constructor(props: Props) {
        super(props);
        console.log('below')
        console.log(props.navigation.state.params)
    }

    public render() {
        return (
            <Text>
                {this.props.navigation.state.params.event.subject}
            </Text>
        );
    }
}
