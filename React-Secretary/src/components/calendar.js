import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ClientDataService from '../logic/ClientDataService';
import moment from 'moment';

class calendar extends Component{

  state={
    date:moment().format("DD-MM-YYYY"),
    appointments:undefined
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
    })
  }
  componentDidUpdate(){
 
  }

  render(){

    return(
      <div>
        <div className="center">
        <table>
            <tbody>
              <tr>
                <td>
                  <Calendar onChange={this.handleChange}></Calendar>
                </td>
                <td>
                  <section>
                    {
                      this.state.appointments ?
                      this.state.appointments.map(app =>
                        app ?
                        <div>
                          <p className="blackFont">
                            Sceduled meeting at {app.time} with {app.id}
                          </p>
                        </div>
                        :null
                      )
                      :
                      <p className="blackFont">
                        There are no meetings scheduled for this day
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
export default calendar;