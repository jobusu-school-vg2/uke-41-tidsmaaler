import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer'

type EditableTimerProps = {
    id: string;
    title: string;
    project: string;
    elapsed: number;
    isRunning: boolean;
    editFormOpen: boolean;
};

export default function EditableTimer(props: EditableTimerProps) {
    if (props.editFormOpen) {
        return <TimerForm id={props.id} title={props.title} project={props.project} />;
    }
    
    return (
        <Timer
            title={props.title}
            project={props.project}
            elapsed={props.elapsed}
        />
    );
}
    