
/*
By Ahmed Al-Ghezi
 */

//import md5 from 'md5-hash'
import PostCSVData from '../DB/postCSV';



function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
                return allText;
            }
        }
    }
    rawFile.send(null);
}


export function toJson(headers, values) {
    /*if(header.length !== values.length)
        return null;

    for (var i = 0; i < header.length; i++) {
        json[header[i]] = values[i];
    }
    return json;*/

    const jsonObj = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
    }, {})

    return jsonObj;
}


export function submitAll(headers, csvMatrixVal){
    for (var i = 0; i < csvMatrixVal.length; i++) {
       const jsonObj = toJson(headers,csvMatrixVal[i]);
       const res = PostCSVData.setPerformanceAthlete(jsonObj);
       //TODO complete the function
    }
}


// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
export function CSVToArray(strData) {
    var  strDelimiter;
    /*var delmArr = [",",";"];
    if(guessDelimiters(strData , delmArr))
        strDelimiter = ",";
    else if(guessDelimiters(strData , ";"))
        strDelimiter = ";";
    else{
        alert("Wornog CSV format. Please provide comma separated-file");
        return null;
    }*/
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = ';';

     strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return ( arrData );
}



function guessDelimiters (text, possibleDelimiters) {
    return possibleDelimiters.filter(weedOut);

    function weedOut (delimiter) {
        var cache = -1;
        return text.split('\n').every(checkLength);

        function checkLength (line) {
            if (!line) {
                return true;
            }

            var length = line.split(delimiter).length;
            if (cache < 0) {
                cache = length;
            }
            return cache === length && length > 1;
        }
    }
}



function getNameColIndex(headerArr) {
    var index = -1;
    for (var i = 0; i < headerArr.length; i++) {
        if(headerArr[i].trim().toUpperCase() === "NAME")
            if(index === -1)
                index = i;
            else {
                alert("More than one 'Name' column detected. Please make sure that there is exactly one column header titled 'name' ");
                return -2;
            }
    }
    return index;
}


function getNameBirthdateIndex(headerArr) {
    var index = -1;
    for (var i = 0; i < headerArr.length; i++) {
        if(headerArr[i].trim().toUpperCase().indexOf("BIRTH") !== -1  || headerArr[i].trim().toUpperCase().indexOf("GEBURTS") !== -1)
            if(index === -1)
                index = i;
            else {
                alert("More than one 'Name' column detected. Please make sure that there is exactly one column header titled 'birth date' ");
                return -2;
            }
    }
    return index;
}


//TODO consider remove or install good package
function generateID(name,birthdate) {
    name = name.trim().replace(" ","");
    birthdate = birthdate.trim().replace(" ","");
    //var namehash = CryptoJS.MD5(name+birthdate).toString();
   // var namehash = md5(name+birthdate);
    //return namehash;
    return "";
}


function replaceID(rowArr, nameIndex,birthDateIndex) {
    if(rowArr[nameIndex] === "" || rowArr[birthDateIndex] === "")
        return "";
    rowArr[nameIndex] = generateID(rowArr[nameIndex],rowArr[birthDateIndex]);
    rowArr[birthDateIndex] = "";
    return rowArr;
}

export function processArr(headerArr, csvArr) {
    var nameIndex = getNameColIndex(headerArr);
    if(nameIndex === -1){
        alert("No column with name is found. Please make sure that there is exactly one column header titled 'name' ");
        return false;
    }
    var birthDateIndex = getNameBirthdateIndex(headerArr);
    if(birthDateIndex === -1){
        alert("No column with birth date is found. Please make sure that there is exactly one column header titled 'birthdate' ");
        return false;
    }
    if(birthDateIndex < 0 || birthDateIndex < 0)
        return false;
    headerArr[nameIndex] = "ID";
    for(var i = 0; i < csvArr.length; i++){
        csvArr[i] = replaceID(csvArr[i], nameIndex,birthDateIndex);
    }
    return true;
}



