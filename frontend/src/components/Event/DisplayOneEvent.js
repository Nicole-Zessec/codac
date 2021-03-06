import React, {Component} from 'react';
import axios from 'axios';
import '../Profile/Profile.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import MediaQuery from 'react-responsive';
import L from 'leaflet';
import jwt_decode from 'jwt-decode';
import Comment from '../Comments/tempcomment';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class DisplayOneEvent extends Component {

    constructor(props){
        
        super(props);
        this.state = {
            username:"",
            event: [],
            lon:'', 
            lat:'',
            zoom : 17
        };

        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);

    }

  componentDidMount(){

        if(localStorage.usertoken!==undefined){
            const decoded = jwt_decode(localStorage.usertoken);
            this.setState({username: decoded.username});
        }
        
        axios.get('http://localhost:4242/event/'+this.props.match.params.id)
            .then(response => {
                this.setState({event: response.data});

                axios.get('https://nominatim.openstreetmap.org/search?q='+((this.state.event.address).split(' ').join('+'))+',+'+(this.state.event.city).split(' ').join('+')+'&format=json')
                .then(response => {
                    this.setState({lon : response.data[0].lon});
                    this.setState({lat : response.data[0].lat});
                    
                })
                .catch(function(err) {
                    console.log(err);
                })


            })
            .catch(function(error){
                console.log(error);
            })
        
    }

    deleteEvent(e) {

        axios.delete('http://localhost:4242/event/'+this.state.event._id)
            .then(response => {
                this.props.history.push("/events");
            })
            .catch(function(error){
                console.log(error);
        })
    }

    editEvent(e) {
        this.props.history.push("/editevent/"+this.state.event._id);
    }

    render() {
        const position = [this.state.lat, this.state.lon]
        return (
            <div className="container">
                <div className="jumbotron mt-3">
                    <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <FontAwesomeIcon className="mr-2" style={{color: "#000000", fontSize: "35px"}} icon={ faUserCircle }/>
                                <span className="card-text text-bold">Publié par : {this.state.event.username}</span>
                            </div>
                            <img style={{height: "auto", width:"100%"}} src={this.state.event.image} className="card-image" alt="event" />
                            <div className="card-body">
                                <h5 className="card-text font-weight-bold mb-4">{this.state.event.name}</h5>
                                <p className="card-text">{this.state.event.desc}</p>
                                <div className="card card-header mb-4" style={{borderBottom: "none!important"}}>
                                    <div><FontAwesomeIcon className="mr-2" style={{fontSize: "25px"}} icon={ faMapMarkerAlt }/> {this.state.event.address}</div>
                                    <div>{this.state.event.zipcode} {this.state.event.city}</div>
                                    <hr />
                                    <div><FontAwesomeIcon className="mr-2" style={{color: "#000000", fontSize: "25px"}} icon={ faClock }/> Du {this.state.event.start_date} à {this.state.event.start_time} </div>
                                    <div>au {this.state.event.end_date} à {this.state.event.end_time}</div>
                                </div>
                                {localStorage.usertoken ? <div><button type="button" style={{width:"100px"}} className="btn btn-info mr-3">Soutenir</button><button type="button" style={{width:"100px"}} className="btn btn-primary">Participer</button></div> : <div></div>} 
                                {this.state.event.username===this.state.username ? <div><button type="button" onClick={this.deleteEvent} style={{width:"100px"}} className="btn btn-danger mr-3 mt-3">Effacer</button><button type="button" onClick={this.editEvent} style={{width:"100px"}} className="btn btn-secondary mr-3 mt-3">Editer</button></div> : <div></div>}
                            </div>
                        </div>
                        </div>

                        <div className="col-lg-8">
                        
                            <MediaQuery query="(max-width: 991px)">
                                <Map className="map mt-3" style={{width:'100%',height: '500px'}} center={position} zoom={this.state.zoom}>
                                    <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    />
                                    <Marker position={position}>
                                    <Popup>
                                        <span>Votre point de RDV Sport E-vent</span>
                                    </Popup>
                                    </Marker>
                                </Map>
                            </MediaQuery>
                            <MediaQuery query="(min-width: 992px)">
                                <Map className="map" style={{width:'100%',height: '100%'}} center={position} zoom={this.state.zoom}>
                                    <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    />
                                    <Marker position={position}>
                                    <Popup>
                                        <span>Votre point de RDV Sport E-vent</span>
                                    </Popup>
                                    </Marker>
                                </Map>
                            </MediaQuery>
                        </div>
                    
                </div>
                <Comment id = {this.props.match.params.id} eventUsername = {this.state.event.username}></Comment>
            </div>
        </div>
        )
    }
}