const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

/**
 * Reads the student database and parses its content.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<string>} - A promise that resolves with formatted student information.
 */
const countStudents = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = {};
      let totalStudents = 0;

      // Skip the header line
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(',');
        if (line.length >= 4) {
          const field = line[3];
          const name = line[0];

          if (!students[field]) {
            students[field] = [];
          }

          students[field].push(name);
          totalStudents++;
        }
      }

      let result = `Number of students: ${totalStudents}\n`;
      for (const [field, names] of Object.entries(students)) {
        result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      resolve(result.trim());
    });
  });
};

// Define routes
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const databasePath = process.argv[2];
  if (!databasePath) {
    res.status(500).send('Cannot load the database');
    return;
  }

  countStudents(databasePath)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch(() => {
      res.status(500).send('Cannot load the database');
    });
});

// Set the app to listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Export the app
module.exports = app;
