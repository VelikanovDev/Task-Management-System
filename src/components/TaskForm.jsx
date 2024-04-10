import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const TaskForm = ({ create, update, task }) => {
    const initialTaskState = {
        id: '',
        name: '',
        isDone: false,
        assignedTo: "",
        progress: "",
        priority: "",
        due: ""
    }

    const [newTask, setNewTask] = useState(initialTaskState);
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        if (task) {
            setNewTask({
                name: task.name,
                assignedTo: task.assignedTo,
                progress: task.progress,
                priority: task.priority,
                due: task.due,
            });
        }
    }, [task]);

    const createOrUpdateTask = (e) => {
        e.preventDefault();

        if (!newTask.name || !newTask.assignedTo || !newTask.progress || !newTask.priority || !newTask.due) {
            setInputError(true);
            return;
        }

        const updatedTask = {
            id: 99,
            isDone: false,
            name: newTask.name,
            assignedTo: newTask.assignedTo,
            progress: newTask.progress,
            priority: newTask.priority,
            due: newTask.due
        };

        if (task) {
            update(updatedTask);
        } else {
            create(updatedTask);
        }

        setNewTask(initialTaskState);
        setInputError(false);
    };

    return (
        <form onSubmit={createOrUpdateTask} style={{ display: 'flex', flexDirection: 'column' }}>
            {inputError && <div style={{ color: 'red', marginBottom: '10px' }}>Please fill in all fields to add a task</div>}
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    id="task-name"
                    label="Name"
                    variant="outlined"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    id="assigned-to"
                    label="Assigned to"
                    variant="outlined"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    id="task-progress"
                    label="Progress"
                    variant="outlined"
                    value={newTask.progress}
                    onChange={(e) => setNewTask({ ...newTask, progress: e.target.value })}
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        label="Priority"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    id="due-date"
                    label="Due"
                    variant="outlined"
                    value={newTask.due}
                    onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                    fullWidth
                />
            </div>
            <Button type="submit" variant="contained" style={{ marginTop: '20px' }}>Send</Button>
        </form>
    );
};

export default TaskForm;