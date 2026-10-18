import { useState } from 'react';
import { newTimer } from '../utils/TimerUtils';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import EditableTimer from '../components/EditableTimer';
import ToggleableTimerForm from '../components/ToggleableTimerForm';

import { Timer } from '../types/index.types';


export default function App() {
	const [timers, setTimers] = useState<Timer[]>([]);

	function removeTimer(timer: Timer) {
		const index = timers.findIndex(_timer => _timer.id === timer.id);
		setTimers(timers.toSpliced(index, 1));
	}

	function addNewTimer(title: string, category: string) {
        setTimers((timers) => [
            ...timers,
            newTimer(title, category)
        ]);
	}

	return (
		<View style={styles.appContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Tidsmålere</Text>
			</View>
			<ScrollView style={styles.timerList}>
				<ToggleableTimerForm onSubmit={addNewTimer}/>
				{timers.map((timer) => (
					<EditableTimer
						key={timer.id}
						onRemove={() => removeTimer(timer)}
						onStart={() => console.log('Start')}
						onStop={() => console.log('Stop')}
						{...timer}
					/>
				))}
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
