import React, {Component} from 'react';
import SuzieCard from './SuzieCard'
import DonaldCard from './DonaldCard'
import MeiLinhCard from './MeiLinhCard';

class ProfileExamples extends Component{

    render = () => {
        return (
        <div>
            <div className="calculator_presentation">
                <div className="calculator_introduction">
                    Voici quelques exemples de profils de risques. Les personnages en question sont bien évidemment fictifs. <br/>
                    "Impact" calcule l'évolution de l'épidémie (en milliers de cas) si tout le monde faisait les mêmes activités que le personnage en question.
                </div>
            </div>
            <br/>

            <SuzieCard/>
            <br/>
            <DonaldCard/>
            <br/>
            <MeiLinhCard/>
        </div>
        )
    }
}

export default ProfileExamples;