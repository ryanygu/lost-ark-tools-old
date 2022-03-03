import React from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@material-ui/core'


const Leaderboards = () => {

  const users = useSelector(state => state.users)

  if (!users ) {
    return null
  }

  else return (
    <Container>
      <h1 align='center'>Leaderboards</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#42a5f5' }}>
            <TableRow>
              <TableCell align='center'>User</TableCell>
              <TableCell align='center'>Engraving attempts</TableCell>
            </TableRow>
          </TableHead>

          <TableBody style={{ backgroundColor: '#e3f2fd' }}>
            {users.map(user =>
              <TableRow key={user.id} >
                <TableCell align='center' >
                  {user.name}
                </TableCell>
                <TableCell align='center'>{user.engravings.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Leaderboards
