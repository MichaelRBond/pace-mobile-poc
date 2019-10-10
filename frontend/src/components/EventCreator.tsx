import { Button, Card, ControlGroup, FormGroup, InputGroup, TextArea } from "@blueprintjs/core";
import { DatePicker } from "@blueprintjs/datetime";
import { Communication, PaceBackendClient } from "external-clients/pacebackend";
import * as React from "react";

interface Props {
  pacebackend: PaceBackendClient;
}

interface State {
  subject: string;
  body: string;
  expiration: Date;

  minDate: Date;
  maxDate: Date;
}

export class EventCreator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const now: Date = new Date(Date.now());
    const oneYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    this.state = {
      body: "",
      expiration: new Date(),
      subject: "",

      maxDate: oneYear,
      minDate: now,
    };
  }

  public render() {
    return (
      <Card>
        <form onSubmit={(e: any) => this.submit(e)}>
          <ControlGroup
            vertical={true}
          >
            <FormGroup
              label="Subject"
              labelFor="subject"
              labelInfo="(required)"
            >
              <InputGroup
                placeholder="Subject"
                type="text"
                name="subject"
                id="subject"
                onChange={(e: any) => this.setState({ subject: e.target.value })}
              />
            </FormGroup>
            <FormGroup
              label="Body"
              labelFor="body"
              labelInfo="(required)"
            >
              <TextArea
                placeholder={"Body"}
                style={{ width: "100%" }}
                id={"body"}
                onChange={(e: any) => this.setState({ body: e.target.value })}
                value={this.state.body}
              />
            </FormGroup>
            <FormGroup
              label="Show Until"
              labelFor="show"
              labelInfo="(required)"
            >
              <DatePicker
                onChange={(expiration: Date) => this.setState({ expiration })}
                value={this.state.expiration}
                highlightCurrentDay={true}
                minDate={this.state.minDate}
                maxDate={this.state.maxDate}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </ControlGroup>
        </form>
      </Card>
    );
  }

  private async submit(e: any): Promise<void> {
    e.preventDefault();
    const data: Communication = {
      body: this.state.body,
      subject: this.state.subject,
    };
    this.props.pacebackend.postCommunication(data);
    return;
  }
}
