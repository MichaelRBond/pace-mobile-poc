import { Intent, Tag } from "@blueprintjs/core";
import { PaceBackendClient, TaggedCommunication } from "external-clients/pacebackend";
import * as React from "react";
import { EventCreator } from "./EventCreator";
import { EventList } from "./EventList";

interface Props {
  pacebackend: PaceBackendClient;
}

interface State {
  communications: TaggedCommunication[];
  error: boolean;
}

export class EventManager extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      communications: [],
      error: false,
    };
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
    return (
      <div id={"reader-container"} style={{ maxWidth: "100vh", margin: "auto" }}>
        {this.state.error && <Tag intent={Intent.DANGER}>{"Error"}</Tag>}
        <EventCreator pacebackend={this.props.pacebackend} onCreate={this.addCommunication.bind(this)}/>
        <div style={{margin: "2em 0", padding: 0}}/>
        <EventList communications={this.state.communications} deleteCallback={this.removeCommunication.bind(this)}/>
      </div>
    );
  }

  private addCommunication(communication: TaggedCommunication): void {
    this.setState({ communications: this.sortCommunications([communication, ...this.state.communications]) });
  }

  private removeCommunication(id: number): void {
    this.deleteData(id);
  }

  private async deleteData(id: number): Promise<void> {
    await this.props.pacebackend.deleteCommunication(id);
    this.setState({ communications: this.state.communications.filter((communication) => communication.id !== id)});
  }

  private async loadData(): Promise<void> {
    this.setState({ error: false, communications: [] });
    try {
      const communications: TaggedCommunication[] = await this.props.pacebackend.getCommunications();
      this.setState({ communications: this.sortCommunications(communications) });
    } catch {
      this.setState({ error: true });
    }
  }

  private sortCommunications(communications: TaggedCommunication[]): TaggedCommunication[] {
    return communications.sort((a: TaggedCommunication, b: TaggedCommunication) => {
      return a.expiration_date - b.expiration_date;
    });
  }
}
