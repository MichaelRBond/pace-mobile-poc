import { PaceBackendClient } from "external-clients/pacebackend";
import * as React from "react";
import { EventCreator } from "./EventCreator";
import { EventList } from "./EventList";

interface Props {
  pacebackend: PaceBackendClient;
}

export class EventManager extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div id={"reader-container"} style={{ maxWidth: "100vh", margin: "auto" }}>
        <EventCreator pacebackend={this.props.pacebackend} />
        <EventList pacebackend={this.props.pacebackend}/>
      </div>
    );
  }
}
