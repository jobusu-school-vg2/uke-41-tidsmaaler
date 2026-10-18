import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';


interface ToggleableTimerFormProps {
    onSubmit: (title: string, category: string) => void;
}

export default function ToggleableTimerForm(props: ToggleableTimerFormProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={[styles.container, !isOpen && styles.buttonPadding]}>
            {isOpen ? (
                <TimerForm
                    onSubmit={(title, category) => {
                        props.onSubmit(title, category);
                        setIsOpen(false);
                    }}
                    onCancel={() => {
                        setIsOpen(false);
                    }}
                />
            ) : (
                <TimerButton 
                    title="+" 
                    color="black" 
                    toggleChange={() => setIsOpen(!isOpen) }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    },
});