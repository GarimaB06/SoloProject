const { app, BrowserWindow } = require('electron')
const { url } = require('url')
const path = require('path')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 750,
    backgroundColor: 'white',
    webPreferences: {
      preload: path.join(__dirname, './public/bundle.js'),
      sandbox: false,
    },
  })
  console.log(process.env)
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:8080`)
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '/main'),
        protocol: 'file:',
        slashes: true,
      }),
    )
  }
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
