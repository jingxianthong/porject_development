const csvFilePath = "fruit data.csv"; // Replace with the path to your CSV file

function readCSV() {
    fetch(csvFilePath)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n');
            const columns = rows[0].split(',');
            const table = document.createElement('table');
            const tableBody = document.createElement('tbody');

            // Create table header row
            const headerRow = document.createElement('tr');
            for (const column of columns) {
                const headerCell = document.createElement('th');
                headerCell.textContent = column;
                headerRow.appendChild(headerCell);
            }
            tableBody.appendChild(headerRow);

            // Create data rows
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].split(',');
                const dataRow = document.createElement('tr');
                for (let j = 0; j < cells.length; j++) {
                    const dataCell = document.createElement('td');
                    dataCell.textContent = cells[j].trim(); // Trim potential leading/trailing spaces
                    dataRow.appendChild(dataCell);
                }
                tableBody.appendChild(dataRow);
            }

            table.appendChild(tableBody);
            document.getElementById('table-container').appendChild(table);
        })
        .catch(error => {
            console.error('Error reading CSV:', error);
            // Handle errors gracefully, e.g., display an error message to the user
        });
}

readCSV();
