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
                    <li> Importez votre profil de risque depuis le calculateur, ou entrez-le directement ci-dessous;</li>
                    <li> Ajoutez les autres membres de la réunion familiale, si vous portez des masques, et la durée de la réunion;</li>
                    <li> Calculez le bilan à l'échelle de la France si toutes les réunions se passent comme la vôtre.</li>
                </ul>
                Notez qu'il s'agit d'une estimation très générique, ne prenant pas en compte d'éventuels problèmes de santé chez des membres de votre famille. Les détails du calcul
                sont disponibles dans la section "A propos".
                </div>
                </div> 
            </div>
            <Gathering globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;