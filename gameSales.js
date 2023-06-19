const uploadFile = document.getElementById('uploadFile');
const outputBox = document.getElementById('outputBox');
const sortTool = document.getElementById('sortTool');
const confirmBtn = document.getElementById('confirm-btn');

const filterSelect = document.getElementById('filterTool');
const sortToolSelect = document.getElementById('sortTool');
const sortTypeSelect = document.getElementById('sortType');

uploadFile.addEventListener('change', () => {
    const fileReader = new FileReader();
    fileReader.readAsText(uploadFile.files[0]);
    fileReader.onload = function () {
        const text = fileReader.result;
        const lines = text.split('\n');
		const header = lines[0];

        createFilter(header);
    }
});

function createFilter(text) {
    //remove any existing entries
    while (sortTool.firstChild) {
        sortTool.removeChild(sortTool.firstChild);
      }

    let headValues = text.split(',')
    for (var ii = 0; ii < headValues.length; ii++) {
        let newOption = document.createElement("option");
        newOption.value = headValues[ii];
        newOption.text = headValues[ii];
        sortTool.appendChild(newOption);
        console.log(headValues[ii]);
    }
}

confirmBtn.addEventListener('click', () => {
    // read file
    const fileReader = new FileReader();
    fileReader.readAsText(uploadFile.files[0]);
    fileReader.onload = function () {
        const text = fileReader.result;

        // parse CSV data into array of objects
        const data = parseCSV(text);

        console.log(data)

        // get sort values
        const sortTool = sortToolSelect.value;
        const sortType = sortTypeSelect.value;

        //negative means a is sorted before b
        //positive means a is sorted after b
        //zero means that a and b are considered equal and their order is not changed

        // sort data based on selected column and sort type
        data.sort((a, b) => {
            const aValue = a[sortTool];
            const bValue = b[sortTool];

            //isNan stands for “is Not a Number”, if variable is not a number, it return true, else return false.
            //.localeCompare method returns sort order -1, 1, or 0 (for sorted before, sorted after, or equal)

            if (isNaN(aValue) || isNaN(bValue)) {
                // sort alphabetically
                if (sortType === 'up') {
                    //sort in ascending order
                    return aValue.localeCompare(bValue);
                } else {
                    //sort in desceneding order
                    return bValue.localeCompare(aValue);
                }
            } else {
                // sort numerically
                if (sortType === 'up') {
                    //sort in ascending order
                    return Number(aValue) - Number(bValue);
                } else {
                    //sort in descending order
                    return Number(bValue) - Number(aValue);
                }
            }
        });

        // create html table from sorted data and display in output box
        const table = createTable(data);
        outputBox.innerHTML = '';
        outputBox.appendChild(table);
    }
});

// made to parse CSV data into an array of objects
function parseCSV(text) {
    const lines = text.split('\n');
    const header = lines[0].split(',');
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      header.forEach((key, index) => {
        obj[key] = values[index];
      });
      //console.log(obj)
      return obj;
    });
    return data;
  }
  
  // make an HTML table from an array of objects
function createTable(data) {
    const header = Object.keys(data[0]);
    const table = document.createElement('table');
    table.setAttribute('id', 'table');  
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // create table header
    const tr = document.createElement('tr');
    header.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    // create table body
    data.forEach(row => {
        const tr = document.createElement('tr');
        header.forEach(key => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}
  

  