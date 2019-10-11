import React from "react";
import { Text, View, ScrollView } from "react-native";
import { ColorHeader } from "./Header";
export const Donate = () => {
  
  return (
  <View>
    <ColorHeader title={"About"}/>
    <ScrollView>
      <Text style={{fontWeight:"bold", textAlign:"left", fontSize:20, marginBottom:20}}>
        At PACE, we help people with disabilities get great jobs. You can help make a difference by pledging any amount you can. Your donation will:      
      </Text>
      <Text>{'\u2B24'}Test</Text>
      <Text style={{fontWeight:"bold", textAlign:"center", fontSize:20, marginTop:20}}>
        PACE Enterprises, originally named PACE TEC and founded by a group of parents that recognized the special support their sons and daughters would need to succeed as young adults, is a non-profit, community-led organization that provides pre-vocational and vocational rehabilitation services to individuals with disabilities, without regard to race, color, or national origin, throughout North Central West Virginia since 1972.
      </Text>
      <Text style={{textAlign:"left", fontSize:20, marginTop:20}}>
        PACE Enterprises is licensed by the State of West Virginia as a Community Rehabilitation Program and Behavioral Mental Health Center. Clients are adults who have a documented disability and who are interested in joining the local workforce. Disabilities range in severity level and type but include intellectual or developmental disability (IDD), sensory, medical, physical, and/or emotional. Individuals may have a disability from birth or have acquired the disability through an accident, medical problem, or other life-changing events.
      </Text>
    </ScrollView>
  </View>);
}