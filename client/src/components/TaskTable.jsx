import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskTable = ({ tasks, filter, deleteTask }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: 650, maxWidth: 1000, margin: "0 auto" }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {filter !== "assignedByMe" && (
              <TableCell align="center">DONE</TableCell>
            )}
            <TableCell align="center">TASK DESCRIPTION</TableCell>
            <TableCell align="center">ASSIGNED TO</TableCell>
            <TableCell align="center">ASSIGNED BY</TableCell>
            <TableCell align="center">PRIORITY</TableCell>
            <TableCell align="center">DUE</TableCell>
            {filter === "assignedByMe" && (
              <TableCell align="center">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id} align="center">
              {filter !== "assignedByMe" && (
                <TableCell align="center">
                  <input type={"checkbox"} disabled={filter === "all"} />
                </TableCell>
              )}
              <TableCell align="center">{task.description}</TableCell>
              <TableCell align="center">{task.assignedTo}</TableCell>
              <TableCell align="center">{task.assignedBy}</TableCell>
              <TableCell align="center">{task.priority}</TableCell>
              <TableCell align="center">{task.due}</TableCell>
              {filter === "assignedByMe" && (
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    onClick={() => console.log("Edit btn")}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
