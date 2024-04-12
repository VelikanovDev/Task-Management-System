import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({ filter, task, updateTask, deleteTask, changeState }) => {
  return (
    <TableRow key={task._id} align="center">
      {filter !== "assignedByMe" && (
        <TableCell align="center">
          <input
            checked={task.isDone}
            type={"checkbox"}
            disabled={filter === "all"}
            onChange={() =>
              changeState(task._id, { ...task, isDone: !task.isDone })
            }
          />
        </TableCell>
      )}
      <TableCell align="center">{task.description}</TableCell>
      <TableCell align="center">{task.assignedTo}</TableCell>
      <TableCell align="center">{task.assignedBy}</TableCell>
      <TableCell align="center">{task.priority}</TableCell>
      <TableCell align="center">{task.due}</TableCell>
      {filter === "assignedByMe" && (
        <TableCell align="center">
          <IconButton aria-label="edit" onClick={() => updateTask(task)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => deleteTask(task._id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

export default Task;
