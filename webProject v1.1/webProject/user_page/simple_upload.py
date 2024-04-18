import pandas as pd

# Read the CSV file
df = pd.read_csv('test_malay.csv')

# Extract file name without extension from DataFrame's file path
file_name = df._file_path.str.split('/').str[-1].split('.')[0]

# Create HTML content
html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <title>{file_name}</title>
</head>
<body>
    <h1>{file_name}</h1>
    <table border="1">
        <tr>
"""

# Append column names as table headers
for column in df.columns:
    html_content += f"<th>{column}</th>"
html_content += "</tr>"

# Append each row as table data
for _, row in df.iterrows():
    html_content += "<tr>"
    for value in row:
        html_content += f"<td>{value}</td>"
    html_content += "</tr>"

# Close HTML content
html_content += """
    </table>
</body>
</html>
"""

# Write HTML content to file
with open(f"{file_name}.html", "w") as html_file:
    html_file.write(html_content)

print(f"HTML file '{file_name}.html' has been created successfully.")
