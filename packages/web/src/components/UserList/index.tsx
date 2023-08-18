import * as React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import DeleteUserButton from 'components/DeleteUserButton/index.ee';
import ListLoader from 'components/ListLoader';
import useUsers from 'hooks/useUsers';
import useFormatMessage from 'hooks/useFormatMessage';
import * as URLS from 'config/urls';
import TablePaginationActions from './TablePaginationActions';

export default function UserList(): React.ReactElement {
  const formatMessage = useFormatMessage();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { users, pageInfo, loading } = useUsers(page, rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary', fontWeight: 700 }}
                >
                  {formatMessage('userList.fullName')}
                </Typography>
              </TableCell>

              <TableCell component="th">
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary', fontWeight: 700 }}
                >
                  {formatMessage('userList.email')}
                </Typography>
              </TableCell>

              <TableCell component="th">
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'text.secondary', fontWeight: 700 }}
                >
                  {formatMessage('userList.role')}
                </Typography>
              </TableCell>

              <TableCell component="th" />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <ListLoader rowsNumber={3} columnsNumber={2} />}
            {!loading &&
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">
                    <Typography variant="subtitle2">{user.fullName}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2">{user.email}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2">
                      {user.role.name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" gap={1} justifyContent="right">
                      <IconButton
                        size="small"
                        component={Link}
                        to={URLS.USER(user.id)}
                      >
                        <EditIcon />
                      </IconButton>

                      <DeleteUserButton userId={user.id} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {pageInfo && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  page={page}
                  count={pageInfo.totalPages}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                    '& .MuiTablePagination-selectLabel': {
                      fontWeight: 400,
                      fontSize: 14,
                    },
                    '& .MuiTablePagination-displayedRows': {
                      fontWeight: 400,
                      fontSize: 14,
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
