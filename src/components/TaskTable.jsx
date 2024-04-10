import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TaskTable = ({tasks}) => {
    return (
        <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 1000, margin: '0 auto'}}>
            <Button
                startIcon={<AddCircleIcon />}
                onClick={() => console.log("add")}
            >
                New Task
            </Button>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">DONE</TableCell>
                        <TableCell align="center">TASK NAME</TableCell>
                        <TableCell align="center">ASSIGNED TO</TableCell>
                        <TableCell align="center">PROGRESS</TableCell>
                        <TableCell align="center">PRIORITY</TableCell>
                        <TableCell align="center">DUE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id} align="center">
                            <TableCell align="center">
                                <input type={"checkbox"}/>
                            </TableCell>
                            <TableCell align="center">{task.name}</TableCell>
                            <TableCell align="center">{task.assignedTo}</TableCell>
                            <TableCell align="center">{task.progress}</TableCell>
                            <TableCell align="center">{task.priority}</TableCell>
                            <TableCell align="center">{task.due}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskTable;