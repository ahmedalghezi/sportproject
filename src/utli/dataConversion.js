import moment from "moment";

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
        return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const reformatKey = string => {
  if(string.includes('_')) {
      var parts = string.split('_');
      return parts.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const reformatDate = dateString => {
  return moment.utc(dateString).format("MMM Do, YYYY HH:mm");
}

export const germanDatePresentation = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return day + "." + month + "." + year
}