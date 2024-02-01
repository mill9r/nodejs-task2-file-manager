

const COLUMNS_DIVIDER = ' | ';
const JOIN_ROWS = '\r\n';

const printTable = (headers, rows) => {
    let columnWidths = calculateColumnsWidths(headers, rows);
    let header = headers.map((header, i) => createCell(header, columnWidths[i])).join(COLUMNS_DIVIDER);
    let headerBottomBorder = printHeaderBottomBorder(header.length);
    let rowsStr = rows.map(row => row.map((cell, i) => createCell(cell, columnWidths[i])).join(COLUMNS_DIVIDER)).join(JOIN_ROWS);
    console.log(header)
    console.log(headerBottomBorder)
    console.log(rowsStr)
}


const calculateColumnsWidths = (header, columns) => {
    return headers.map((header, i) => {
        return Math.max(header.length, ...rows.map(row => row[i].length));
    })
}

const createCell = (content, cellLength) => {
    const str = ''
    return `${content}${str.padStart(cellLength - content.length, ' ')}`
}

const printHeaderBottomBorder = (headerLength) => {
    return ''.padStart(headerLength, '-')
}

export { printTable }
