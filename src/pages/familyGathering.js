import React, {Component} from "react";
import Gathering from "../components/FamilyGathering/Gatherer.js";
import { Helmet } from 'react-helmet'

class FamilyGathering extends Component{

    render = () => {
        return (
            <div>
            <Helmet>
                <title>
                Réunion familiale.
                </title>
            </Helmet>                    
            <div className="calculator_presentation">
            <div className="calculator_introduction">
                <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Simulateur de réunion familiale</span>
                <br/>
                <div style={{marginTop:"1rem", textAlign:"left"}} >
                <ul style={{listStylePosition: 'inside', margin:'15px'}}>
                    <li> Importez votre risque depuis le calculateur</li>
                    <li> Ajoutez les autres membres de la réunion;</li>
                    <li> Précisez les modalités.</li>
                </ul>
                </div>
                </div> 
            </div>
            <Gathering globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;