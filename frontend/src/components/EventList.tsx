import { TaggedCommunication } from "external-clients/pacebackend";
import * as React from "react";
import { EventCard } from "./EventCard";

interface Props {
  communications: TaggedCommunication[];
  deleteCallback: (id: number) => void;
}

export class EventList extends React.Component<Props, {}> {
  public render() {
    return (
      <div id={"event-list"}>
        {this.props.communications.map((communication) => (
          <EventCard
            communication={communication}
            key={communication.id}
            onDelete={() => this.props.deleteCallback(communication.id)}
          />
        ))}
      </div>
    );
  }
}
