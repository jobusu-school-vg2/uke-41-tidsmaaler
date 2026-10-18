import { useEffect, useRef, useState } from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer'

import { Timer as TimerType } from '../types/index.types';


interface EditableTimerProps extends TimerType {
    onRemove: () => void;
    onStart: () => void;
    onStop: () => void;
}

export default function EditableTimer(props: EditableTimerProps) {
    const [title, setTitle] = useState(props.title);
    const [category, setCategory] = useState(props.category);
    const [elapsed, setElapsed] = useState(props.elapsed);
    const [isRunning, setIsRunning] = useState(props.isRunning);
    const elapsedBeforeRunRef = useRef(props.elapsed);
    const startedAtRef = useRef<number | null>(null);

    const [editFormOpen, setEditFormOpen] = useState(false);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const startedAt = Date.now();
        startedAtRef.current = startedAt;
        const intervalId = setInterval(() => {
            if (startedAtRef.current === startedAt) {
                setElapsed(elapsedBeforeRunRef.current + Date.now() - startedAt);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [isRunning]);

    function toggleRunning() {
        if (isRunning) {
            const startedAt = startedAtRef.current;
            if (startedAt !== null) {
                const finalElapsed = elapsedBeforeRunRef.current + Date.now() - startedAt;
                elapsedBeforeRunRef.current = finalElapsed;
                setElapsed(finalElapsed);
            }
            startedAtRef.current = null;
            setIsRunning(false);
            props.onStop();
            return;
        }

        elapsedBeforeRunRef.current = elapsed;
        setIsRunning(true);
        props.onStart();
    }

    if (editFormOpen) {
        return <TimerForm
            id={props.id}
            title={title}
            category={category}
            onSubmit={(newTitle, newCategory) => {
                setTitle(newTitle);
                setCategory(newCategory);
                setEditFormOpen(false);
            }}
            onCancel={() => setEditFormOpen(false)}
        />
    }
    
    return (
        <Timer
            title={title}
            category={category}
            elapsed={elapsed}
            isRunning={isRunning}
            onEdit={() => setEditFormOpen(true)}
            onRemove={props.onRemove}
            onStartPause={toggleRunning}
        />
    );
}
    