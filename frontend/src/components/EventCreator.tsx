import { Button, FormGroup, H4, InputGroup, Intent, Switch, Tag, TextArea } from "@blueprintjs/core";
import { DatePicker, TimePrecision } from "@blueprintjs/datetime";
import { Communication, PaceBackendClient, TaggedCommunication } from "external-clients/pacebackend";
import * as React from "react";
import { EventCard } from "./EventCard";
import { AppToaster } from "./PaceFrontend";

interface Props {
  pacebackend: PaceBackendClient;
  onCreate: (created: TaggedCommunication) => void;
}

interface State {
  subject: string;
  showTillEnd: boolean;
  body: string;
  isEvent: boolean;
  expiration: Date;

  start: Date;
  end: Date;

  confirm: boolean;

  minDate: Date;
  maxDate: Date;
}

export class EventCreator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.defaultState();
  }

  public render() {
    if (this.state.confirm) {
      return this.renderConfirmation();
    }
    return this.renderInput();
  }

  public renderInput(): React.ReactNode {
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <H4>{"Create new message"}</H4>
        <form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: "1 auto", marginRight: "1em" }}>
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
                    value={this.state.subject}
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
                    growVertically={true}
                    id={"body"}
                    onChange={(e: any) => this.setState({ body: e.target.value })}
                    value={this.state.body}
                  />
                </FormGroup>
                <Switch
                  checked={this.state.isEvent}
                  label={"Include Start and End times"}
                  onChange={(e: any) => this.setState({ isEvent: e.target.checked })}
                />
                {this.state.isEvent && <Switch
                checked={this.state.showTillEnd}
                label={"Show message until event Ends"}
                onChange={(e: any) => this.setState({ showTillEnd: e.target.checked })}
              />}
              </div>
              {(!this.state.showTillEnd || !this.state.isEvent) && <div>
                 <FormGroup
                  label="Show Message Until"
                  labelFor="show"
                  labelInfo="(required)"
                >
                  <DatePicker
                    onChange={(expiration: Date) => this.setState({ expiration: this.endOfDay(expiration) })}
                    value={this.state.expiration}
                    minDate={this.state.minDate}
                    maxDate={this.state.maxDate}
                    className={"date-picker"}
                  />
                </FormGroup>
              </div>}
            </div>
            {this.state.isEvent && <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <FormGroup
                label="Event Start"
                labelFor="start"
                labelInfo="(required)"
              >
                <DatePicker
                  onChange={(start: Date) => this.setState({ start })}
                  value={this.state.start}
                  minDate={this.state.minDate}
                  maxDate={this.state.maxDate}
                  className={"date-picker"}
                  timePrecision={TimePrecision.MINUTE}
                  timePickerProps={{ useAmPm: true }}
                />
              </FormGroup>
              <FormGroup
                label="Event End"
                labelFor="end"
                labelInfo="(required)"
              >
                <DatePicker
                  onChange={(end: Date) => this.setState({ end })}
                  value={this.state.end}
                  minDate={this.state.minDate}
                  maxDate={this.state.maxDate}
                  className={"date-picker"}
                  timePrecision={TimePrecision.MINUTE}
                  timePickerProps={{ useAmPm: true }}
                />
              </FormGroup>
            </div>}
            <Button
              intent={Intent.SUCCESS}
              icon={"add"}
              onClick={this.enterConfirmation.bind(this)}
            >
              {"Create"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  public renderConfirmation(): React.ReactNode {
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <H4>{"Confirm Message"}</H4>
        <Tag style={{ marginBottom: "1em" }} intent={Intent.SUCCESS}>{"Does this message look correct"}</Tag>
        <EventCard communication={this.getCurrentCommunication()} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1em" }}>
          <Button intent={Intent.SUCCESS} icon={"confirm"} onClick={this.submit.bind(this)}>{"Confirm"}</Button>
          <Button intent={Intent.DANGER} icon={"stop"} onClick={this.exitConfirmation.bind(this)}>{"Cancel"}</Button>
        </div>
      </div>
    );
  }

  private enterConfirmation(e: any): void {
    if (this.state.subject === "") {
      AppToaster.show({
        intent: Intent.PRIMARY,
        message: `Missing required Subject field`,
      });
      return;
    }
    if (this.state.body === "") {
      AppToaster.show({
        intent: Intent.PRIMARY,
        message: `Missing required Body field`,
      });
      return;
    }
    if (this.state.isEvent && this.state.end.getTime() < this.state.start.getTime()) {
      AppToaster.show({
        intent: Intent.PRIMARY,
        message: `Event ends before it starts`,
      });
      return;
    }
    this.setState({ confirm: true });
  }

  private exitConfirmation(e: any): void {
    this.setState({ confirm: false });
  }

  private async submit(e: any): Promise<void> {
    e.preventDefault();
    const data: Communication = this.getCurrentCommunication();
    try {
      const communication = await this.props.pacebackend.postCommunication(data);
      this.setState(this.defaultState());
      this.props.onCreate(communication);
      AppToaster.show({
        intent: Intent.SUCCESS,
        message: "Successfully created new message!",
      });
    } catch {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Failed to create message",
      });
    }
  }

  private tomorrow(date: Date): Date {
    return this.endOfDay(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
  }

  private oneWeekPast(date: Date): Date {
    return this.endOfDay(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
  }

  private oneYearPast(date: Date): Date {
    return this.endOfDay(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()));
  }

  private endOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59);
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0);
  }

  private getCurrentCommunication(): Communication {
    const data: Communication = {
      body: this.state.body,
      expiration_date: (this.state.expiration.getTime() / 1000),
      subject: this.state.subject,
    };
    if (this.state.isEvent) {
      if (this.state.showTillEnd) {
        data.expiration_date = (this.state.end.getTime() / 1000);
      }
      data.event = {
        end_date: (this.state.end.getTime() / 1000),
        start_date: (this.state.start.getTime() / 1000),
      };
    }
    return data;
  }

  private defaultState(): State {
    const now: Date = this.endOfDay(new Date(Date.now()));
    return {
      body: "",
      expiration: this.oneWeekPast(now),
      isEvent: false,
      showTillEnd: false,
      subject: "",

      end: this.tomorrow(now),
      start: this.startOfDay(this.tomorrow(now)),

      confirm: false,

      maxDate: this.oneYearPast(now),
      minDate: now,
    };
  }
}
