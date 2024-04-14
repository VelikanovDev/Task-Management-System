import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import MyModal from "../components/UI/modal/MyModal";
import TaskForm from "../components/TaskForm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskTable from "../components/TaskTable";
import { useNavigate } from "react-router-dom";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../services/TaskService";
import { allUsers, logout } from "../services/UserService";
import { useUser } from "../context/UserProvider";

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    fetchTasks()
      .then((res) => {
        setTasks(res);
        setRefreshTasks(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      });
  }, [refreshTasks]);

  useEffect(() => {
    allUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  const [filter, setFilter] = useState("all"); // 'all', 'assignedByMe', 'myTasks'
  const navigate = useNavigate();

  const filteredData = () => {
    if (filter === "all") {
      return tasks;
    } else if (filter === "assignedByMe") {
      return tasks.filter((task) => task.assignedBy === user.username);
    } else if (filter === "myTasks") {
      return tasks.filter((task) => task.assignedTo === user.username);
    }
  };

  const handleCreateTask = (newTask) => {
    createTask(newTask).then(() => setModalVisible(false));
    setRefreshTasks(true);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then(() => setRefreshTasks(true));
  };

  const handleUpdateTask = (id, task) => {
    updateTask(id, task).then(() => setModalVisible(false));
    setRefreshTasks(true);
  };

  const handleOpenEditModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleLogout = () => {
    logout().then((r) => {
      navigate("/login", { replace: true });
      window.location.reload();
    });
  };

  return (
    <div>
      <div className={"loggedInUser"}>
        <p>{user.username}</p>
        <Button variant="contained" onClick={() => handleLogout()}>
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
        <TaskForm
          create={handleCreateTask}
          update={handleUpdateTask}
          task={selectedTask}
          loggedInUser={user}
          allUsers={users}
        />
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
        <TaskTable
          tasks={filteredData()}
          filter={filter}
          updateTask={handleOpenEditModal}
          deleteTask={handleDeleteTask}
          changeState={handleUpdateTask}
        />
      </header>
    </div>
  );
};

export default HomePage;
