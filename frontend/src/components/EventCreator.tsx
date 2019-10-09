import { PaceBackendClient } from "external-clients/pacebackend";
import * as React from "react";

interface Props {
  pacebackend: PaceBackendClient;
}

interface State {
}

export class EventCreator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  public render() {

    return (
      <div id="reader-container">
      </div>
    );
  }
}
