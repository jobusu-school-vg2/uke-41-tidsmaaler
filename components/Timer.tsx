import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

type TimerProps = {
    title: string;
    project: string;
    elapsed: number;
};

export default function Timer(props: TimerProps) {
    const elapsedString = millisecondsToHuman(props.elapsed);

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text>{props.project}</Text>
            <Text style={styles.elapsedTime}>{elapsedString}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color="blue" small title="Endre" />
                <TimerButton color="blue" small title="Fjern" />
            </View>
            <TimerButton color="#21BA45" title="Start" />
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: '#d6d7da',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
   
    