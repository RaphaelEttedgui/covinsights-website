import React, {Component} from "react";
import { NavLink } from 'react-router-dom';

class Home extends Component{
    render(){
        return (
            <NavLink to="/familyGathering/">Family gathering</NavLink>
        )
    }
}

export default Home;