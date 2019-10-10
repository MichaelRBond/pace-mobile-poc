import { Button, Card, ControlGroup, FormGroup, InputGroup, Intent, Tag, Tooltip } from "@blueprintjs/core";
import * as React from "react";

interface Props {
  loginCallback: (username: string, password: string) => Promise<boolean>;
}

interface State {
  password: string;
  showPassword: boolean;
  username: string;
  error: boolean;
}

export class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: false,
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
        <Card>
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
        </Card>
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          {this.state.error && <Tag intent={Intent.DANGER}>{"Invalid Username/Password"}</Tag>}
        </div>
      </div>
    );
  }

  private async submit(e: any): Promise<void> {
    e.preventDefault();
    const login = await this.props.loginCallback(this.state.username, this.state.password);
    if (!login) {
      this.setState({ error: true });
    }
  }

  private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
}
