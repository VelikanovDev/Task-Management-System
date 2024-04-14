import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useUser } from "../context/UserProvider";

const TaskForm = ({ create, update, task, allUsers }) => {
  const initialTaskState = {
    description: "",
    isDone: false,
    assignedTo: "",
    assignedBy: "",
    priority: "",
    due: null,
  };

  const [newTask, setNewTask] = useState(initialTaskState);
  const [inputError, setInputError] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (task) {
      setNewTask({
        description: task.description,
        assignedTo: task.assignedTo,
        assignedBy: task.assignedBy,
        priority: task.priority,
        due: task.due,
      });
    }
  }, [task]);

  const handleDateChange = (newDate) => {
    const formattedDate = newDate ? dayjs(newDate).format("YYYY-MM-DD") : null;
    setNewTask({ ...newTask, due: formattedDate });
  };

  const createOrUpdateTask = (e) => {
    e.preventDefault();

    if (
      !newTask.description ||
      !newTask.assignedTo ||
      !newTask.priority ||
      !newTask.due
    ) {
      setInputError(true);
      return;
    }

    const updatedTask = {
      isDone: false,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      assignedBy: user.username,
      priority: newTask.priority,
      due: newTask.due,
    };

    if (task) {
      update(task._id, updatedTask);
    } else {
      create(updatedTask);
    }

    setNewTask(initialTaskState);
    setInputError(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={createOrUpdateTask}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {inputError && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            Please fill in all fields to add a task
          </div>
        )}
        <div style={{ marginBottom: "10px" }}>
          <TextField
            id="task-description"
            label="Description"
            variant="outlined"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            fullWidth
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Assigned To
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              value={newTask.assignedTo}
              onChange={(e) =>
                setNewTask({ ...newTask, assignedTo: e.target.value })
              }
              label="Priority"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allUsers.map((u) => {
                if (u.username !== user.username) {
                  return (
                    <MenuItem key={u._id} value={u.username}>
                      {u.username}
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Priority
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              label="Priority"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <FormControl variant="outlined" fullWidth>
            <DatePicker
              label="Due Date"
              value={newTask.due ? dayjs(newTask.due) : null}
              onChange={handleDateChange}
              textField={(params) => <TextField {...params} />}
            />
          </FormControl>
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: "20px" }}>
          Send
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default TaskForm;
