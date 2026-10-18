import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function PausableTimer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    // Refs to persist values without triggering re-renders
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef(0);
    const accumulatedTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            // Set the anchor timestamp for when the timer (re)started
            startTimeRef.current = Date.now();
        
            intervalRef.current = setInterval(() => {
                // Calculate precise elapsed time since the last unpause
                const elapsedTime = Date.now() - startTimeRef.current;
                // Total time = what we already accumulated + time in current session
                const totalMs = accumulatedTimeRef.current + elapsedTime;
            
                setSeconds(Math.floor(totalMs / 1000));
            }, 100); // Check frequently for smooth UI updates
        } else {
            // When paused, save the current progress to the accumulator
            if (startTimeRef.current !== 0) {
                accumulatedTimeRef.current += Date.now() - startTimeRef.current;
            }
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }

        // Cleanup: clear interval when component unmounts
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        startTimeRef.current = 0;
        accumulatedTimeRef.current = 0;
        setSeconds(0);
    };

    // Helper to format seconds into MM:SS
    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const secs = (totalSeconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <View style={styles.container}>
            {/* tabular-nums prevents the text layout from jittering as numbers change */}
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            
            <View style={styles.buttonRow}>
                <TouchableOpacity 
                style={[styles.button, isRunning ? styles.pauseBtn : styles.startBtn]} 
                onPress={handleStartPause}
                >
                    <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.resetBtn]} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'], // Crucial for clean timer layouts
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 2,
  },
  startBtn: { backgroundColor: '#4CAF50' },
  pauseBtn: { backgroundColor: '#FF9800' },
  resetBtn: { backgroundColor: '#f44336' },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});