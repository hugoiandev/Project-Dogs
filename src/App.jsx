import React from "react"
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { UserStorage } from "./UserContext"
import User from "./Components/User"
import ProtectedRoute from "./Helper/ProtectedRoute"
import Photo from "./Components/Photo"
import UserProfile from "./Components/User/UserProfile"
import NotFound from "./Components/NotFound"

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className='AppBody'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <ProtectedRoute path='/conta' component={User} />
              <Route path='/foto/:id' component={Photo} />
              <Route path='/perfil/:user' component={UserProfile} />
              <Route path='*' component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
