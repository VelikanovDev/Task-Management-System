import './App.css';
import TaskTable from "./components/TaskTable";
import MyModal from "./components/UI/modal/MyModal";
import TaskForm from "./components/TaskForm";
import * as React from "react";
import {useState} from "react";
import {Box, Button, ButtonGroup} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [data, setData] = useState([
        {
            "id": "1",
            "isDone": true,
            "description": "Implement UI",
            "assignedTo": "Alice",
            "assignedBy": "Bob",
            "priority": "High",
            "due": "2024-04-12"
        },
        {
            "id": "2",
            "isDone": false,
            "description": "Fix backend bugs",
            "assignedTo": "Bob",
            "assignedBy": "Alice",
            "priority": "Medium",
            "due": "2024-04-15"
        },
        {
            "id": "3",
            "isDone": false,
            "description": "Write documentation",
            "assignedTo": "Charlie",
            "assignedBy": "Alice",
            "priority": "Low",
            "due": "2024-04-20"
        },
        {
            "id": "4",
            "isDone": false,
            "description": "Refactor service layer",
            "assignedTo": "Dana",
            "assignedBy": "Alice",
            "priority": "Medium",
            "due": "2024-04-25"
        },
        {
            "id": "5",
            "isDone": true,
            "description": "Update API endpoints",
            "assignedTo": "Evan",
            "assignedBy": "Alice",
            "priority": "High",
            "due": "2024-04-18"
        }
    ]);
    const [filter, setFilter] = useState('all'); // 'all', 'assignedByMe', 'myTasks'

    const filteredData = () => {
        if (filter === 'all') {
            return data;
        } else if (filter === 'assignedByMe') {
            // Assuming tasks not assigned to Alice are assigned by Alice
            return data.filter(task => task.assignedTo !== "Alice");
        } else if (filter === 'myTasks') {
            return data.filter(task => task.assignedTo === "Alice");
        }
    };

    const handleCreateTask = (newTask) => {
        setData((prevData) => {
            return [...prevData, newTask];
        });

        setModalVisible(false);
    };

    const handleEditTask = (id) => {
        const task = data.find(t => t.id === id);
        setSelectedTask(task);
        setModalVisible(true);
    };

    const handleDeleteTask = (id) => {
        setData(data.filter(task => task.id !== id));
    };

    return (
        <div className="App">
            <h1>Task Management System</h1>
            <ButtonGroup variant="contained">
                <Button variant="contained" onClick={() => setFilter('all')}>All Tasks</Button>
                <Button variant="contained" onClick={() => setFilter('assignedByMe')}>Assigned By Me</Button>
                <Button variant="contained" onClick={() => setFilter('myTasks')}>My Tasks</Button>
            </ButtonGroup>
            <MyModal visible={modalVisible} setVisible={setModalVisible}>
                <TaskForm create={handleCreateTask}/>
            </MyModal>
            <Box mt={2} mb={2}>
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                        setSelectedTask(null);
                        setModalVisible(true);
                    }}
                >
                    New Task
                </Button>
            </Box>
            <header>
                <TaskTable tasks={filteredData()} filter={filter} />
            </header>
        </div>
    );
}

export default App;
