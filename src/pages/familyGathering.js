import React, {Component} from "react";
import Gathering from "../components/FamilyGathering/Gatherer.js";
import { Helmet } from 'react-helmet'
import {BasicUniverse} from '../components/Calculator/NewMath.js'

class FamilyGathering extends Component{

    constructor(props){
        super(props);
        this.state = {universe:new BasicUniverse()}
    }


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
                Entrez les membres de la réunion familiale. Vous pouvez également entrer votre profil de risque plus précis dans le calculateur de risque, et l'importer ensuite ici.
                En guise de comparaison pour le risque, la prévalence est actuellement d'environ {Math.round(this.state.universe.prevalence * 10000) /100} %
                <br />
                Vous pouvez ensuite calculer le bilan à l'échelle de la France si tout le monde choisit de faire ce type de réunions familiales.
                </div>                
            </div>
            <Gathering globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;