import React, { Component, useState } from "react";
import UploadService from "../logic/upload-files.service";
import IPCameraDataService from "../logic/ipcamera.service"
import {FormLabel} from "react-bootstrap";


export default class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ipAddress:""
        };
    }
    componentDidMount() {
        //All previous IPs
    }

    start = () =>{
        const data = {
                ip:this.state.ipAddress,
        };
        console.log(data);

        IPCameraDataService.startSoftware(data)
            .then(()=>{
                        alert('Software Started');
        });
            // .catch(err =>{
            //     switch (err.response.status){
            //         case 404:
            //             alert('video stream is not valid or is not running');
            //             break;
            //         case 417:
            //             alert('error processing the stream');
            //             break;
            //         case 500:
            //             alert('Internal Server Error')
            //             break;
            //     }
            // });
    }
    handleChange = (e) =>{
        this.setState({
            ipAddress:e.target.value
        })
    }
  render() {
      return (
        <div>
         <FormLabel>IP:</FormLabel>
            <input type={"text"} value={this.state.ipAddress} onChange={this.handleChange} id={"ipAddress"}/>
            <button onClick={()=>{this.start();}}>Start</button>
        </div>
      );
  }
}