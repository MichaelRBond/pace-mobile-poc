import { Body, Card, CardItem, Content } from "native-base";
import React from "react";
import { SectionListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList, NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import * as config from "./config";
import { Communication, Service } from "./service";

export interface Props {
    service: Service;
    communications: Communication[];
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
    communications: Communication[];
    refreshing: boolean;
    service: Service;
}

interface CardProps {
    onCardPressed: () => void;
    item: Communication;
}

const EventCard = (props: CardProps) => {
    const {onCardPressed, item} = props;
    return (
        <TouchableOpacity onPress={() => onCardPressed()}>
            <Card key={item.id.toString()}>
                <CardItem>
                    <Body>
                        <Text style={styles.item}>
                            {item.subject}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
};

export class EventList extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        const cfg = config.get();
        this.state = {
            communications: props.communications,
            refreshing: false,
            service: new Service(cfg.serverHost),
        };
        this.onPress = this.onPress.bind(this);
        this.renderCard = this.renderCard.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    public onPress(item) {
        this.props.navigation.navigate(
            "EventDetails",
            {
                event: item,
                onUpdate: (communication: Communication) => {
                    this.props.service.saveRsvp(communication.id, communication.rsvp);
                    const newComms = this.state.communications.map((comm) => {
                        if (comm.id === communication.id) {
                            return communication;
                        }
                        return comm;
                    });
                    this.setState({ communications: newComms });
                },
            },
        );
    }

    public onRefresh() {
        this.setState({
            refreshing: true,
        }, async () => {
            const data = await this.state.service.fetchCommunications();
            this.setState({
                communications: data,
                refreshing: false,
            });
        });
    }

    public render() {
        const {communications, refreshing} = this.state;
        return (
            <View style={styles.container}>
                    <FlatList
                        data={communications}
                        renderItem={this.renderCard}
                        keyExtractor={(item) => item.id.toString()}
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                    />
            </View>
        );
    }

    public renderCard(info: SectionListRenderItemInfo<Communication>) {
        return <EventCard item={info.item} onCardPressed={() => this.onPress(info.item)} />;
    }
}

export default EventList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
    },
});
