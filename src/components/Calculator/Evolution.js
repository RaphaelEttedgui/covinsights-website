import React, { Component } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label} from 'recharts';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";

var rk4 = require('ode-rk4');   

class EpidemySimulator{
	// Estimation of the incubation period to 5days : 
	// https://www.acpjournals.org/doi/full/10.7326/M20-0504
	// Estimation of the infectious period to 3 days
	// https://www.medrxiv.org/content/medrxiv/early/2020/01/28/2020.01.23.20018549.full.pdf
	// https://gabgoh.github.io/COVID/index.html
	constructor(riskList, gamma=0.333, alpha=0.2, N=66000000, E0 = 20000, I0=20000, tmax=30, R0=15000000){
		this.riskList = riskList;
		this.gamma = gamma;
		console.log(this.gamma)
		this.number_people = N;
		this.I0 = I0;
		this.tmax = tmax;
		this.R0 = R0;
		this.alpha = alpha;
	}
	
	copy(x) {
		return Object.assign({},x)
	}
	
	sir(dydt, y, t){
		var prevalence = y[2] / this.number_people; // Proportion d'infectés
		var riskPerson = 1; // Will contain the probability that one individual becomes contaminated.
		for (var i=0; i<this.riskList.length; i++)
		{
			var myActi = this.riskList[i].getRisk(); // [risk, hours, minutes, nb_people]
			var myRisk = myActi[0] * prevalence; // proba for 1h, 1 person
            // Handle duration
			var composedRisk = 1 - Math.pow((1-myRisk),myActi[1])*(1-myRisk*myActi[2]/60);
            // Handle nb people
			var totalRisk = Math.pow((1-composedRisk), myActi[3]); // gives 1-the risk 
			riskPerson = riskPerson * totalRisk;
		}
		riskPerson = 1 - riskPerson;
		dydt[0] = -1.0 * y[0] * riskPerson; // S
		dydt[1] = y[0] * riskPerson - this.alpha * y[1]; // E
		dydt[2] = this.alpha * y[1] - this.gamma * y[2]; // I
		dydt[3] = this.gamma * y[2]; // R
	}
	
	integrate(f,t0,y0,step,tmax) {
		var integrator = rk4(y0, f, t0, step);
		var t = t0;
		var y = y0;
		var ta = [];
		var ya = [];
		ta.push(t0);
		ya.push({x:t, infections:Math.round(y[2])}); //, hosp:Math.round((y[1]* 2.6 / 100) * 1000)/1000, rea: Math.round((y[1]* (2.6 / 100) * (18.2 / 100)) * 1000) / 1000});
		for(t=t0+step;t<tmax; t=t+step){
			integrator=integrator.step();
			ya.push({x:t, infections:Math.round(integrator.y[2]*1000)/1000});
			ta.push(t);
		}
	  return {t:ta,y:ya};
	}
	
	simulate(){
		// we estimate E0=I0.
		return this.integrate(this.sir.bind(this), 0, [this.number_people-this.I0-this.R0,this.I0, this.I0,this.R0], 1, this.tmax);
	}
		
}

class Evolution extends Component {
	constructor(props){
		super(props);
		this.state = {alpha:props.alpha, gamma:props.gamma, riskList:props.riskList, sim: new EpidemySimulator(props.riskList, props.gamma, props.alpha)};
	}

	handleGamma = (event) => {
		this.setState({gamma:event.target.value, sim : new EpidemySimulator(this.state.riskList, event.target.value, this.state.alpha)});
	  }
	
	handleAlpha = (event) => {
		this.setState({alpha: event.target.value, sim : new EpidemySimulator(this.state.riskList, this.state.gamma, event.target.value)});
	  }
	
	
	render(){
		return (
		<div id="graph_container">
		<div className="recharts_graph">
			<LineChart width={400} height={300} data={this.state.sim.simulate().y}>
				<Line type="monotone" yAxisId="left" dataKey="infections" dot={false} stroke="red" />
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="x" interval={5}>
					<Label value="(jours)" position='right' offset={-15} />
				</XAxis>
				<YAxis yAxisId="left" />
				<YAxis width={80} yAxisId="right" orientation="right" tick={{ fontSize: 10, }}>
				</YAxis>
				<Tooltip />
			</LineChart>
		</div>
        <div id="parameters_result">
			<Grid container spacing={1} justify="center" alignItems="center">
			<Grid item>Model : SEIR.</Grid>
			<Grid item><TextField id="outlined-basic" style={{width: 90}} type="number"
			InputLabelProps={{shrink: true,}} label="alpha" variant="outlined" defaultValue={this.state.alpha} onChange={this.handleAlpha} /></Grid>
			<Grid item><TextField id="outlined-basic" style={{width: 90}} type="number"
			InputLabelProps={{shrink: true,}} label="gamma" variant="outlined" defaultValue={this.state.gamma} onChange={this.handleGamma} /></Grid>
			</Grid>
			</div>
		</div>
		);
	}
}

export default Evolution;