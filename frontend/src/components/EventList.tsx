import { Card, Intent, Tag } from "@blueprintjs/core";
import { PaceBackendClient, TaggedCommunication } from "external-clients/pacebackend";
import * as React from "react";

interface Props {
  pacebackend: PaceBackendClient;
}

interface State {
  communications: TaggedCommunication[];
  error: boolean;
}

export class EventList extends React.Component<Props, State> {
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
        <div>
            {this.state.error && <Tag intent={Intent.DANGER}>{"Error"}</Tag>}
            {this.state.communications.map((communication) => (
                <Card key={communication.id}>
                    {communication.subject}
                </Card>
            ))}
        </div>
    );
  }

  private async loadData(): Promise<void> {
    this.setState({error: false, communications: []});
    try {
        const communications: TaggedCommunication[] = await this.props.pacebackend.getCommunications();
        this.setState({communications});
    } catch {
        this.setState({error: true});
    }
  }
}
