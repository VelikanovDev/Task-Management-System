import React, { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import MyModal from "../UI/modal/MyModal";
import TaskForm from "../TaskForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskTable from "../TaskTable";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [data, setData] = useState([
    {
      id: "1",
      isDone: true,
      description: "Implement UI",
      assignedTo: "Alice",
      assignedBy: "Bob",
      priority: "High",
      due: "2024-04-12",
    },
    {
      id: "2",
      isDone: false,
      description: "Fix backend bugs",
      assignedTo: "Bob",
      assignedBy: "Alice",
      priority: "Medium",
      due: "2024-04-15",
    },
    {
      id: "3",
      isDone: false,
      description: "Write documentation",
      assignedTo: "Charlie",
      assignedBy: "Alice",
      priority: "Low",
      due: "2024-04-20",
    },
    {
      id: "4",
      isDone: false,
      description: "Refactor service layer",
      assignedTo: "Dana",
      assignedBy: "Alice",
      priority: "Medium",
      due: "2024-04-25",
    },
    {
      id: "5",
      isDone: true,
      description: "Update API endpoints",
      assignedTo: "Evan",
      assignedBy: "Alice",
      priority: "High",
      due: "2024-04-18",
    },
  ]);
  const [filter, setFilter] = useState("all"); // 'all', 'assignedByMe', 'myTasks'
  const navigate = useNavigate();

  const filteredData = () => {
    if (filter === "all") {
      return data;
    } else if (filter === "assignedByMe") {
      // Assuming tasks not assigned to Alice are assigned by Alice
      return data.filter((task) => task.assignedTo !== "Alice");
    } else if (filter === "myTasks") {
      return data.filter((task) => task.assignedTo === "Alice");
    }
  };

  const handleCreateTask = (newTask) => {
    setData((prevData) => {
      return [...prevData, newTask];
    });

    setModalVisible(false);
  };

  // const handleEditTask = (id) => {
  //     const task = data.find(t => t.id === id);
  //     setSelectedTask(task);
  //     setModalVisible(true);
  // };
  //
  // const handleDeleteTask = (id) => {
  //     setData(data.filter(task => task.id !== id));
  // };

  return (
    <div>
      <div className={"loggedInUser"}>
        <p>Username</p>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Logout
        </Button>
      </div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          sx={{
            backgroundColor: filter === "all" ? "primary.main" : "white",
            color: filter === "all" ? "white" : "primary.main",
          }}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </Button>
        <Button
          sx={{
            backgroundColor:
              filter === "assignedByMe" ? "primary.main" : "white",
            color: filter === "assignedByMe" ? "white" : "primary.main",
          }}
          onClick={() => setFilter("assignedByMe")}
        >
          Assigned By Me
        </Button>
        <Button
          sx={{
            backgroundColor: filter === "myTasks" ? "primary.main" : "white",
            color: filter === "myTasks" ? "white" : "primary.main",
          }}
          onClick={() => setFilter("myTasks")}
        >
          My Tasks
        </Button>
      </ButtonGroup>
      <MyModal visible={modalVisible} setVisible={setModalVisible}>
        <TaskForm create={handleCreateTask} />
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
};

export default HomePage;
