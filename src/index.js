'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

// Validar si estamos en el entorno de desarrollo
if (process.env.NODE_ENV === 'development') {
  devtools()
}

// Imprimiendo un mensaje en consola antes de salir
app.on('before-quit', () => {
  console.log('Saliendo...')
})

// Ejecutando ordenes cuando la aplicación está lista
app.on('ready', () => {
  // Creando una ueva ventana
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hello world',
    center: true,
    maximizable: true,
    show: false,
    frame: false
  })

  // Esperar a que el contenido esté listo para mostrar
  win.once('ready-to-show', () => {
    win.maximize()
    win.setMenuBarVisibility(false)
    win.show()
  })

  // Detectando el cierre de la ventana para cerrar el aplicativo
  win.on('close', () => {
    win = null
    app.quit()
  })
  
  win.loadURL(`file://${__dirname}/renderer/index.html`)
})
