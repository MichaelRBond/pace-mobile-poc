import { Intent } from "@blueprintjs/core";
import { PaceBackendClient, RsvpResponse, TaggedCommunication } from "external-clients/pacebackend";
import * as React from "react";
import { EventCreator } from "./EventCreator";
import { EventList } from "./EventList";
import { AppToaster } from "./PaceFrontend";

interface Props {
  pacebackend: PaceBackendClient;
}

interface State {
  communications: TaggedCommunication[];
  rsvps: {[id: number]: number};
  error: boolean;
}

export class EventManager extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      communications: [],
      rsvps: {},
      error: false,
    };
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
    return (
      <div id={"reader-container"} style={{ maxWidth: "100vh", margin: "auto" }}>
        <EventCreator pacebackend={this.props.pacebackend} onCreate={this.addCommunication.bind(this)}/>
        <div style={{margin: "2em 0", padding: 0}}/>
        <EventList
          communications={this.state.communications}
          deleteCallback={this.removeCommunication.bind(this)}
          getRSVP={this.getRSVP.bind(this)}
          rsvps={this.state.rsvps}
        />
      </div>
    );
  }

  private addCommunication(communication: TaggedCommunication): void {
    this.setState({ communications: this.sortCommunications([communication, ...this.state.communications]) });
  }

  private removeCommunication(id: number): void {
    this.deleteData(id);
  }

  private getRSVP(id: number): void {
    this.pullRSVP(id);
  }

  private async deleteData(id: number): Promise<void> {
    try {
      await this.props.pacebackend.deleteCommunication(id);
      this.setState({ communications: this.state.communications.filter((communication) => communication.id !== id)});
    } catch {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Failed to delete message",
      });
    }
  }

  private async loadData(): Promise<void> {
    this.setState({ error: false, communications: [] });
    try {
      const communications: TaggedCommunication[] = await this.props.pacebackend.getCommunications();
      this.setState({ communications: this.sortCommunications(communications) });
    } catch {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Failed to load messages",
      });
    }
  }

  private async pullRSVP(id: number) {
    try {
      const rsvps: RsvpResponse = await this.props.pacebackend.getRsvpCount(id);
      const newrsvps = {...this.state.rsvps};
      newrsvps[rsvps.id] = rsvps.count;
      this.setState({ rsvps: newrsvps });
    } catch {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Failed to get RSVP",
      });
    }
  }

  private sortCommunications(communications: TaggedCommunication[]): TaggedCommunication[] {
    return communications.sort((a: TaggedCommunication, b: TaggedCommunication) => {
      return a.expiration_date - b.expiration_date;
    });
  }
}
