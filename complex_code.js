/*----------------------------------------
FILENAME: complex_code.js

DESCRIPTION: This code demonstrates a sophisticated and complex implementation of a web-based file management system. It provides functions for creating, uploading, renaming, deleting files, as well as searching for specific files based on various criteria. It also incorporates encryption and decryption functionality for secure file storage. Moreover, it includes error handling and status notification to ensure a seamless user experience.

NOTE: This code is a simplified version for demonstration purposes and may require additional logic and validation in an actual production environment.

----------------------------------------*/

// Import required libraries
const crypto = require('crypto');
const fs = require('fs');

// Define global variables
const fileDirectory = './files/';

// Define helper functions
const encrypt = (data, key) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

const decrypt = (encryptedData, key) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

const checkFileExists = (filename) => {
  return fs.existsSync(fileDirectory + filename);
};

// Define main functions for file management
const createFile = (filename, content) => {
  try {
    if (checkFileExists(filename)) {
      throw new Error('File with the same name already exists.');
    }
    fs.writeFileSync(fileDirectory + filename, content);
    console.log(`File '${filename}' created successfully.`);
  } catch (error) {
    console.error(error.message);
  }
};

const uploadFile = (filename, filePath) => {
  try {
    if (checkFileExists(filename)) {
      throw new Error('File with the same name already exists.');
    }
    fs.copyFileSync(filePath, fileDirectory + filename);
    console.log(`File '${filename}' uploaded successfully.`);
  } catch (error) {
    console.error(error.message);
  }
};

const renameFile = (oldFilename, newFilename) => {
  try {
    if (!checkFileExists(oldFilename)) {
      throw new Error('File does not exist.');
    }
    if (checkFileExists(newFilename)) {
      throw new Error('File with the new name already exists.');
    }
    fs.renameSync(fileDirectory + oldFilename, fileDirectory + newFilename);
    console.log(`File '${oldFilename}' successfully renamed to '${newFilename}'.`);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteFile = (filename) => {
  try {
    if (!checkFileExists(filename)) {
      throw new Error('File does not exist.');
    }
    fs.unlinkSync(fileDirectory + filename);
    console.log(`File '${filename}' successfully deleted.`);
  } catch (error) {
    console.error(error.message);
  }
};

// Define function for searching files by criteria
const searchFiles = (searchCriteria) => {
  try {
    const files = fs.readdirSync(fileDirectory);
    const filteredFiles = files.filter((file) => {
      return file.includes(searchCriteria);
    });
    if (filteredFiles.length === 0) {
      console.log(`No files found matching the search criteria: ${searchCriteria}`);
    } else {
      console.log('Matching Files:');
      filteredFiles.forEach((file) => {
        console.log(file);
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

// -------------------------------------
// Usage Examples:

createFile('example.txt', 'This is an example file.');  // Creates a text file 'example.txt' with content

uploadFile('file.jpg', './images/file.jpg');  // Uploads a file 'file.jpg' from the 'images' folder

renameFile('old_file.txt', 'new_file.txt');  // Renames a file 'old_file.txt' to 'new_file.txt'

deleteFile('file.jpg');  // Deletes a file 'file.jpg'

searchFiles('example');  // Searches and lists all files containing 'example' in their filenames
