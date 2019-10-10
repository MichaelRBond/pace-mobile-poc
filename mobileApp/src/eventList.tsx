import { Body, Card, CardItem, Content } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { ColorHeader } from "./Header";
import { Communication } from "./service";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
    },
});

export interface Props {
    communications: Communication[];
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
    communications: Communication[];
}

export class EventList extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { communications: props.communications };
    }

    public onPress(item) {
        this.props.navigation.navigate("EventDetails", { event: item });
    }

    public render() {
        return (
            <View style={styles.container}>
                <ColorHeader />
                <Content>
                    {this.state.communications.map((item) => {
                        return (
                            <Card key={item.id.toString()}>
                                <CardItem>
                                    <Body>
                                        <Text onPress={() => { this.onPress(item); }} style={styles.item}>
                                            {item.subject}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>);
                    })}
                </Content>
            </View>);
    }
}

export default EventList;
