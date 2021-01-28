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
                Dîners en famille de 5h, 6 personnes (2 âgées de 70+ ans)
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"#D82210"}}>
                2016 réanimations
                </div>
                <span style={{color:"#D82210"}}>(reconfinement inévitable)</span>
            </div>       
        )
    }

    box1 = () => {
        return (
            <div>
            <div className="scenario_container">
                Dîners en famille de 5h, 6 personnes (2 âgées de 70+ ans).
                <div style={{fontSize:"1.5em"}}>+</div>
                <span className="boldOrBlue">
                Raccourcir le dîner à 3h maximum
                </span>
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"orange"}}>
                1408 réanimations
                </div>
                (30% d'amélioration !)
            </div>
            </div>         
        )
    }

    box2 = () => {
        return (
            <div>             
            <div className="scenario_container">
                Dîners en famille de 5h, 6 personnes (2 âgées de 70+ ans).
                <div style={{fontSize:"1.5em"}}>+</div>
                Raccourcir le dîner à 3h maximum
                <div style={{fontSize:"1.5em"}}>+</div>
                <span className="boldOrBlue">2/3 des gens font une quarantaine</span> <br/>
                <span className="boldOrBlue">de 3</span> (minimum) à <span className="boldOrBlue">7 jours</span> (idéal) <br/>
                <span className="boldOrBlue">avant la soirée</span>
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"#F4CF02"}}>
                700 réanimations
                </div>
                (65% d'amélioration par rapport au scénario initial !)
            </div>
            </div>
        )
    }

    box3 = () => {
        return (
            <div className="scenario_container">
                Dîners en famille de 5h, 6 personnes (2 âgées de 70+ ans).
                <div style={{fontSize:"1.5em"}}>+</div>
                Raccourcir le dîner à 3h maximum
                <div style={{fontSize:"1.5em"}}>+</div>
                2/3 des gens font une quarantaine <br/>
                de 3 (minimum) à 7 jours (idéal) <br/>
                avant la soirée

                <div style={{fontSize:"1.5em"}}>+</div>
                <span className="boldOrBlue">
                Ceux ne pouvant pas faire de quarantaine (travailleurs essentiels) <br/>
                portent un masque
                </span>
                <div className="arrow">
                    <ArrowDownwardIcon style={{ fontSize: 40 }}/>
                </div>
                <div className="scenario_bilan" style={{color:"green"}}>
                200 réanimations
                </div>
                <span style={{color:"green"}}>(90% de réduction par rapport au scénario initial !)</span>
            </div>
        )
    }

    bilan = () => {
        return (
            <div>
            <div className="explanation_test" style={{fontSize:"1.2em"}}>
          De petits gestes peuvent sauver un grand nombre de vies, et éviter un reconfinement.
          </div>
          <div className="calculator_introduction" style={{fontSize:"1.2em", textAlign:"center"}}>
            <ul style={{listStylePosition: 'inside', margin:'15px'}}>
                <li>Raccourcir la soirée</li>
                <li>Faire une quarantaine de 3 à 7 jours avant la fête</li>
                <li>Porter un masque pendant la soirée.</li>
            </ul>
            </div>
            </div>
        )
    }

    backButton = () => {
        return (
        <div style={{display:'inline', marginLeft:"15px"}}>
            <Button variant="contained" onClick={this.goBack}>retour</Button>
        </div>
        )
    }

    button = () => {
        return (
            <div style={{display:'inline'}}>
                <Button variant="contained" color="primary" onClick={this.handleButton}>améliorer</Button>
            </div>
        )
    }

    bilanButton = () => {
        return (
            <div style={{display:'inline'}}>
                <Button variant="contained" onClick={this.handleBilan}>bilan</Button>
            </div>
        )
    }

    render = () => {
        return (
            <div>
            <div className="calculator_presentation">
            <div className="calculator_introduction">
            <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Noël : comment éviter un désastre sanitaire ?</span>
                <br/>
                <div style={{marginTop:"1rem", textAlign:"center"}} >
                Nous estimons le bilan des fêtes de fin d'année, avec la prévalence actuelle, selon divers scénarios.
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