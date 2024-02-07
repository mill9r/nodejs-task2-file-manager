const printTable = (rows) => {
    console.table(rows)
}

const printCurrentDir = (path) => {
    console.log(`You are currently in $ ${path}`)
}


const printWelcomeMessage = (user) => {
    console.log(`Welcome to the File Manager, ${user}!`)
}

const printGoodBuyMessage = user => console.log(`Thank you for using File Manager, ${user}, goodbye!`)


function DirContentPattern(col1, col2) {
    this.Name = col1;
    this.Type = col2;
}


export {printTable, DirContentPattern, printWelcomeMessage, printGoodBuyMessage, printCurrentDir}
