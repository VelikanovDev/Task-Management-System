import './App.css';
import TaskTable from "./components/TaskTable";
import MyModal from "./components/UI/modal/MyModal";
import TaskForm from "./components/TaskForm";
import * as React from "react";
import {useState} from "react";
import {Button} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [data, setData] = useState([
        {
            "id": "1",
            "isDone": true,
            "name": "Implement UI",
            "assignedTo": "Alice",
            "progress": "95%",
            "priority": "High",
            "due": "2024-04-12"
        },
        {
            "id": "2",
            "isDone": false,
            "name": "Fix backend bugs",
            "assignedTo": "Bob",
            "progress": "75%",
            "priority": "Medium",
            "due": "2024-04-15"
        },
        {
            "id": "3",
            "isDone": false,
            "name": "Write documentation",
            "assignedTo": "Charlie",
            "progress": "40%",
            "priority": "Low",
            "due": "2024-04-20"
        },
        {
            "id": "4",
            "isDone": false,
            "name": "Refactor service layer",
            "assignedTo": "Dana",
            "progress": "30%",
            "priority": "Medium",
            "due": "2024-04-25"
        },
        {
            "id": "5",
            "isDone": true,
            "name": "Update API endpoints",
            "assignedTo": "Evan",
            "progress": "100%",
            "priority": "High",
            "due": "2024-04-18"
        },
        {
            "id": "6",
            "isDone": false,
            "name": "Improve database schema",
            "assignedTo": "Fiona",
            "progress": "20%",
            "priority": "High",
            "due": "2024-04-30"
        },
        {
            "id": "7",
            "isDone": false,
            "name": "Set up CI/CD",
            "assignedTo": "George",
            "progress": "50%",
            "priority": "Medium",
            "due": "2024-05-05"
        },
        {
            "id": "8",
            "isDone": true,
            "name": "Optimize front-end performance",
            "assignedTo": "Hilda",
            "progress": "60%",
            "priority": "High",
            "due": "2024-04-22"
        }
    ])

    const handleCreateTask = (newTask) => {
        setData((prevData) => {
            return [...prevData, newTask];
        });
    }

    return (
        <div className="App">
            <h1>Task Management System</h1>
            <MyModal visible={modalVisible} setVisible={setModalVisible}>
                <TaskForm create={handleCreateTask}/>
            </MyModal>
            <Button
                startIcon={<AddCircleIcon />}
                onClick={() => {
                        setSelectedTask(null);
                        setModalVisible(true);
                    }
                }
            >
                New Task
            </Button>
            <header>
                <TaskTable tasks={data} />
            </header>
        </div>
    );
}

export default App;
