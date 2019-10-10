import {Communication, Service} from './service';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })


//   import Service from './service';
//   import Communication from './service';
//   import React from 'react';
//   import {Button, StyleSheet, Text, View} from 'react-native';

export interface Props {
    communications: Array<Communication>;
}

interface State {
    communications: Array<Communication>;
}


  

export class EventList extends React.Component<Props,State>{
    constructor(props){
        super(props);
        this.state = {communications: props.communications}

    }

    render() {
        console.log("HEREEE")
        console.log(this.state.communications)
        return (
          <View style={styles.container}>
            <FlatList
              data={this.state.communications}
              renderItem={({item}) => <Text style={styles.item}> {item.subject} </Text>}
            />
        </View>);
    }   
}
    
    
export default EventList;
