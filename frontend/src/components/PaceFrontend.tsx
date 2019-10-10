import { Position, Toaster } from "@blueprintjs/core";
import { PaceBackendClient } from "external-clients/pacebackend";
import { isNotNull, isNull, Nullable } from "nullable-ts";
import * as React from "react";
import "../styles/pacefrontend.css";
import { EventManager } from "./EventManager";
import { Login } from "./Login";

interface Props {
  pacebackend: PaceBackendClient;
}

interface State {
  password: Nullable<string>;
  username: Nullable<string>;
}

export const AppToaster = Toaster.create({
  position: Position.BOTTOM,
});

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
            <EventManager pacebackend={this.props.pacebackend} />
          </div>
        }
      </div>
    );
  }

  private async loginCallback(username: string, password: string): Promise<boolean> {
    const authResult = await this.props.pacebackend.authenticate(username, password);
    if (authResult) {
      this.setState({
        password,
        username,
      });
      return true;
    }
    return false;
  }
}
