import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import './assets/style/main.scss'

import { store } from './store/store'
import { Home } from './pages/Home.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'
import { ContactDetails } from './pages/ContactDetails.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ContactEdit } from './pages/ContactEdit.jsx'


export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main className="main-layout full app">
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<ContactIndex />} path="/contact" />
              <Route element={<ContactDetails />} path="/contact/:contactId" />
              <Route element={<ContactEdit />} path="/contact/edit" />
              <Route element={<ContactEdit />} path="/contact/edit/:contactId" />
            </Routes>
          </main>
          {/* <AppFooter /> */}
          {/* <UserMsg /> */}
        </section>
      </Router>
    </Provider>
  )
}


