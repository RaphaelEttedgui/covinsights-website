import React, {Component} from "react"
import { Helmet } from 'react-helmet'
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import seir_image from '../images/SEIR.png';
import List from '@material-ui/core/List';
import { ListItem } from "@material-ui/core";

function createData(name, risk) {
  return { name, risk };
}

const rows = [
  createData('I am wearing a surgical mask', '/2'),
  createData('The other person is wearing a surgical mask', '/4'),
  createData('Being outdoors', '/20'),
  createData('Being 2m apart', '/2'),
  createData('Every additional 1m', '/2'),
  createData('Loud talking (singing, talking above music)', 'x5'),
  createData('Nobody is talking (for example in a train)', '/5'),
  createData('Being in a train with air filtration, or a moving car with windows opened', '/4'),
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class WhitePaperEng extends Component {
  constructor(props){
    super(props);
    this.refRisque = React.createRef();
    this.refImpact = React.createRef();
    this.refFamily = React.createRef();
  }

  goToRisk = () => {
    this.refRisque.current.scrollIntoView({behavior: "smooth"});
  }

  goToImpact = () => {
    this.refImpact.current.scrollIntoView({behavior: "smooth"});
  }

  goToFamily = () => {
    this.refFamily.current.scrollIntoView({behavior: "smooth"});
  }

  render =() => {
    return (
    <div className="calculator_container">
        <Helmet>
        <title>
            Covinsights
        </title>
        </Helmet>        
    <div className="whitepaper_presentation">
        <h1>
        White Paper
        </h1>
    </div>
    <Divider />
    <div className="whitepaper">
        <h2>Presentation</h2>
        <p>
          With Christmas drawing near, we all want to spend quality time with our family, without there being a sanitary catastrophe. How can we plan
          our gatherings to limit the risk as much as we can, given the activities that are imposed to us such as work, public transportation, or others ?
        </p>
            It is to answer that question that we built this website. It contains several tools :
            <ul style={{listStylePosition: 'inside', margin:'15px'}}>
            <li>A <span style={{fontWeight:"500"}}>risk calculator</span>, to evaluate the probability of catching the virus depending on the activities one did;</li>
            <li style={{marginTop:'7px'}}>A<span style={{fontWeight:"500"}}> simulator</span>, showing how the epidemy would advance if everyone had the same risk as oneself;</li>
            <li style={{marginTop:'7px'}}>A<span style={{fontWeight:"500"}}> family gathering evaluator</span>, calculating the risk it represents given the age and risk profile of the participants.</li>
            </ul>
        <p>
            We believe that information is the key to success in the fight against a pandemic. By giving everyone the means to adjust their behavior to the
            virus circulation, it is possible to maintain the epidemic under control, so that extreme sanitary measures will only be a last resort, instead of a regular
            necessity as it is right now.
        </p>
        <div className="disclaimer">
          <h3>Disclaimer</h3>
          This website is not a scientific peer-reviewed work, and so only represents the estimations made by the authors given the knowledge at their disposal, which
          is not enough to guarantee the precision of the numbers. Our goal is only to allow quick and personal estimations for individual decision-making.
          <br/> <br/> 
          We are by no means expert on this topic, even though we read a lot of experts papers. This is not a primary source of information about COVID.
          Do not use the tools from this website to make medical decisions. Please continue to follow government guidance.
        </div>
        <br />
        <h2>Table of content</h2>
        <List disablePadding={true}>
          <ListItem button={true} onClick={() => this.goToRisk()}>1. Risk computation</ListItem>
          <ListItem button={true} onClick={() => this.goToImpact()}>2. Impact on the epidemic</ListItem>
          <ListItem button={true} onClick={() => this.goToFamily()}>3. Family gathering</ListItem>
        </List>
        <br />
        <h2 ref={this.refRisque}>1. Risk computation</h2>
        <p>
            We use the algorithm for risk computation that was developed by the team of <a href="http://microcovid.org/paper/">Microcovid</a> as the basis for the rest of our work.
            For more details and links to the scientific sources on which their numbers are based, we highly encourage you to visit their website. They have accomplished some
            truly amazing work by compiling a lot of existing literature on the topic. In this section, we will summarize the computation method and the numbers used?
        </p>
        We can divide the risk of an activity in two pieces : the transmission risk during the activity, and the risk profile of the person with whom we practice it:
        <div className="visible_except_mobile">
          <div className="Math">
            P(B contaminates A) = P(B contaminates A | B has covid) x P(B has covid)
          </div>
        </div>
        <div className="visible_mobile_only">
        <div className="Math">
          P(B contaminates A) = P(B contaminates A | B has covid) x P(B has covid)
          </div>
        </div>
        <h3>Transmission risk</h3>
        We start with an estimation in the simplest case :
        <div className="center_gray">
          Risk of transmission during a 1h, unmasked and indoors conversation with someone having covid : 6%
        </div>
        We then multiply this probability by several modifiers (see <a href="http://microcovid.org/paper/">Microcovid</a> for more details as well as the sources ) :
        <br /> <br />
          <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Activity modification</StyledTableCell>
                <StyledTableCell align="right">Risk modification</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.risk}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      <br />

    <h3>Risk profile of the person</h3>
    To get the total risk, we then need to multiply the transmission risk by the probability that the other person has covid.
    To compute this, we use the prevalence of the virus (i.e. the proportion of the population that is currently infected) as a probability that a random person
    has covid. We then adjust this probability by defining several risk profiles : frontline workers and people who socialize a lot (x3), and people who work from home
    and do not socialize much (/3).
    <p>
      To compute the prevalence, we use
      <a href="https://www.data.gouv.fr/en/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/"> government data</a> for the number of hospitalizations and ICUs.
      We then use <a href='https://hal-pasteur.archives-ouvertes.fr/pasteur-02548181'>the analysis from Institut Pasteur</a> (which give
      for each age class the probability of being hospitalized or going in ICU), to estimate the number of current cases. We then just need to divide by the total population.
    </p>
    To sum up, the risk over 1h with 1 person is :
    <div className="visible_except_mobile">
        <div className="Math">
            [Base risk] x [modification factors] x [B's risk profile] x [Prevalence] 
        </div>
    </div>
    <div className="visible_mobile_only">
        <div className="Math">
          [Base risk] x [modification factors] x [B's risk profile] x [Prevalence] 
        </div>
    </div>

    <br/>
    <h3>Duration and number of people</h3>
    All of this gives the transmission risk for 1h of the activity. To get the risk over several hours, we compute the probability of being contaminated during
    at least one of these hours. That means the opposite of not being contaminated in any of these hours. If the risk over 1h is p, then the one over n hours will be :
    <div className="visible_except_mobile">
        <div className="Math">
            P(contamination during n hours) = 1 - (1-p)<sup>n</sup>
        </div>
    </div>
    <div className="visible_mobile_only">
        <div className="Math">
        P(contamination during n hours) = 1 - (1-p)<sup>n</sup>
        </div>
    </div>
    <p>
    We cap the risk for a given person over a single week to 50%, which corresponds to the risk of being contaminated by a household partner having covid in this duration.
    </p>
    <p>
    When several people take part to an activity, we compute the probability of tranmission for each one, then the probability of being contaminated by at least one of 
    these people, following the same calculation as above. If the probability of contamination by one person is P, then for N people :
    </p>
    <div className="visible_except_mobile">
        <div className="Math">
            P(contamination with N people) = 1 - (1-P)<sup>N</sup>
        </div>
    </div>
    <div className="visible_mobile_only">
        <div className="Math">
            P(contamination with N people) = 1 - (1-P)<sup>N</sup>
        </div>
    </div>
    <p>
    Note that this is the major difference between our algorithm and Microcovid's, which add up the risks related to each hour and person. It is an approximation
    that work well for small risks, but usually overestimate the result otherwise.
    </p>
    <br />
    <h2 ref={this.refImpact}>2. Impact on the epidemic</h2>
    <p>
    The computation above allows us to estimate the individual risk, which is the probability of being contaminated given one's activities over the week.
    However, this does not indicate the impact over the epidemic as a whole : do we contribute to accelerate, or slow down, the circulation of the virus ?
    </p>
    <p>
    It is extremely hard to make predictions about the evolution of the epidemic in a real scenario (some of us worked on that topic, and can confirm that), because of the number
    of parameters to take into account, as well as the uncertainty, that lead to large confidence intervals.
    </p>
    <p>
    However, it is possible to answer the question above by making the following simplification :
    </p>
    <div className="center_gray">
        How would the epidemic advance if everyone had the same risk profile as me ?
    </div>
    This simplification allows us to compute the evolution of the epidemic quite easily, by using a variant of
    the <a href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology">SEIR</a> model. We assume that there are
    no multiple infections (or a negligeable number), and we pose :
    <ul style={{listStylePosition: 'inside', margin:'15px'}}>
      <li> S(t) the number of susceptible people at time t (meaning that can be infected, and are not immune);
      </li>
      <li style={{marginTop:'5px'}}>E(t) the number of exposed people at time t (infected but not yet contagious);</li>
      <li style={{marginTop:'5px'}}>I(t) the number of infected people;</li>
      <li style={{marginTop:'5px'}}>R(t) the number of people having recovered and being immune.</li>
    </ul>
    <img src={seir_image} alt="SEIR" className="seir_image" />
    <p>
    As in the SEIR model, the transitions from the E to I State happen at a constant rate (respectively alpha and gamma, whose inverse are
    the incubation period and how long a person remains contagious). However, we compute the number of contaminated in a different way :
    </p>
    <div className="visible_except_mobile">
        <div className="Math">
            E(t+1)-E(t) = P(S<sub>1</sub> contaminé) + ... + P(S<sub>m</sub> contaminé)
        </div>
    </div>
    <div className="visible_mobile_only">
        <div className="Math">
            E(t+1)-E(t) = P(S<sub>1</sub> contaminé) + ... + P(S<sub>m</sub> contaminé)
        </div>
    </div>
    Where the probability of contamination for each person is calculated following the formula from last section, using a prevalence of I(t)/N, meaning the probability that
    any random person has the virus at time t.
    <br/>
    Note that contrary to the SEIR model, as soon as an activity involves more than one person or a duration of more than one hour, the risk of each individual is not proportional
    to the prevalence.

    <br /><br/>
    <h2 ref={this.refFamily}>3. Family gatherings</h2>
    <p>
    One of the most important stakes of the epidemic is Christmas. Old people are especially vulnerable and are the most susceptible to be hospitalized and dying of the virus,
    whereas young adults are the one that socialize the most, and so take the most risks. Hence, family gathering, where by natures different age groups meet, may have
    catastrophic consequences if they are not carefully planned.
    </p>
    <p>
    We used the risk computation algorithm to create a simulator for family gatherings. By entering some activities in the calculator, as well as participants to the reunion,
    it estimates the probability that one of them develops a grave form, and computes the outcome for the whole country.
    </p>
    <p>
      We used the  <a href='https://hal-pasteur.archives-ouvertes.fr/pasteur-02548181'>estimations from Institut Pasteur</a> to compute the probability
      of hospitalization, ICU and death once contaminated, for each person in the reunion according to their age.
    </p>
    <p>
      We then estimated the number of family reunion. We start with the french population (66 millions), subtract the percentage of already immune people (we computed
      that to be around 10 to 14% from the number of ICUs, and this is confirmed by Institut Pasteur), to get around 56 Millions. Among these, around three third will
      attend at least one family gathering, which gives 42 millions.
    </p>
    <p>
      Finally, following the principle "what would happen if everyone does like me", we divide this population by the number of poeple going to the reunion that was
      entered in the simulator, to estimate the number of reunions. This allows us to compute the outcome for the whole country.
    </p>
    <h3>About</h3>
    Website created by <a href="https://www.linkedin.com/in/raphaelettedgui/">Raphaël Ettedgui</a>.
    <br /><br />
    <h3>Special Thanks</h3>
    Thank you to Clément Turpain, Emma Müller, Laura Diaz, Robin Aspe, Charlotte Mion, Ivan Glita and Jean-Patrick Vrel for their help, testing the website, and the many
    brainstorming sessions !
    </div>
    </div>
  )
  }
}

export default WhitePaperEng;