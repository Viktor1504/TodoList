import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask(title: string) {
        let newTask: TasksType = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function removeTask(id: string) {
        let filteredTasks: TasksType[] = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
