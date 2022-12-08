import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(<App />)

/** The code below is how to render in React 17 and below: */
// import React from 'react'
// import { render } from 'react-dom'
// import App from './App'

// render(<App />, document.getElementById('root'))
