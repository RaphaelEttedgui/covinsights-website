import React, { Component } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label} from 'recharts';

var rk4 = require('ode-rk4');   

class EpidemySimulator{
    // gamma=0.125 correspond à 8 jours de récupération. 7 à 0.14.
	constructor(beta, gamma=0.125, N=66000, I0=20, tmax=30, R0=15000){
		this.beta = beta;
		this.gamma = gamma;
		this.number_people = N;
		this.I0 = I0;
		this.tmax = tmax;
		this.R0 = R0;
	}
	
	copy(x) {
		return Object.assign({},x)
	}
	
	sir(dydt, y, t){
		dydt[0] = -1.0 * this.beta * y[0] * y[1] / this.number_people;
		dydt[1] = this.beta * y[0] * y[1] / this.number_people - this.gamma * y[1];
		dydt[2] = this.gamma * y[1];
	}
	
	integrate(f,t0,y0,step,tmax) {
		var integrator = rk4(y0, f, t0, step);
		var t = t0;
		var y = y0;
		var ta = [];
		var ya = [];
		ta.push(t0);
		ya.push({x:t, infections:y[1], hosp:y[1]* 2.6 / 100, rea: y[1]* (2.6 / 100) * (18.2 / 100)});
		for(t=t0+step;t<tmax; t=t+step){
			integrator=integrator.step();
			ya.push({x:t, infections:integrator.y[1], hosp:integrator.y[1]* 2.6 / 100, rea:integrator.y[1]* (2.6 / 100) * (18.2 / 100)});
			ta.push(t);
		}
	  return {t:ta,y:ya};
	}
	
	simulate(){
        console.log(this.beta)
		return this.integrate(this.sir.bind(this), 0, [this.number_people-this.I0-this.R0,this.I0,this.R0], 1, this.tmax);
	}
		
}

class Evolution extends Component {
	constructor(props){
		super(props);
		this.state = {sim: new EpidemySimulator(props.risk)};
	}
	
	render(){
		return (
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
		);
	}
}

export default Evolution;