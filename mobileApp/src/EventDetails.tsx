import React from "react";
import { BroadcastedEvent } from "./service";

export interface Props {
    event: BroadcastedEvent;
}

export default class EventDetails extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div>
                <h1>{this.props.event.subject}</h1>
            </div>
        );
    }
}
