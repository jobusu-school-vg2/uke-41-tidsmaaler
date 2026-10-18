import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type TimerButtonProps = {
    color: string;
    title: string;
    small?: boolean;
    toggleChange?: () => void;
};

export default function TimerButton(props: TimerButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, { borderColor: props.color }]}
            onPress={props.toggleChange}
        >
            <Text
                style={[
                    styles.buttonText,
                    props.small ? styles.small : styles.large,
                    { color: props.color },
                ]}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        minWidth: 100,
        borderWidth: 2,
        borderRadius: 3,
    },
    small: {
        fontSize: 14,
        padding: 5,
    },
    large: {
        fontSize: 16,
        padding: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
    },
});
            