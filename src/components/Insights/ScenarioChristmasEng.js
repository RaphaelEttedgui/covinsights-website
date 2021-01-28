import React, {Component} from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Button from '@material-ui/core/Button';

class ScenarioChristmas extends Component{

    constructor(props){
        super(props);
        this.state={show:"0", showButton:true, showBilan:false}
        this.bottomRef = React.createRef();
    }

    handleButton = () => {
        if(this.state.show=="0"){
            this.setState({show:"1"});
        }
        else if(this.state.show=="1"){
            this.setState({show:"2"});
        }
        else if(this.state.show=="2"){
            this.setState({show:"3", showButton:false});
        }
    }

    goBack = () => {
        if(this.state.show=="1"){
            this.setState({show:"0"});
        }
        else if(this.state.show=="2"){
            this.setState({show:"1"});
        }
        else if(this.state.show=="3"){
            this.setState({show:"2", showBilan:false, showButton:true});
        }
    }

    handleBilan = () => {
        this.setState({showBilan:true});
        this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
    box0 = () => {
        return (
            <div className="scenario_container">
                Family dinner, 5h, 6 people (2 above 70 y.o.)
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"#D82210"}}>
                2016 reanimations
                </div>
                <span style={{color:"#D82210"}}>(lockdown unavoidable)</span>
            </div>       
        )
    }

    box1 = () => {
        return (
            <div>
            <div className="scenario_container">
                Family dinner, 5h, 6 people (2 above 70 y.o.)
                <div style={{fontSize:"1.5em"}}>+</div>
                <span className="boldOrBlue">
                Shorten the dinner to 3h maximum
                </span>
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"orange"}}>
                1408 reanimations
                </div>
                (30% better!)
            </div>
            </div>         
        )
    }

    box2 = () => {
        return (
            <div>             
            <div className="scenario_container">
                Family dinner, 5h, 6 people (2 above 70 y.o.)
                <div style={{fontSize:"1.5em"}}>+</div>
                Shorten the dinner to 3h maximum
                <div style={{fontSize:"1.5em"}}>+</div>
                <span className="boldOrBlue">2/3 of people do a quarantine</span> <br/>
                <span className="boldOrBlue">of 3</span> (minimum) <span className="boldOrBlue"> to 7 days</span> (ideal)
                <span className="boldOrBlue"> before the gathering</span>
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"#F4CF02"}}>
                700 reanimations
                </div>
                (65% better than initial !)
            </div>
            </div>
        )
    }

    box3 = () => {
        return (
            <div className="scenario_container">
                Family dinner, 5h, 6 people (2 above 70 y.o.)
                <div style={{fontSize:"1.5em"}}>+</div>
                Shorten the dinner to 3h maximum
                <div style={{fontSize:"1.5em"}}>+</div>
                2/3 of people do a quarantine <br/>
                of 3 (minimum) to 7 days (ideal) <br/>
                before the gathering

                <div style={{fontSize:"1.5em"}}>+</div>
                <span className="boldOrBlue">
                Those that can't quarantine (frontline workers) <br/>
                wear a mask
                </span>
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"green"}}>
                200 reanimations
                </div>
                <span style={{color:"green"}}>(90% of réduction from our initial scenario !)</span>
            </div>
        )
    }

    bilan = () => {
        return (
            <div>
            <div className="explanation_test" style={{fontSize:"1.2em"}}>
            Small things can save a great number of lives, and avoid a new lockdown.
          </div>
          <div className="calculator_introduction" style={{fontSize:"1.2em", textAlign:"center"}}>
            <ul style={{listStylePosition: 'inside', margin:'15px'}}>
                <li>Shorten dinners</li>
                <li>Do a quarantine of 3 to 7 days before christmas</li>
                <li>Wear a mask during the gathering.</li>
            </ul>
            </div>
            </div>
        )
    }

    backButton = () => {
        return (
        <div style={{display:'inline', marginLeft:"15px"}}>
            <Button variant="contained" onClick={this.goBack}>back</Button>
        </div>
        )
    }

    button = () => {
        return (
            <div style={{display:'inline'}}>
                <Button variant="contained" color="primary" onClick={this.handleButton}>outcome</Button>
            </div>
        )
    }

    bilanButton = () => {
        return (
            <div style={{display:'inline'}}>
                <Button variant="contained" onClick={this.handleBilan}>outcome</Button>
            </div>
        )
    }

    render = () => {
        return (
            <div>
            <div className="calculator_presentation">
            <div className="calculator_introduction">
            <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Christmas : how to avoid a sanitary disaster ?</span>
                <br/>
                <div style={{marginTop:"1rem", textAlign:"center"}} >
                We estimate the outcome of christmas eve, with the current prevalence, according to various scenarios.
                </div>
            </div>
            </div>
            
            {(this.state.show=="0") && this.box0()}
            
            {(this.state.show=="1") && this.box1()}

            {(this.state.show=="2") && this.box2()}

            {(this.state.show=="3") && this.box3()}
            
            <div style={{textAlign:"center", paddingTop:"1em"}}>
                {this.state.showButton && this.button()}
                {(!this.state.showBilan && this.state.show=="3") && this.bilanButton()}

                {(this.state.show!="0") && this.backButton()}
            </div>

            {this.state.showBilan && this.bilan()}

            <div ref={this.bottomRef}></div>
            </div>
        );
    }
}

export default ScenarioChristmas;