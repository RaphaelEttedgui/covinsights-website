import React, {Component} from 'react';
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import InfoIcon from '@material-ui/icons/Info';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

class Home extends Component{

    render = () => {
        return (
            <div>
                <Helmet>
                <title>
                    Covimpact
                </title>
                </Helmet>
                <div className="whitepaper_presentation">
                    <h1>
                    What is your impact on the epidemic ?
                    </h1>
                </div>
                <div className="home_presentation">
                    <div className="home_introduction">
                    <div style={{fontWeight:"450"}} >
                    This website was created to help vulgarize the research on COVI-19.
                    <br/>
                    See the "About" section for information on the models we used.
                    <br/>
                    Current data used : Mai 2021.
                    </div>
                    </div>
                </div>

                <div className="home_body">
                <div className="home_option">
                    <div className="home_container">
                    <Grid container spacing={4} justify="center" alignItems='center'>
                        <Grid item xs={5}>
                            <div className="home_button">
                            <NavLink to="/calculator">
                            <Button variant="contained" style={{width:"90%", backgroundColor: "white", borderRadius: 35,}}>
                            <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item>
                                    <div className="icon_home">
                                    <ImportantDevicesIcon style={{ fontSize: 50 }}/>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="text_icon_home">
                                    Risk calculator
                                    </div>
                                </Grid>
                            </Grid>
                            </Button>
                            </NavLink>
                            </div>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={6}>
                        <Grid container spacing={2} justify="center" alignItems='center'>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Your risk
                                </div>
                                Evaluate the risk of various activities, considering the duration, masks, etc.
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Your impact
                                </div>
                                Visualize how the epidemic would continue if everyone did the same as you
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Divider/>
                    <br/><br/>
                    <Grid container spacing={4} justify="center" alignItems='center'>
                        <Grid item xs={5}>
                            <div className="home_button">
                            <NavLink to="/familyGathering">
                            <Button variant="contained"style={{width:"90%", backgroundColor: "white", borderRadius: 35,}}> 
                            <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item>
                                    <div className="icon_home">
                                    <SupervisedUserCircleIcon style={{ fontSize: 50 }}/>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="text_icon_home">
                                    Family gathering
                                    </div>
                                </Grid>
                            </Grid>
                            </Button>
                            </NavLink>
                            </div>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={6}>
                        <Grid container spacing={2} justify="center" alignItems='center'>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Plan the holidays
                                </div>
                                Import your risk from the calculator, and evaluate how dangerous the gathering would be
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Impact of the gathering
                                </div>
                                See the outcome for the country if every gathering was the same as yours
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Divider/>
                    <br/><br/>
                    <Grid container spacing={4} justify="center" alignItems='center'>
                        <Grid item xs={5}>
                            <div className="home_button">
                            <NavLink to="/insights">
                            <Button variant="contained" style={{width:"90%", backgroundColor: "white", borderRadius: 35,}}>
                            <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item>
                                    <div className="icon_home">
                                    <VisibilityIcon style={{ fontSize: 50 }}/>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="text_icon_home">
                                    Visualize the risk
                                    </div>
                                </Grid>
                            </Grid>
                            </Button>
                            </NavLink>
                            </div>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={6}>
                        <Grid container spacing={2} justify="center" alignItems='center'>
                        <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Example of risk profiles
                                </div>
                                See the risk profiles of some fictive characters.
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Scenarios
                                </div>
                                See how to analyze scenarios for the holidays.
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Activities by risk
                                </div>
                                Visualize which activities are the riskiest in an interactive graph.
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Divider/>
                    <br/><br/>
                    <Grid container spacing={4} justify="center" alignItems='center'>
                        <Grid item xs={5}>
                            <div className="home_button">
                            <NavLink to="/whitepaper">
                            <Button variant="contained" style={{width:"90%", backgroundColor: "white", borderRadius: 35,}}>
                            <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item>
                                    <div className="icon_home">
                                    <InfoIcon style={{ fontSize: 50 }}/>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="text_icon_home">
                                    About / White Paper
                                    </div>
                                </Grid>
                            </Grid>
                            </Button>
                            </NavLink>
                            </div>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={6}>
                        <Grid container spacing={2} justify="center" alignItems='center'>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Details about the models used
                                </div>
                                Detailed explanations and sources for the calculator
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Who are we
                                </div>
                                Infos, and how to contact us
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    </div>
                </div>
                <br /> <br /> <br/><br/>
                <div className="disclaimer">
                <h3>Disclaimer</h3>
                This website has not been peer-reviewed yet. It only represents the author's best estimations given the knowledge at hand, some of which are not enough to guarantee the
                precision and fiability of the numbers.
                <br/> <br />
                A small probability does not mean the absence of risk. The authors recommend precaution above all, and cannot be held responsible for any consequence of actions or omissions
                made by users of this website.
                <br/> <br/>
                The probabilities are computed for the whole countrie, and so are very general. They must be carefully adjusted to each situation before being applied to
                a particular case.
                <br/><br/>
                This website is not a primary information source about COVID.
                Do not use the tools from this website to take medical decisions. Keep following government recommendation.
                </div>

                </div>
            </div>
        )
    }
}

export default Home;