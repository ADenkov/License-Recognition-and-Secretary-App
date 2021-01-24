import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ClientDataService from '../logic/client.service';
import moment from 'moment';

class calendarComponent extends Component{

  state={
    date:moment().format("DD-MM-YYYY"),
    appointments:undefined,
    personName:""
  }
  componentDidUpdate(prevState,prevProps){
    if(prevState != this.state || prevProps != this.props){
       prevState = this.state 
    }

  }


  handleChange =(date)=>{
    var newDate = moment(date).format("DD-MM-YYYY")
    console.log(newDate);
    this.setState({
      date:newDate

    });

    ClientDataService.getAppointmentsForDate(this.state.date)
    .then(res =>{
      const appointments = res.data;
      console.log(appointments);
      this.setState({
        appointments:appointments
      })
      console.log(this.props);
    })
    this.forceUpdate();
    
  }
  // getFullNameById =(id) =>{

  //  ClientDataService.getClient(id).then(response => {
  //   console.log(response.data.firstName + " " + response.data.lastName);
  //     this.setState({
  //       personName: response.data.firstName + " " + response.data.lastName
  //     })
      
  // }).catch(e => {
  //   console.log(e);
  // });
  
  // }

  render(){


    return(
      <div>
        <div className="center">
          <center><h3 style={{color:"red"}}>To see the appointments double click a date!</h3></center>
        <table>
            <tbody>
              <tr>
                <td>
                  <Calendar onChange={this.handleChange}/>
                </td>
                <td>
                  
                  <section>
                    {
                      this.state.appointments && this.state.appointments.length>0 ?
                      this.state.appointments.map(app =>
                        app ?
                        <div key={app.id} >

                          <p className="blackFont">
                            Scheduled meeting on {app.date} at {app.time} with {app.personName} 
                          </p>
                        </div>
                        :
                        null
                      )
                      :
                      <p className="blackFont">
                        There are no meetings scheduled for this day.
                      </p>
                      
                    }
                  </section>
                </td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>
    )
  }
}
export default calendarComponent;