import { Button, ControlGroup, FormGroup, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { AppToaster } from "./PaceFrontend";

interface Props {
  loginCallback: (username: string, password: string) => Promise<boolean>;
}

interface State {
  password: string;
  showPassword: boolean;
  username: string;
}

export class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: "",
      showPassword: false,
      username: "",
    };

    this.submit = this.submit.bind(this);
  }

  public render() {

    const lockButton = (
      <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
        <Button
          icon={this.state.showPassword ? "unlock" : "lock"}
          intent={Intent.WARNING}
          minimal={true}
          onClick={this.handleLockClick}
        />
      </Tooltip>
    );

    return (
      <div id="login" style={{ maxWidth: "50vh", margin: "auto" }}>
          <form onSubmit={(e: any) => this.submit(e)}>
            <ControlGroup
              vertical={true}
            >
              <FormGroup
                label="Username"
                labelFor="username"
                labelInfo="(required)"
              >
                <InputGroup
                  placeholder="Enter your username..."
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e: any) => this.setState({ username: e.target.value })}
                />
              </FormGroup>
              <FormGroup
                label="Password"
                labelFor="password"
                labelInfo="(required)"
              >
                <InputGroup
                  placeholder="Enter your password..."
                  rightElement={lockButton}
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e: any) => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <Button type="submit">Login</Button>
            </ControlGroup>
          </form>
      </div>
    );
  }

  private async submit(e: any): Promise<void> {
    e.preventDefault();
    const login = await this.props.loginCallback(this.state.username, this.state.password);
    if (!login) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Invalid Username or Password",
      });
    }
  }

  private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
}
