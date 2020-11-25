import React, { Component } from 'react'
import {Link} from "react-router-dom";
import UploadFiles from "../components/upload-files-component"

 class Header extends Component {
    render() {
        return (
            <div>
                
                <nav className="navbar navbar-expand-sm navbar navbar-dark bg-dark">
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
                                    <Link to={"/clients"} className="nav-link">
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
                                <Link to={"/uploadImage"} className="nav-link">
                                Upload Image
                                </Link>
                            </li>
                        </ul>

                        
                        {/*<ul className="navbar-nav">*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <a className="nav-link" href="clientsInfo">*/}
                        {/*            Delete  client*/}
                        {/*        </a>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </nav>
            </div>
        )
    }
}
export default Header;