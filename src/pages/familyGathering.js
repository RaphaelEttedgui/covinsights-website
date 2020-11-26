import React, {Component} from "react";
import Gathering from "../components/FamilyGathering/Gatherer.js";

class FamilyGathering extends Component{
    render = () => {
        return (
            <div>
            <h1>Simulateur de réunion !</h1>
            <Gathering/>
            </div>
        )
    }
}

export default FamilyGathering;