import { Link } from "react-router-dom";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useDebugValue } from "react";

const UserTable = ({ users }) => {
  return (
    <Box
      sx={{
        width: "50%",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Number of Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
