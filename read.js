let file = document.getElementById('js-file-input')
let selectedFile = document.getElementById('js-file-name')
file.addEventListener('change', importFile);

const TARGET_VALUE = 'Net Amount';
const NEW_HEADER = 'New Header';

function importFile(evt) {
    let f = evt.target.files[0];
    
    if (f) {
        let r = new FileReader();
        r.onload = e => {
            let contents = processExcel(e.target.result);
            selectedFile.textContent = f.name;
            writeToExcelFile(contents, f.name);
        }
        r.readAsBinaryString(f);
    } else {
        console.log("Failed to load file");
    }
}

function processExcel(data) {
    let workbook = XLSX.read(data, {
        type: 'binary'
    });

    let result = to_json(workbook);
    return result;
};

function to_json(workbook) {
    let result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1
        });
        if (roa.length) result[sheetName] = roa;
    });
    return result;
};

function formatContent(jsonContent) {
    let data = [];

    for (let key in jsonContent) {
        let list = jsonContent[key];

        let header = list[0].filter((elem) => elem.trim() !== '');

        for (let i = 1; i < list.length; ++i) {
            let line = list[i];
            let obj = {};
            let previous = '';
            if (line[0][0] === '8') {
                previous = line[0].substr(0,10);
            }
            for (let j = 0; j < header.length; ++j) {
                if (j === 1) {
                    obj[NEW_HEADER] = previous; 
                }    

                let k = header[j];
                let v = line[j];
                obj[k] = v;
            }
            data.push(obj);    
        }
        data.sort(compare);
    }

    return addNewLine(data);
}

function addNewLine(data) {
    let result = [];
    let previous = data[0][TARGET_VALUE];
    for (let i = 0; i < data.length; ++i) {
        if (previous < 0 && data[i][TARGET_VALUE] >= 0) {
            result.push({})
        } else {
            result.push(data[i]);
        }
        previous = data[i][TARGET_VALUE]
    }

    return result;
}

function compare(a, b) {
    let comparison = 0;
    if (a[TARGET_VALUE] > b[TARGET_VALUE]) {
        comparison = 1; 
    } else if (a[TARGET_VALUE] < b[TARGET_VALUE]) {
        comparison = -1;
    }

    return comparison;
}

function writeToExcelFile(jsonContent, fileName) {
    data = formatContent(jsonContent)
   
    /* make the worksheet */
    var ws = XLSX.utils.json_to_sheet(data);
    
    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tratado");

    /* generate an XLSX file */
    XLSX.writeFile(wb, "New "+fileName);
}


