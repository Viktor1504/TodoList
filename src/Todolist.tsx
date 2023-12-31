import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type PropsType = {
    title: string
    tasks: TasksType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {

    const tasksList = props.tasks.map(t => {
            const onRemoveHandler = () => {
                props.removeTask(t.id)
            }
            return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        }
    )

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.code === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}