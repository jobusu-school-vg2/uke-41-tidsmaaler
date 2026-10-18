import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';
import Colors from '../configs/colors.config';


type TimerProps = {
    title: string;
    category: string;
    elapsed: number;
    isRunning: boolean;
    onEdit: () => void;
    onRemove: () => void;
    onStartPause: () => void;
};

export default function Timer(props: TimerProps) {
    const elapsedString = millisecondsToHuman(props.elapsed);

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text>{props.category}</Text>
            <Text style={styles.elapsedTime}>{elapsedString}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color={Colors.blue} small title="Endre" toggleChange={props.onEdit}/>
                <TimerButton color={Colors.blue} small title="Fjern" toggleChange={props.onRemove}/>
            </View>
            <TimerButton
                color={props.isRunning ? Colors.red : Colors.green}
                title={props.isRunning ? 'Pause' : 'Start'}
                toggleChange={props.onStartPause}
            />
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
   
    