import React, { Component,useState} from 'react';
import ClientDataService from '../logic/ClientDataService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

// const Example = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
//   );
// };

class assignMeeting extends Component{

  state ={
    currentClient:undefined,
    date:moment().format("DD-MM-YYYY"),
    time: '10:00'
  }
  componentDidMount(){
    this.getClient(this.props.match.params.id);
    
  }

  getClient = (id) =>{
    ClientDataService.getClient(id).then(response => {
      this.setState({
        currentClient: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e)
    });
  }
  handleChange =(date)=>{
    console.log(this.state);
    console.log(date);
    var newDate = moment(date).format("DD-MM-YYYY")
    this.setState({
      date:newDate

    })
    // document.getElementById("date").value=this.state.date;
  }
  handleTime=(time)=>{
    console.log(time);
    var newTime = moment(time).format("HH:mm");
    this.setState({
      time:newTime
    })
  }
  handleSubmit = () =>{
    var date = this.state.date;
    var time = this.state.time;
    var currentClientID = this.state.currentClient.id;
    var data ={
      "date": date,
      "time":time
    }
    ClientDataService.makeAppointment(currentClientID, data)
    .then(res =>{
        // window.location.href='/clients'
        console.log(res);
        this.props.history.push("/clients")
    });


  }

  render(){
    console.log(this.state);
    
    return(
      <div className="createAppointmentHello" >

        

        {
          this.state.currentClient ?
          <div >
            <p>
             Hello
            </p> 

            <div>
             create an appointment for {this.state.currentClient.firstName} {this.state.currentClient.lastName}
            </div>
            <br></br>
            <table className="centerTable">
              <thead>
                <tr>
                  <th>
                    <div className="col-12">
                      <label className="labelAppointment"> <h6 className="margin3">select a date</h6>
                        <DatePicker id="date" autoFocus value={this.state.date} onChange={this.handleChange} />
                      </label>
                    </div>
                  </th>
                  <th>
                    <div className="col-12 createAppointmentDivforInput">
                      <label className="labelAppointment"> <h6 className="margin3"> select a time</h6>
                        <DatePicker showTimeSelect showTimeSelectOnly value={this.state.time} dateFormat="HH:mm" timeIntervals={30} onChange={this.handleTime}></DatePicker>
                  
                      </label>
                    </div>
                  </th>
                </tr>
              </thead>
              
            </table>
              <div className="divButtonAppointment">
                <button className="btn btn-primary btn-lg buttonAppointment" onClick={this.handleSubmit}>
                  Make Appointment
                </button>
              </div>
            </div>
          :
          <h3> ... waiting for client to load</h3>
        }
       
      </div>
    )
  }

}
export default assignMeeting;