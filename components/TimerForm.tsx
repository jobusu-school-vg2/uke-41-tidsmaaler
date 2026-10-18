import { useState } from 'react';

import { StyleSheet, View, Text, TextInput } from 'react-native';
import TimerButton from './TimerButton';


interface TimerFormProps {
    id?: string;
    title?: string;
    category?: string;
    onSubmit: (newTitle: string, newCategory: string) => void;
    onCancel: () => void;
};

export default function TimerForm(props: TimerFormProps) {
    const [newTitle, setNewTitle] = useState(props.title ? props.title : '');
    const [newCategory, setNewCategory] = useState(props.category ? props.category : '')

    const submitText = props.id ? 'Oppdater' : 'Opprett';

    return (
        <View style={styles.formContainer}>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Navn</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        defaultValue={props.title}
                        onChangeText={setNewTitle}
                    />
                </View>
            </View>
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Kategori</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        defaultValue={props.category}
                        onChangeText={setNewCategory}
                    />
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <TimerButton small color="#21BA45" title={submitText} toggleChange={() => props.onSubmit(newTitle, newCategory)}/>
                <TimerButton small color="#DB2828" title="Avbryt" toggleChange={props.onCancel}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'white',
        borderColor: '#D6D7DA',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    attributeContainer: {
        marginVertical: 8,
    },
    textInputContainer: {
        borderColor: '#D6D7DA',
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: 5,
    },
    textInput: {
        height: 30,
        padding: 5,
        fontSize: 12,
    },
    textInputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});