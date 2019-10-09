import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';

import Service, { BroadcastedEvent } from './src/service'
import EventList from './src/eventList'
import SplashScreen from 'react-native-splash-screen'
import { LoadingView } from "./src/LoadingView";

interface Props {};
interface State {
  isLoading: boolean
  eventsData: Array<BroadcastedEvent>;
}

export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      eventsData: [],
      isLoading: true,
    }
    this.getEventsData = this.getEventsData.bind(this);
  }

  componentDidMount() {
    SplashScreen && SplashScreen.hide();
    this.getEventsData();
  }

  getEventsData() {
    const test = new Service();
    const data = test.fetchCommunications();
    this.setState({
      eventsData: data,
      isLoading: false
    });
  }

  public render() {
    const { isLoading } = this.state;
    if(isLoading) {
      return <LoadingView/>
    }
    return <EventList></EventList>;
  }
}