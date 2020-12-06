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
                <h2>
                 Bienvenue dans le simulateur de réunion familiale !
                </h2>
                <div className="calculator_introduction">
                <span style={{fontWeight:"bold"}}>Ma réunion familiale est-elle dangereuse ?</span>
                <br/>
                <div style={{marginTop:"1rem"}}>
                Importez votre profil de risque depuis le calculateur, et entrez les membres de la réunion familiale.
                Quel sera le bilan à l'échelle de la France si toutes les réunions se font comme celle-là ?
                </div>          
                </div>      
            </div>
            <Gathering globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;