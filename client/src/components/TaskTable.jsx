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
import Task from "./Task";

const TaskTable = ({ tasks, filter, updateTask, deleteTask, changeState }) => {
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
            <Task
              filter={filter}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
              changeState={changeState}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
