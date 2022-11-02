function getData() {

    let url = "http://127.0.0.1:5500/data/cars.json";

    fetch(url)
        .then(res => {
            if (res.ok) {
                console.log("Great Success!")
            } else {
                updateAlert("There was a problem fetching the data")
            }
            return res.json();
        })
        // .then(response => response.json())
        .then(data => validateData(data))
        .then(data => printTable(data))
        .catch(err => updateAlert("An Error has occured: " + err, "alert-danger"));
}

function validateData(data) {
    if (data.length == 0) {
        updateAlert("The data was empty!", "alert-warning")
    } else {
        updateAlert("We got the data for you!", "alert-primary")
    }

    return data;
}

function updateAlert(text, divClass) {
    alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.classList.add(divClass);
    alertText = document.createTextNode(text);
    alertDiv.appendChild(alertText);

    contentDiv = document.getElementById("content");
    contentDiv.prepend(alertDiv);

}

function printTable(data) {
    //Nasty hack to pull the first div with the class called container.
    // containerDiv = document.getElementsByClassName("container")[0]
    contentDiv = document.getElementById("content");

    var carsTable = document.createElement("table");
    carsTable.id = "carTable";
    carsTable.className = "table table-hover";
    var carTableBody = document.createElement("tbody");

    //Go through all the cars
    for (index = 0; index <= data.length - 1; index++) {

        //Create a row
        var row = document.createElement("tr")

        //Create all the table cells
        var vinCell = document.createElement("td");
        var vinCellText = document.createTextNode(data[index].vin);

        var modelCell = document.createElement("td");
        var modelCellText = document.createTextNode(data[index].model);

        var makeCell = document.createElement("td");
        var makeCellText = document.createTextNode(data[index].make);

        var yearCell = document.createElement("td");
        var yearCellText = document.createTextNode(data[index].year);

        //Attach all the text to the td
        vinCell.appendChild(vinCellText);
        modelCell.appendChild(modelCellText);
        makeCell.appendChild(makeCellText);
        yearCell.appendChild(yearCellText);

        //Attach all the cells
        row.appendChild(vinCell);
        row.appendChild(modelCell);
        row.appendChild(makeCell);
        row.appendChild(yearCell);

        //Append the row to the body
        carTableBody.appendChild(row);
    }

    //Append the body to the table
    carsTable.appendChild(carTableBody);

    //Append the table to the div
    contentDiv.appendChild(carsTable);


}

