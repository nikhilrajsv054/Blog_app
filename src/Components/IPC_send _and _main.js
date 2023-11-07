const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadFile('index.html');

  // Open DevTools (only in development mode)
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('file-upload', async (event, filePath) => {
  try {
    // Open a dialog to specify the destination directory for the uploaded file
    const { filePath: savePath } = await dialog.showSaveDialog(mainWindow, {
      defaultPath: `uploaded_${Date.now()}.jpg`,
    });

    if (!savePath) {
      event.reply('file-upload-error', 'Save dialog canceled by user');
      return;
    }

    // Copy the file to the specified destination
    fs.copyFile(filePath, savePath, (err) => {
      if (err) {
        event.reply('file-upload-error', err.message);
      } else {
        event.reply('file-upload-success', savePath);
      }
    });
  } catch (error) {
    event.reply('file-upload-error', error.message);
  }
});


import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const filePath = event.target.files[0].path;
    setSelectedFile(filePath);

    ipcRenderer.send('file-upload', filePath);
  };

  useEffect(() => {
    ipcRenderer.on('file-upload-success', (event, filePath) => {
      setUploadStatus(`File uploaded successfully: ${filePath}`);
    });

    ipcRenderer.on('file-upload-error', (event, errorMessage) => {
      setUploadStatus(`File upload error: ${errorMessage}`);
    });

    return () => {
      ipcRenderer.removeAllListeners('file-upload-success');
      ipcRenderer.removeAllListeners('file-upload-error');
    };
  }, []);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && <img src={selectedFile} alt="Selected" />}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default ImageUpload;


<script>
  if (window.require) {
    window.require = null;
  }
</script>
