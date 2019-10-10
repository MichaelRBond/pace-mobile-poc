import React, { Component } from "react";
import {
  Platform,
} from "react-native";

import SplashScreen from "react-native-splash-screen";
import EventList from "./src/eventList";
import { LoadingView } from "./src/LoadingView";
import {Service} from "./src/service";
import {BroadcastedEvent} from "./src/service";

interface Props {}
interface State {
  isLoading: boolean;
  eventsData: BroadcastedEvent[];
}

export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      eventsData: [],
      isLoading: true,
    };
    this.getEventsData = this.getEventsData.bind(this);
  }

  public componentDidMount() {
    SplashScreen && SplashScreen.hide();
    this.getEventsData();
  }

  public getEventsData() {
    const test = new Service();
    const data = test.fetchCommunications();
    this.setState({
      eventsData: data.broadCastedEvents,
      isLoading: false,
    });
  }

  public render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <LoadingView/>;
    }

    return <EventList communications={this.state.eventsData}> </EventList>;

  }
}
