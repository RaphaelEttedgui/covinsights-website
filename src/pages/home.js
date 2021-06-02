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
                    Quel est votre impact sur l'épidémie ?
                    </h1>
                </div>
                <div className="home_presentation">
                    <div className="home_introduction">
                    <div style={{fontWeight:"450"}} >
                    Outil destiné à la vulgarisation de la recherche sur le COVID-19.
                    <br/>
                    Voir la section "A propos" pour les détails des modèles utilisés.
                    <br/>
                    Prévalence actuellement utilisée : fin Mai 2021.
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
                                    Calculateur de risque
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
                                <ArrowForwardIcon/> &nbsp;Votre risque
                                </div>
                                Evaluez votre prise de risque durant diverses activités en fonction de leur durée, du port du masque etc.
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Votre impact
                                </div>
                                Visualisez comment l'épidémie évoluerait si tout le monde faisait comme vous
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
                                    Visualiser le risque
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
                                <ArrowForwardIcon/> &nbsp;Exemples de profils
                                </div>
                                Visualisez les profils de risques avec des exemples de personnages fictifs
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Scénarios
                                </div>
                                Impact des fêtes de fin d'années, mesures potentielles
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Activités par risque
                                </div>
                                Visualisez quelles activités sont les plus risquées à travers un graphique interactif
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
                            <Button variant="contained" style={{width:"90%", backgroundColor: "white", borderRadius: 35,}}>
                            <Grid container spacing={2} alignItems="center" justify="center">
                                <Grid item>
                                    <div className="icon_home">
                                    <SupervisedUserCircleIcon style={{ fontSize: 50 }}/>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div className="text_icon_home">
                                    Fête en famille
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
                                <ArrowForwardIcon/> &nbsp;Planifiez vos fêtes
                                </div>
                                Importez votre risque depuis le calculateur, et évaluez le danger pour vos proches
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Impact de la réunion
                                </div>
                                Visualisez le bilan à l'échelle de la France si toutes les réunions se passent comme la vôtre
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
                                    A propos / White Paper
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
                                <ArrowForwardIcon/> &nbsp;Détails de modèles utilisés
                                </div>
                                Explication en profondeur des mathématiques derrière le calculateur, ainsi que des sources
                            </Grid>
                            <Grid item xs={12}>
                            <div className="home_subtitle">
                                <ArrowForwardIcon/> &nbsp;Qui sommes-nous
                                </div>
                                Liens pour nous contacter.
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    </div>
                </div>
        <br/> <br/>
        <div className="disclaimer">
          <div style={{fontSize:"0.9em"}}>
          <h3>Disclaimer</h3>
          Ce site est une initiative personnelle aux auteurs. Il représente donc
          uniquement leurs meilleures estimations étant donné les connaissances à leur disposition, qui ne sont pour certaines pas suffisantes pour garantir la précision et la fiabilité
          des chiffres proposés.
          <br/><br/>
          Une faible probabilité n'entraîne pas une absence de risque. Les auteurs recommandent la précaution avant tout, et ne peuvent être tenus responsables
          d'éventuelles conséquences d'actions effectuées par des utilisateurs du site.

          <br/> <br/>Les probabilités sont calculées dans
          un cadre très général, à l'échelle du pays, et doivent être soigneusement ajustées avant de les appliquer à un cas particulier.
          <br/><br/>
           Ceci n'est pas une source primaire d'information sur le covid. N'utilisez pas les outils de ce site pour prendre des décisions médicales.
           Continuez à suivre les recommandations du gouvernement.
           </div>
        </div>
                </div>
            </div>
        )
    }
}

export default Home;