import {BroadcastedEvent, Service} from './service';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import EventDetails from './EventDetails'
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { Card, CardItem, Body, Content } from 'native-base';


const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

//   import Service from './service';
//   import Communication from './service';
//   import React from 'react';
//   import {Button, StyleSheet, Text, View} from 'react-native';

export interface Props {
    communications: BroadcastedEvent[];
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
    communications: BroadcastedEvent[];
}





export class EventList extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {communications: props.communications};
    }

    public onPress(item){
        this.props.navigation.navigate('EventDetails', {event:item})
    }

    public render() {
        return (
          <View style={styles.container}>
            <Content>
          
              {this.state.communications.map(item =>{
                console.log(item)
                return( 
                <Card key={item.id.toString()}>
                    <CardItem>
                        <Body>
                            <Text onPress={() => {this.onPress(item)}} style={styles.item}> 
                                {item.subject} 
                            </Text>
                        </Body>
                    </CardItem>
                </Card>)

            })}
            </Content>
        </View>);
    }
}

export default EventList;
