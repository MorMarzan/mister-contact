import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import './assets/style/main.scss'

// import { store } from './store/store'
import { Home } from './pages/Home.jsx'


export function App() {

  return (
    // <Provider store={store}>
    <Router>
      <section className="main-layout app">
        {/* <AppHeader /> */}
        <main className="main-layout full app">
          <Routes>
            <Route element={<Home />} path="/" />
          </Routes>
        </main>
        {/* <AppFooter /> */}
        {/* <UserMsg /> */}
      </section>
    </Router>
    // </Provider>
  )
}


