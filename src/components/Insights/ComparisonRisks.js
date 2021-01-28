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
            //totalRisk = 1-Math.pow((1-totalRisk),52);
            myActis.push({name:current.name, risk:Math.round(totalRisk*10000000)/10000}); // En pour-mille
        }
        myActis.sort((a, b) => (a.risk > b.risk) ? 1 : -1);
        this.setState({actis:myActis});
        //console.log(myActis)
    }

    computeFill = (risk) => {
        // Seuils de risque (1 an) : 0.5%, 
        if(risk<0.05)
        {
            return "#82ca9d"
        }
        if(risk>0.05 && risk<0.3)
        {
            return "#F8E716";
        }
        if(risk>0.3 && risk <1.5)
        {
            return 'orange';
        }
        else{
            return 'red';
        }
    }

    render = () => {
        return (
        <div>
            <div className="calculator_presentation">
                <div className="calculator_introduction">
                    <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Activités classées par risque</span>
                    <br/>
                    <div style={{marginTop:"1rem", textAlign:"left"}} >
                    Chiffres exprimés en pour mille (estimation du nombre de transmissions si l'activité est effectuée mille fois).
                    <br/>
                    L'échelle de l'axe horizontal est logarithmique.
                    </div>
                </div>        
            </div>
            <div style={{textAlign:"center", alignItems:"center"}}>    
            <div className="recharts_wrapper">
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                margin={{ top: 20, right:15, bottom: 10, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="risk" type="number" domain={['dataMin', 'dataMax']} scale="log" ticks={ [0.01, 0.3, 1.5] }>
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
                    <span className="green-dot"></span> risque {"< 0.05"} &permil;
                </Grid>
                <Grid item>
                    <span className="yellow-dot"></span> entre {"0.05"} et {"0.3"} &permil;
                </Grid>
                <Grid item>
                    <span className="orange-dot"></span> entre {"0.3"} et {"1.5"} &permil;
                </Grid>
                <Grid item>
                    <span className="red-dot"></span> {">1.5"} &permil;
                </Grid>
            </Grid>
            <div className="explanation_test">
          Pour réduire votre risque, ne pratiquez les activités les plus risquées que ponctuellement, et uniquement avec des personnes surveillant leur risque.
            </div>
            </div>
        </div>
        )
    }
}

export default ComparisonRisk;