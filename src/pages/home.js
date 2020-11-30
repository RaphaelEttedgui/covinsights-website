import React, {Component} from "react";
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet'

class Home extends Component{
    render(){
        return (
            <div className="home_container">
                <Helmet>
                    <title>
                    Covimpact - Accueil
                    </title>
                </Helmet>                    
                Try our calculator : 
            <NavLink to="/calculator/">Calculator</NavLink>
            </div>
        )
    }
}

export default Home;