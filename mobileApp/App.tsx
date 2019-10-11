import React, { Component } from "react";
import OneSignal from "react-native-onesignal";
import SplashScreen from "react-native-splash-screen";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import * as config from "./src/config";
import EventList from "./src/eventList";
import { LoadingView } from "./src/LoadingView";
import { Communication, Service } from "./src/service";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface State {
  service: Service;
  isLoading: boolean;
  config: config.Config;
  eventsData: Communication[];
}

export default class App extends Component<Props, State> {

  constructor(props: Props) {
    OneSignal.init("c831b21b-810f-4b7f-8bfa-7cf2168665d7");
    super(props);
    const cfg = config.get();
    this.state = {
      config: cfg,
      eventsData: [],
      isLoading: true,
      service: new Service(cfg.serverHost),
    };
    this.getEventsData = this.getEventsData.bind(this);
  }

  public componentDidMount() {
    // tslint:disable-next-line: no-unused-expression
    SplashScreen && SplashScreen.hide();
    this.getEventsData();
  }

  public async getEventsData() {
    const data = await this.state.service.fetchCommunications();
    this.setState({
      eventsData: data,
      isLoading: false,
    });
  }

  public render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <LoadingView />;
    }

    return <EventList
              navigation={this.props.navigation}
              communications={this.state.eventsData}
              service={this.state.service}
            />;
  }
}
