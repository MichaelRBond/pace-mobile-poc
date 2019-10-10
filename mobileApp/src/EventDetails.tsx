import Communication from './service';
import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

export interface Props {
    communication: Communication
}

interface State {
}

export default class EventDetails extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    public render() {
        return <div></div>
    }
}
