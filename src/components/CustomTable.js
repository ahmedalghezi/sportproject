import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { visuallyHidden } from '@mui/utils';
import SpecialRow from './SpecialRow';
import { getComparator, reformatDate, stableSort } from '../utli/dataConversion.js';
import './customTable.css';

const chartIcon = (clickHandle) => {
  return (<Tooltip title="Show as Chart">
  <IconButton onClick={clickHandle}>
    <StackedLineChartIcon />
  </IconButton>
</Tooltip>);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.filter(headCell => headCell.tableView).map((headCell) => (
          <TableCell
            key={'headcell' + headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function CustomTable(props) {
  const {rows, toggleChartView, headCells, title, statsSection, hasSpecialRow, dense, hasChartRepresentation} = props;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [clickedRow, setClickedRow] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = index => {
    if(index === clickedRow) {
      setClickedRow(null);
    } else {
      setClickedRow(index);
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <><Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
    </Toolbar>
    {statsSection}
    </>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <React.Fragment key={'row-wrapper' + index}><TableRow
                      hover
                      key={'row' + index}
                      role="checkbox"
                      tabIndex={-1}
                      style={{backgroundColor: clickedRow !== index ? '#fff' : '#eee'}}
                      className="table-row"
                    >
                      {headCells.map(el => {
                        return !(el.tableView) ? '' : 
                          <TableCell 
                            align={'left'}
                            key={"row-element-" + el.id + "-idx" + index}
                            onClick={() => handleRowClick(index)}
                            >
                              {el.id != 'date' ? row[el.id] : reformatDate(row[el.id])}
                          </TableCell>; 
                      })
                      }
                      {hasChartRepresentation && <TableCell align={'center'}>
                        {chartIcon(() => toggleChartView(row.name))}
                      </TableCell>}
                    </TableRow>
                    {hasSpecialRow && <TableRow 
                      key={'special-row' + index}
                      className="table-row-srow"
                      >  
                        <TableCell colSpan={6} style={clickedRow === index ? {} : { display: 'none'}}>
                          <SpecialRow 
                            handleCloseSpecialRow={() => {
                              setClickedRow(null);
                            }}
                            data={row}
                          />
                        </TableCell>
                    </TableRow>}
                  </React.Fragment>);
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
