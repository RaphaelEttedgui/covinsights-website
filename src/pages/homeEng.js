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
                    This website was created by a mathematician from Univerisity Paris-Dauphine.
                    <br/>
                    See the "About" section for information on the models we used.
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
                                <ArrowForwardIcon/> &nbsp;Activities by risk
                                </div>
                                Visualize which activities are the riskiest, via an interactive chart.
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


                </div>
            </div>
        )
    }
}

export default Home;