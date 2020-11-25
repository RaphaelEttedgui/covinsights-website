import React, {Component} from "react";
import { NavLink } from 'react-router-dom';

class Home extends Component{
    render(){
        return (
            <div className="home_container">
                Try our calculator : 
            <NavLink to="/calculator/">Calculator</NavLink>
            </div>
        )
    }
}

export default Home;