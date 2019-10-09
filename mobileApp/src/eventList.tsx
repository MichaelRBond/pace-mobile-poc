import Service from './service';
import Communication from './service';
import React from 'react';
import {SectionList, StyleSheet, Text, View } from 'react-native';
export interface Props {
    name: string;
    enthusiasmLevel?: number;
  }
  
  interface State {
    communications: Array<Communication>;
  }

export class EventList extends React.Component  {
    private communications: Array<Communication>;
    private styles = StyleSheet.create({
        container: {
         flex: 1,
         paddingTop: 22
        },
        sectionHeader: {
          paddingTop: 2,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 2,
          fontSize: 14,
          fontWeight: 'bold',
          backgroundColor: 'rgba(247,247,247,1.0)',
        },
        item: {
          padding: 10,
          fontSize: 18,
          height: 44,
        },
      })
    constructor(props: Array<Communication>){
        super(props);
        this.state = {communications: props}
    }

    render() {
        return (
          <View style={this.styles.container}>
            <SectionList
              sections={[
                {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
                {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
              ]}
              renderItem={({item}) => <Text style={this.styles.item}>{item}</Text>}
              renderSectionHeader={({section}) => <Text style={this.styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      }
    }
    
    
export default EventList;
