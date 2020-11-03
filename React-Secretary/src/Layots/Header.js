import React, { Component } from 'react'

 class Header extends Component {
    render() {
        return (
            <div>
                
                <nav className="navbar navbar-expand-sm navbar navbar-dark bg-dark">
                <div className="container">
                <a class="navbar-brand" href="/dashboard">
          <img class="imglogo" src="images/sioux.png" alt=""/>
              </a>
                    <a className="navbar-brand" href="../logic/Dashboard.js">
                       Sioux secretary
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
        
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="registerClient">
                                    Register client
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <a className="nav-link" href="updateClient">
                                    Update  client
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="clientsInfo">
                                    Delete  client
                                </a>
                            </li>
                        </ul>
        
                      
                    </div>
                </div>
            </nav>
            </div>
        )
    }
}
export default Header;