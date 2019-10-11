

import { Container, Spinner, View, Text } from "native-base";
import React from "react";



export const ColorHeader = (props) => (
    <View style={{backgroundColor: 'yellow', height:"3%"}}>
        <View style={{backgroundColor: 'green', width:"70%", marginLeft:"15%",height:"100%"}}>
            <View style={{backgroundColor: 'red', width:"70%", marginLeft:"15%",height:"100%"}}>
                <View style={{backgroundColor: 'black', width:"70%", marginLeft:"15%",height:"100%"}}>
                    <View style={{alignItems:"center",height:"100%"}}>
                        <Text style={{color: 'white',height:"100%",fontWeight:"bold",marginTop:1}}>
                            {props.title}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
  </View>
  
);


