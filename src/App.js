import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faDice } from '@fortawesome/free-solid-svg-icons'
import Dashboard from './components/Dashboard.jsx'
import Betting from './components/Betting.jsx'
import Testbot from './betbot/testbot.jsx'
import Betbot from './betbot/Betbot'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function handleBet(bet) {
  //console.log("handleBet => ", bet)
}

function handleStop(config) {
  console.log("handleStop => ", config)
}

function handlePause(config) {
  console.log("handlePause => ", config)
}

function handleResume(config) {
  console.log("handleResume => ", config)
}

function handleError(message) {
  console.log("handleError => ", message)
}

const bot = new Testbot({
  baseBet: 10,
  increaseOnLoss: 2,
  resetOnWin: true,
  maxRolls: 10,
  handleBet: handleBet,
  handleStop: handleStop,
  handlePause: handlePause,
  handleResume: handleResume,
  handleError: handleError
});

library.add(faTachometerAlt, faDice)

let PAGES = {
  dashboard: <Dashboard/>,
  betting: <Betting/>
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      page: PAGES.dashboard
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">PrimeDice Bot</a>

          <form className="form-inline">
            <button className="btn btn-outline-success my-2 my-sm-0">Login</button>
          </form>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link active" href="#" onClick={() => this.setState({ page: PAGES.dashboard })}>
                      <FontAwesomeIcon icon="tachometer-alt"/> Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => this.setState({ page: PAGES.betting })}>
                       <FontAwesomeIcon icon="dice"/> Betting
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="col">
              {this.state.page}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App