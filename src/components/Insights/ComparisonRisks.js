import React, {Component} from 'react';
import list_activities from '../constants/activities.js';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell, Scatter, Label, ResponsiveContainer} from 'recharts';
import { CustomActivity, NonWorkerRiskProfile, WorkerRiskProfile, RiskProfile, BasicUniverse} from '../Calculator/NewMath.js';
import Grid from '@material-ui/core/Grid'

class ComparisonRisk extends Component{
    constructor(props){
        super(props);
        this.state = {actis:[], universe:new BasicUniverse()};
    }

    componentDidMount = () => {
        var myActis = this.state.actis;
        for(var i=0; i<list_activities.length; i++){
            var current = list_activities[i];
            var profile = new RiskProfile();
            if(current.riskProfile == "worker")
            {
                profile = new WorkerRiskProfile();
            }
            if(current.riskProfile == "nonWorker")
            {
                profile = new NonWorkerRiskProfile();
            }
            var a = new CustomActivity(current.name, current.duration, current.nbPeople, current.wearMask, current.nbMasked/current.nbPeople, current.talking, current.location, current.distance, profile);
            var myActi = a.getRisk();
            var myRisk = myActi[0] * this.state.universe.prevalence;
            // Handle duration
            var composedRisk = 1 - Math.pow((1-myRisk),myActi[1])*(1-myRisk*myActi[2]/60);
            // We hardcap the risk from one single person to the household value, 0.5.
			if(composedRisk>0.5){
				composedRisk=0.5;
			}
            // Handle nb people
            var totalRisk = 1-Math.pow((1-composedRisk), myActi[3]);
            // Do that for one year
            totalRisk = 1-Math.pow((1-totalRisk),52);
            myActis.push({name:current.name, risk:Math.round(totalRisk*10000000)/100000}); // En pourcentage
        }
        myActis.sort((a, b) => (a.risk > b.risk) ? 1 : -1);
        this.setState({actis:myActis});
        //console.log(myActis)
    }

    computeFill = (risk) => {
        // Seuils de risque (1 an) : 0.5%, 
        if(risk<0.5)
        {
            return "#82ca9d"
        }
        if(risk>0.5 && risk<3)
        {
            return "#F8E716";
        }
        if(risk>3 && risk <10)
        {
            return 'orange';
        }
        else{
            return 'red';
        }
    }

    render = () => {
        return (
            <div style={{textAlign:"center", alignItems:"center"}}>
            <div className="recharts_wrapper">
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{ top: 20, right:15, bottom: 10, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="risk" type="number" domain={['dataMin', 'dataMax']} scale="log" ticks={ [0.5, 3, 10] }>
                    <Label value="(log)" position='right' offset={-20} />
                </XAxis>
                <YAxis dataKey="name" type='category' interval={5} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.state.actis} fill={"#82ca9d"}>
                {
                    this.state.actis.map((entry, index) => {
                        return <Cell key={`cell-${index}`} fill={this.computeFill(entry.risk)} />
                    })
                }
                </Scatter>
            </ScatterChart>
            </ResponsiveContainer>
            </div>    
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                    <span className="green-dot"></span> risque {"< 0.5"} % sur un an.
                </Grid>
                <Grid item>
                    <span className="yellow-dot"></span> entre {"0.5"} et {"3"}%
                </Grid>
                <Grid item>
                    <span className="orange-dot"></span> entre {"3"} et {"10"}%
                </Grid>
                <Grid item>
                    <span className="red-dot"></span> {">10"} %
                </Grid>
            </Grid>
            <div className="explanation_test">
          Pour réduire votre risque, ne pratiquez les activités les plus risquées que ponctuellement, et uniquement avec des personnes surveillant leur risque.
            </div>
            <br/><br/><br/>
            <div className="disclaimer">
            <h3>Disclaimer</h3>
            Ce site n'a pas fait l'objet d'un processus de revue par des pairs, et représente donc
            uniquement les estimations des auteurs étant donné les connaissances à leur disposition. Nous ne sommes en aucun cas des experts de ce sujet, même si nous avons lu beaucoup de papiers d'experts. Ceci n'est pas une source primaire d'information
            sur le COVID. N'utilisez pas les outils de ce site pour prendre des décisions médicales. Continuez à suivre les recommandations du gouvernement.
            </div> 
            </div>
        )
    }
}

export default ComparisonRisk;