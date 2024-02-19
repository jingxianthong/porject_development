const fs = require('fs');
const csv = require('csv-parser');

const directory = 'C:/Nginx/porject_development/csv/';

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.csv')) {
      const filePath = directory + file;
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // Assuming the first row contains headers
          if (!convertedToHtml) {
            html += '<tr>';
            Object.keys(row).forEach(header => {
              html += `<th>${header}</th>`;
            });
            html += '</tr>';
            convertedToHtml = true;
          }

          html += '<tr>';
          Object.values(row).forEach(value => {
            html += `<td>${value}</td>`;
          });
          html += '</tr>';
        })
        .on('end', () => {
          console.log(`CSV file ${file} successfully processed.`);
          // Once the CSV is processed, generate HTML
          const outputHtml = `
            <html>
              <head>
                <title>CSV to HTML</title>
              </head>
              <body>
                <h1>${file}</h1>
                <table border="1">
                  ${html}
                </table>
              </body>
            </html>
          `;
          // Write the HTML to a new file
          fs.writeFile(`${filePath}.html`, outputHtml, (err) => {
            if (err) throw err;
            console.log(`HTML file ${file}.html saved.`);
          });
        });
    }
  });
});
