import React from 'react';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';
import Select from "./SelectSport";
import axios from 'axios';

function myDate(){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var strM = JSON.stringify(month);
    var strD = JSON.stringify(date);
    if(strM.length < 2 && strD.length < 2)
    {
        return (year + "-0" + month + "-0" + date);
    }
    else if(strD.length < 2)
    {
        return(year + "-" + month + "-0" + date);
    }
    else if(strM.length < 2)
    {
        return(year + "-0" + month + "-" + date);
    }
    else
    {
        return(year + "-" + month + "-" + date);
    }
}

function myHour(){
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var strH = JSON.stringify(hours);
    var strM = JSON.stringify(min);
    if(strH < 2 && strM <2)
    {
        return ("0" + hours + ":0" + min)
    }
    else if(strH < 2)
    {
        return ("0" + hours + ":" + min)
    }
    else if(strM < 2)
    {
        return (hours + ":0" + min)
    }
    else
    {
        return (hours + ":" + min)
    }
}
// function mySplit(date){
//     //var str = JSON.stringify(date);
//     return date.split('-');
// }

export default class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeNameEvent = this.onChangeNameEvent.bind(this);
        this.onChangedescEvent = this.onChangedescEvent.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeHrStart = this.onChangeHrStart.bind(this);
        this.onChangeHrEnd = this.onChangeHrEnd.bind(this);
        this.onChangeSport = this.onChangeSport.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            nameEvent: "",
            descEvent: "",
            sport: "",
            HourEnd: "",
            HourStart: "",
            startDate: "",
            endDate: "",
            fulldate: "",
            curdate: "",
            curHour:"",
            file: null
        }

    }

    onChangeImage(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    onChangeStartDate(e) {
        this.setState({
            startDate : e.target.value
        });
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
    }
    // onChangeStartDate(e) {
    //     var newD = mySplit(e.target.value);
    //     var start = mySplit(this.state.startDate);
    //     if (newD[0] >= start[0]) {
    //         if(newD[1] > start[1]) {
    //             if(newD[2] <= start[2] || newD[2] === start[2] || newD[2] >= start[2]) {
    //                 this.setState({
    //                     startDate : e.target.value
    //                 });
    //             }
    //             else {
    //                 alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //                 this.setState({
    //                     startDate : myDate()
    //                 });
    //             }   
    //         }
    //         else if(newD[1] === start[1]) {
    //             if(newD[2] >= start[2]) {
    //                 this.setState({
    //                     startDate : e.target.value
    //                 });
    //             } 
    //             else {
    //                 alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //                 this.setState({
    //                     startDate : myDate()
    //                 });
    //             }    
    //         }
    //         else  {
    //             alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //             this.setState({
    //                 startDate : myDate()
    //             });
    //         }
    //     }
    //     else  {
    //         alert("Votre évènement ne peut pas commencer avant aujourd'hui.")
    //         this.setState({
    //             startDate : myDate()
    //         });
    //     }
    // }

    // onChangeEndDate(e) {
    //     var newD = mySplit(e.target.value);
    //     var start = mySplit(this.state.startDate);
    //     if (newD[0] >= start[0]) {
    //         if(newD[1] > start[1]) {
    //             if(newD[2] <= start[2] || newD[2] === start[2] || newD[2] >= start[2]) {
    //                 this.setState({
    //                     endDate : e.target.value
    //                 });
    //             }
    //             else {
    //                 alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //                 this.setState({
    //                     endDate : myDate()
    //                 });
    //             }   
    //         }
    //         else if(newD[1] === start[1]) {
    //             if(newD[2] >= start[2]) {
    //                 this.setState({
    //                     endDate : e.target.value
    //                 });
    //             } 
    //             else {
    //                 alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //                 this.setState({
    //                     endDate : myDate()
    //                 });
    //             }    
    //         }
    //         else  {
    //             alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //             this.setState({
    //                 endDate : myDate()
    //             });
    //         }
    //     }
    //     else  {
    //         alert("La date de fin de l'évènement ne peut pas être inférieure à la date de départ.")
    //         this.setState({
    //             endDate : myDate()
    //         });
    //     }
        
    // }
    onChangeHrStart(e) {
        this.setState({
            HourStart: e.target.value
        });
    }
    onChangeHrEnd(e) {
        this.setState({
            HourEnd: e.target.value
        });
    }
    onChangeNameEvent(e) {
        this.setState({
            nameEvent: e.target.value
        });
    }
    onChangedescEvent(e) {
        this.setState({
            descEvent: e.target.value
        });
    }
    onChangeSport(e) {
        this.setState({
            sport: e.target.value
        });
    }
    componentDidMount(){
        if(localStorage.usertoken===undefined) {
            this.props.history.push("/");
        };

        const token = localStorage.usertoken;
        if(!token){
            this.props.history.push('/login')
        }
        else {
            const decoded = jwt_decode(token);
            this.setState({
                username : decoded.username,
            })
        }
        this.setState({
            endDate: myDate()
        })
        this.setState({
            startDate: myDate()
        })
        this.setState({
            HourEnd: myHour()
        })
        this.setState({
            HourStart: myHour()
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        data.append('file', this.state.file);
        data.append('username', this.state.username);
        data.append('name', this.state.nameEvent);
        data.append('desc', this.state.descEvent);
        data.append('sport', this.state.sport);
        data.append('startDate', this.state.startDate);
        data.append('endDate', this.state.endDate);
        data.append('startHr', this.state.HourStart);
        data.append('endHr', this.state.HourEnd);
        
        axios.post('http://localhost:4242/events/addevent', data)
        .then((response) => {
            console.log(response); 
            this.setState({
                fireRedirect: true
            });   
               
        })
        .catch((error) => {
            console.log(error);

        });
    }
      render() {
        return (
        <div className="traitnoir">
            <div className="container formregister" style={{paddingTop: 30, width: 400, paddingBottom: 60}}>
                <h3 style={{marginTop: 30, textAlign: "center"}} >Créer un évènement :</h3><br/>
                <div style={{marginTop: 50}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label> Nom de l'organisateur : </label>
                            <input className="form-control" name="asso" value={this.state.username} id="orgaName" disabled />
                        </div>
                        <div className="form-group">
                            <label>Nom de l'évènement :  </label>
                            <input id="nameEvent" type="text" className="form-control" minLength="3" maxLength="20" value={this.state.nameEvent} onChange={this.onChangeNameEvent} required/>
                        </div>
                        <div className="form-group">
                            <label>Description de l'évènement : </label>
                            <input id="descEvent" min="100" max="1000" type="textarea" className="form-control" value={this.state.descEvent} onChange={this.onChangedescEvent} required/>
                        </div>
                        <div className="form-group">
                            <label>Image :  </label>
                            <input type="file" className="form-control" onChange={this.onChangeImage}/>
                        </div>
                        <div className="form-group inputdate"  style={{display: 'flex', height: 80 }}>
                            
                            <div>
                             <label>Date de début: </label>
                             <br/>
                             <input type="date" id="startDate" name="startDate"
                                defaultValue={myDate()}
                                onChange={this.onChangeStartDate}
                                min={myDate()}
                                required
                            ></input>
                            </div>

                            <div>
                               <label>Date de fin: </label>
                               <br/>
                              <input type="date" id="endDate" name="endDate"
                                    defaultValue={this.state.startDate}
                                    onChange={this.onChangeEndDate}
                                    min={this.state.startDate}
                                    required
                                   ></input>
                            </div>
                        </div>


                        <div className="form-group inputheure"  style={{display: 'flex', height: 80 }}>
                            <div>
                            <label>Heure de début: </label>
                               <br/>
                              <input type="time" id="HrStart" name="HrStart"
                                  value={this.state.HourStart} onChange={this.onChangeHrStart} required></input>
                            </div>
                            <div>
                              <label>Heure de Fin: </label>
                                 <br/>
                                 <input type="time" id="HrEnd" name="HrEnd"
                                 value= {this.state.HourEnd} onChange={this.onChangeHrEnd} required></input>
                            </div> 
                        </div>


                        <div className="categorie">
                            <Select value={this.state.sport} onChangeSport={this.onChangeSport}></Select>
                        </div>
                        <br/><br/>

                        <div className="form-group" style={{ textAlign: 'center',  }}>
                            <input id="SubmitRegister" type="submit" value="Enregistrer" className="btn btn-dark" style={{width: 150}}/>
                        </div>

                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to='/events' push={true} />}
            </div>
        </div>
        )
    }
}