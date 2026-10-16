import React from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import EditableTimer from '../components/EditableTimer';
import ToggleableTimerForm from '../components/ToggleableTimerForm';

export default function App() {
  return (
    <View style={styles.appContainer}>
<     View style={styles.titleContainer}>
        <Text style={styles.title}>Tidsmålere</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm/>
        <EditableTimer
          id="1"
          title="Klippe plenen"
          project="Hageaktivitet"
          elapsed="8986300"
          isRunning
        />
        <EditableTimer
          id="2"
          title="Bake kake"
          project="Kjøkkenaktivitet"
          elapsed="3890985"
          editFormOpen
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    timerList: {
    paddingBottom: 15,
  },  
});
