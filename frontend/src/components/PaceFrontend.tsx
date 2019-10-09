import { PaceBackendClient } from "external-clients/pacebackend";
import { isNotNull, isNull, Nullable } from "nullable-ts";
import { EventCreator } from "./EventCreator";
import * as React from "react";
import { Login } from "./Login";

import "../styles/grapevine.css";

interface Props {
  pacebackend: PaceBackendClient;
}

interface State {
  password: Nullable<string>;
  username: Nullable<string>;
}

export class PaceFrontend extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      password: null,
      username: null,
    };

    this.loginCallback = this.loginCallback.bind(this);
  }

  public render() {

    return (
      <div>
        {isNull(this.state.username) &&
          <Login
            loginCallback={this.loginCallback}
          />
        }
        {isNotNull(this.state.username) &&
          <div>
            <EventCreator pacebackend={this.props.pacebackend} />
          </div>
        }
      </div>
    );
  }

  private async loginCallback(username: string, password: string): Promise<void> {
    const authResult = await this.props.pacebackend.authenticate(username, password);
    if (authResult) {
      this.setState({
        password,
        username,
      });
    }
    return;
  }
}
