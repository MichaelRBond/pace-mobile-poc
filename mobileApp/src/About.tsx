import React from "react";
import { Text, View, ScrollView } from "react-native";
import YouTube from 'react-native-youtube';
import { setState } from "expect/build/jestMatchersObject";
export const About = () => {
  
  return (
  <View>
    <ScrollView>
      <Text style={{fontWeight:"bold", textAlign:"center", fontSize:20, marginBottom:20}}>
      West Virginia leads the nation in citizens with disabilities; about one in four. Mountaineers with disabilities have the highest rate of unemployment. In Morgantown, Fairmont, Grafton and Charleston,  PACE Enterprises is trying to help individuals who have disabilities find great, supportive jobs.
      </Text>
      <YouTube
        videoId="QGe-xjqRpWI" // The YouTube video ID
        onReady={e => setState({ isReady: true })}
        onChangeState={e => setState({ status: e.state })}
        onChangeQuality={e => setState({ quality: e.quality })}
        onError={e => setState({ error: e.error })}
        style={{ alignSelf: 'stretch', height: 300 }}
      />
      <Text style={{fontWeight:"bold", textAlign:"center", fontSize:20, marginTop:20}}>
        PACE Enterprises, originally named PACE TEC and founded by a group of parents that recognized the special support their sons and daughters would need to succeed as young adults, is a non-profit, community-led organization that provides pre-vocational and vocational rehabilitation services to individuals with disabilities, without regard to race, color, or national origin, throughout North Central West Virginia since 1972.
      </Text>
      <Text style={{textAlign:"left", fontSize:20, marginTop:20}}>
        PACE Enterprises is licensed by the State of West Virginia as a Community Rehabilitation Program and Behavioral Mental Health Center. Clients are adults who have a documented disability and who are interested in joining the local workforce. Disabilities range in severity level and type but include intellectual or developmental disability (IDD), sensory, medical, physical, and/or emotional. Individuals may have a disability from birth or have acquired the disability through an accident, medical problem, or other life-changing events.
      </Text>
    </ScrollView>
  </View>);
}