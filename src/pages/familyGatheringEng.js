import React, {Component} from "react";
import GatheringEng from "../components/FamilyGathering/GathererEng.js";
import { Helmet } from 'react-helmet'

class FamilyGathering extends Component{


    render = () => {
        return (
            <div>
            <Helmet>
                <title>
                Family Gathering
                </title>
            </Helmet>                    
            <div className="calculator_presentation">
                <div className="calculator_introduction">
                <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Family gathering simulator</span>
                <br/>
                <div style={{marginTop:"1rem", textAlign:"left"}} >
                <ul style={{listStylePosition: 'inside', margin:'15px'}}>
                    <li> Import your risk from the calculator, or enter it directly below;</li>
                    <li> Add the other members of the gathering, the duration, and whether you will wear masks;</li>
                    <li> Compute the outcome if all family gatherings are like yours.</li>
                </ul>
                More details available in the "About" section. Note that this estimation is very generic, and does not take into account any health issues that some
                family members may have.
                </div>
                </div>
            </div>
            <GatheringEng globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;