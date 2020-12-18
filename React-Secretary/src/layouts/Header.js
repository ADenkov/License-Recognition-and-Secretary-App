import React, { Component } from 'react'
import {Link} from "react-router-dom";
import UploadFiles from "../components/upload-files-component"

 class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar navbar-light bg-white">
                <div className="container">
                <a className="navbar-brand" href="/registerClient">
          <img className="imglogo" src="images/sioux.png" alt=""/>
              </a>
                    <a className="navbar-brand" href="/registerClient">
                       Secretary App
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
        
                    <div className="collapse navbar-collapse" id="mobile-nav">

                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                    <Link id="clients"to={"/clients"} className="nav-link">
                                        Clients
                                    </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/registerClient"} className="nav-link">
                                    Register Client
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link id="uploadImage"to={"/uploadImage"} className="nav-link">
                                Upload
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/calendar"} className="nav-link">
                                Calendar
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
                <hr style={{backgroundColor:"#6aa5b3", height:"4vh"}}/>
            </div>
        )
    }
}
export default Header;