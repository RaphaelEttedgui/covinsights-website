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
import logo_shyrka from '../images/logo_shyrka.png'


function createData(name, risk) {
  return { name, risk };
}

const rows = [
  createData('Je porte un masque chirurgical', '/2'),
  createData('L\'autre personne porte un masque chirurgical', '/4'),
  createData('Être à l\'extérieur', '/20'),
  createData('Être à 2m de distance', '/2'),
  createData('Chaque mètre de distance supplémentaire', '/2'),
  createData('Conversation forte (crier,  chanter, parler au-dessus de la musique', 'x5'),
  createData('Personne ne parle (typiquement dans un train)', '/5'),
  createData('Être dans un train avec filtration d\'air, ou une voiture en mouvement fenêtres ouvertes', '/4'),
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

class WhitePaper extends Component {
  constructor(props){
    super(props);
    this.refRisque = React.createRef();
    this.refImpact = React.createRef();
    this.refFamily = React.createRef();
    this.refMe = React.createRef();
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
  
  goToMe = () => {
    this.refMe.current.scrollIntoView({behavior:"smooth"});
  }

  render =() => {
    return (
    <div className="calculator_container">
        <Helmet>
        <title>
            Covinsights
        </title>
        </Helmet>        
    <div className="whitepaper">
        <h2>Présentation</h2>
        <p>
          Avec l'approche de Noël, nous avons tous envie de passer les fêtes en famille, sans que cela soit un désastre sanitaire. Mais comment planifier nos
          rassemblements de façon à limiter les risques au maximum, sous contrainte du travail, des transports en commun, ou autres activités qui nous sont imposées ?
        </p>
            C'est pour répondre à cette question que nous avons créé ce site. Il se compose de plusieurs outils :
            <ul style={{listStylePosition: 'inside', margin:'15px'}}>
            <li>un <span style={{fontWeight:"500"}}>calculateur de risque</span>, pour évaluer sa probabilité d'attraper le virus sur une semaine en fonction des activités pratiquées;</li>
            <li style={{marginTop:'7px'}}>un <span style={{fontWeight:"500"}}>simulateur</span>, montrant comment l'épidémie évoluerait si tout le monde faisait les mêmes activités que soi;</li>
            <li style={{marginTop:'7px'}}>un <span style={{fontWeight:"500"}}>évaluateur de réunion familiale</span>, calculant le risque qu'elle représente en fonction de l'âge et du profil de risque des participants.</li>
            </ul>
        <p>
          Raisonner "si tout le monde faisait comme moi" permet de visualiser l'impact global de nos décisions individuelles. Contribuons-nous actuellement à ralentir l'épidémie, ou
          au contraire à l'aggraver ?
        </p>
        <p>
            Nous sommes convaincus que l'information est la clé du succès dans la lutte contre une pandémie. En donnant à tous les moyens d'ajuster leur comportement en fonction de
            la circulation du virus, il est possible de maintenir l'épidémie sous contrôle, afin que les mesures sanitaires extrêmes ne soient qu'un dernier recours, et non
            une nécessité régulière.
        </p>
        <h2>Table des matières</h2>
        <List disablePadding={true}>
          <ListItem button={true} onClick={() => this.goToRisk()}>1. Calcul du risque</ListItem>
          <ListItem button={true} onClick={() => this.goToImpact()}>2. Impact sur l'épidémie</ListItem>
          <ListItem button={true} onClick={() => this.goToFamily()}>3. Réunion familiale</ListItem>
          <ListItem button={true} onClick={() => this.goToMe()}>4. Qui sommes-nous ?</ListItem>
        </List>
        <br />
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
        <br />
        <h2 ref={this.refRisque}>1. Calcul de risque</h2>
        <p>
            Nous utilisons l'algorithme de calcul de risque développé par l'équipe de <a href="http://microcovid.org/paper/">Microcovid</a>. Pour plus de détails et les liens vers les
            publications scientifiques sur lesquelles reposent les chiffres, nous vous encourageons vivement à consulter leur site. Ils ont accompli un travail considérable et
            de grande qualité en compilant la littérature existante sur le sujet. Dans cette section, nous allons résumer la méthode de calcul et les chiffres utilisés.
        </p>
        On peut décomposer le risque lié à une activité en deux morceaux : le risque de transmission durant l'activité, et le profil de risque de la personne avec qui on la pratique:
        <div className="visible_except_mobile">
          <div className="Math">
            P(B contamine A) = P(B contamine A | B a le covid) x P(B a le covid)
          </div>
        </div>
        <div className="visible_mobile_only">
        <div className="Math">
            P(B contamine A) = P(B contamine A | B a le covid) x P(B a le covid)
          </div>
        </div>

        <h3>Risque de transmission</h3>
        On part d'une estimation dans le cas le plus simple :
        <div className="center_gray">
          Risque de transmission durant une conversation de 1h sans masque, en intérieur, avec quelqu'un qui a le covid : 6%
        </div>
        Puis l'on multiplie cette probabilité de transmission par divers modificateurs (voir <a href="http://microcovid.org/paper/">Microcovid</a> pour plus de détails et les
        sources):
        <br /> <br />
          <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Modification de l'activité</StyledTableCell>
                <StyledTableCell align="right">Facteur de risque</StyledTableCell>
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

    <h3>Profil de risque de la personne</h3>
    Pour obtenir le risque total, il faut ensuite comme on l'a vu plus haut multiplier le risque de transmission par la probabilité que la personne ait le covid.
    Plusieurs méthodes sont possibles pour calculer cela :
    <ul style={{listStylePosition: 'inside', margin:'15px'}}>
    <li>Calculer le risque directement. Mais la question se pose à nouveau dans ce calcul pour les personnes que la personne fréquente. Par conséquent, il
      faut utiliser d'autres méthodes pour éviter une boucle infinie;
    </li>
    <li style={{marginTop:'5px'}}> Utiliser la prévalence (autrement dit la probabilité qu'une personne au hasard ait le covid);</li>
    <li style={{marginTop:'5px'}}> Ajuster cette prévalence en fonction de profils de risques généraux (par exemple travailleur de première ligne, personne qui télétravaille et socialise peu, etc.)</li>
    </ul>
    Nos calculs utilisent la troisième méthode, en définissant plusieurs profils de risque : les personnes travaillant en première ligne ou socialisant beaucoup (x3), et
    les personnes télétravaillant et socialisant peu (/3).
    <p>
      Pour calculer la prévalence, nous utilisons 
      <a href="https://www.data.gouv.fr/en/datasets/donnees-hospitalieres-relatives-a-lepidemie-de-covid-19/"> les données du gouvernemnt</a> relatives au nombre d'hospitalisations
      et au nombre de réanimations. Ensuite, nous utilisons <a href='https://hal-pasteur.archives-ouvertes.fr/pasteur-02548181'>les analyses de l'institut Pasteur</a> (qui fournissent
      des estimations de la probabilité d'être hospitalisé et d'aller en réa par classe d'âge), pour en déduire une estimation du nombre réel de cas. Il suffit alors
      de diviser ce nombre par la population totale pour obtenir la prévalence. Un exemple de calcul peut être trouvé <a href="https://colab.research.google.com/drive/1P5Ua-gSNlUFDnI_7GjwCN0ZT-kxcWlpL?usp=sharing"> ici</a>.
    </p>
    En résumé, le risque sur 1h est donné par :
    <div className="visible_except_mobile">
        <div className="Math">
            [Risque de base] x [facteurs de modification] x [profil de risque de B] x [Prevalence] 
        </div>
    </div>
    <div className="visible_mobile_only">
        <div className="Math">
            [Risque de base] x [facteurs de modification] x [profil de risque de B] x [Prevalence] 
        </div>
    </div>

    <br/>
    <h3>Durée et nombre de personnes</h3>
    Tout cela donne le risque de transmission lié à l'activité pendant une heure. Pour obtenir le risque lié à la pratique de l'activité plusieurs heures durant, on calcule
    la probabilité d'être contaminé durant au moins une de ces heures. Autrement dit, l'inverse de n'être contaminé pendant aucune des heures en question. Si le risque sur
    1h est p, alors celui d'être contaminé sur n heures sera :
    <div className="visible_except_mobile">
        <div className="Math">
            P(contamination en n heures) = 1 - (1-p)<sup>n</sup>
        </div>
    </div>
    <div className="visible_mobile_only">
        <div className="Math">
            P(contamination en n heures) = 1 - (1-p)<sup>n</sup>
        </div>
    </div>
    <p>
    Nous limitons dans notre calcul le risque lié à une personne donnée (quel que soit le nombre d'heures en une semaine) à 50%, ce qui représente environ le risque
    d'être contaminé par un partenaire ayant le covid en une semaine.
    </p>
    <p>
    Lorsque plusieurs personnes participent à l'activité, on calcule la probabilité de transmission pour chacune, puis la probabilité d'être contaminé par au moins une de ces
    personnes, suivant le même calcul que précédemment. Si la probabilité de contamination par une personne est P, alors pour N personnes :
    </p>
    <div className="visible_except_mobile">
        <div className="Math">
            P(contamination avec N personnes) = 1 - (1-P)<sup>N</sup>
        </div>
    </div>
    <div className="visible_mobile_only">
        <div className="Math">
            P(contamination avec N personnes) = 1 - (1-P)<sup>N</sup>
        </div>
    </div>
    <p>
    Notons qu'il s'agit là de la différence majeure entre notre algorithme et celui de Microcovid, qui additionne les risques liés à chaque heure et chaque personne.
    Il s'agit d'une approximation fonctionnant bien pour les risques très faibles, mais surestimant généralement le résultat total.
    </p>
    <br />
    <h2 ref={this.refImpact}>2. Impact sur l'épidémie</h2>
    <p>
    Le calcul précédent nous permet d'estimer le risque individuel, autrement dit la probabilité d'être contaminé en fonction de ses activités sur une semaine.
    Cela ne nous dit toutefois pas quel peut être l'impact de ce risque à l'échelle de l'épidémie. Autrement dit, contribuons-nous à accélérer, ou freiner, la circulation du virus?
    </p>
    <p>
    Prédire le déroulement de l'épidémie en situation réelle est une tâche extrêmement compliquée (certains d'entre nous ont travaillé sur ce sujet et peuvent en témoigner) de par
    le nombre de paramètres à prendre en compte et le degré d'incertitude, qui imposent des intervalles de confiance importants.
    </p>
    <p>
    Toutefois, il est possible de donner une réponse aux questions ci-dessus en simplifiant le problème de la façon suivante :
    </p>
    <div className="center_gray">
        Comment l'épidémie évoluerait-elle si tout le monde avait le même profil de risque que moi ?
    </div>
    Cette simplification permet de calculer l'évolution de l'épidémie de façon relativement simple, en utilisant une variante de
    modèle <a href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology">SEIR</a>. On fait l'hypothèse qu'il n'y a pas de réinfections
    (ou un nombre négligeable), et on note :
    <ul style={{listStylePosition: 'inside', margin:'15px'}}>
      <li> S(t) le nombre de personnes susceptibles à l'instant t (autrement dit pouvant être infectés, et n'étant pas immunisés);
      </li>
      <li style={{marginTop:'5px'}}>E(t) le nombre de personnes exposées à l'instant t (infectées par le virus mais pas encore contagieuses)</li>
      <li style={{marginTop:'5px'}}>I(t) le nombre de personnes infectées contagieuses</li>
      <li style={{marginTop:'5px'}}>R(t) le nombre de personnes ayant récupéré et étant immunisées</li>
    </ul>
    <img src={seir_image} alt="SEIR" className="seir_image" />
    <p>
    Comme dans le modèle SEIR, les transitions de E vers I et de I vers R se font à taux constants (respectivement alpha et gamma, qui représentent l'inverse de
    la durée d'incubation et de la durée de contagiosité). Nous avons estimé la période d'incubation à environ 5 jours
    (source : <a href="https://www.acpjournals.org/doi/full/10.7326/M20-0504">[Lauer et Al]</a>,
    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7157951/">[Saghazadeh et Al.]</a>), et la durée de contagiosité (temps moyen entre contamination et isolement) 
    à 2.9 jours (source : <a href="https://www.sciencedirect.com/science/article/pii/S1473309920301444#bib15">[Kucharski et Al.]</a>)
    
    Toutefois, le calcul du nombre de nouveaux contaminés est différent du modèle classique : on somme la probabilité
    de contamination de chaque personne susceptible pour obtenir le nombre moyen de contaminés.
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
    Où S<sub>i</sub> sont les individus susceptibles, et la probabilité de contamination pour chaque personne est calculée suivant la formule de la section précédente, en utilisant une prévélence de I(t)/N, autrement dit la
    probabilité qu'une personne aléatoire ait le virus à l'instant t.
    <br/>
    Notons que contrairement au modèle SEIR classique, dès qu'une activité implique plus d'une personne ou une durée de plus d'une heure, le risque de chaque individu n'est pas
    proportionel à la prévalence.
    <br /><br/>
    <h2 ref={this.refFamily}>3. Réunions familiales</h2>
    <p>
    L'un des enjeux les plus importants de l'épidémie est la période des fêtes de la fin 2020. Les personnes âgées sont particulièrement vulnérables et susceptibles d'être
    hospitalisées et de mourir du virus, tandis que les jeunes adultes sont généralement la population socialisant le plus et étant donc les plus susceptibles d'être contaminés.
    Par conséquence, les réunions familiales, qui par nature mettent en contact les différentes classes d'âge, peuvent avoir des conséquences désastreuses si elles ne sont pas
    soigneusement préparées.
    </p>
    <p>
    Nous avons par conséquent utilisé l'algorithme de calcul de risque pour créer un simulateur de réunion familiale. En entrant un ensemble d'activités via le calculateur,
    ansi que des participants à la réunion, il estime la probabilité que l'un d'entre eux développe une forme grave, et fait le bilan à l'échelle de la France.
    </p>
    <p>
      Pour cela, nous avons utilisé le calculateur de risque pour évaluer la probabilité de contamination, puis
      les <a href='https://hal-pasteur.archives-ouvertes.fr/pasteur-02548181'>estimations</a> de l'Institut Pasteur afin de calculer la probabilité
      d'hospitalisation, de réa et de mort une fois contaminé, pour chaque personne de la réunion en fonction de son âge.
    </p>
    <p>
      Il a ensuite fallu estimer le nombre de réunions familiales. Nous sommes partis de la population française (66 millions), en retranchant un pourcentage déjà infecté
      (nous avons calculé, à partir du nombre de réanimations, qu'entre 10 et 14% de la population était déjà infectée début Décembre 2020). Nous considérons
      56 millions de personnes susceptibles restantes (cas le plus large). Parmi eux, nous estimons que 3 personnes sur 4 iront à au moins une réunion familiale
      dans l'année, ce qui donne 42 millions de personnes allant à des rassemblements.
    </p>
    <p>
      Pour finir, nous estimons la taille du rassemblement familial standard à 6 personnes (suivant la règle du gouvernement), pour estimer le nombre de réunions à 7 millions.
      Cela permet d'obtenir le nombre estimé d'hospitalisations, de réanimations et de morts à l'échelle de la France.
    </p>
    <h3 ref={this.refMe}>A propos</h3>
    Initiative bénévole, sous la direction de <a href="https://www.linkedin.com/in/raphaelettedgui/">Raphaël Ettedgui</a> (Ecole Polytechnique, PhD à l'université Paris-Dauphine). Le code source est disponible sur 
    <a href="https://github.com/RaphaelEttedgui/covinsights-website"> GitHub</a>.
    <br /><br />

    Illustrations réalisées par <a href="https://shyrka-animation-2d.jimdosite.com/">Shyrka</a>. Pour en découvrir plus sur son travail, visitez son site !
    <div style={{width:"100%", marginTop:'1em', alignItems:"center"}}>
    <div className="centered">
    <a href="https://shyrka-animation-2d.jimdosite.com/"><img src={logo_shyrka} alt="logo shyrka" style={{height:'100%', width:'100%'}}/> </a>
    </div>
    </div>
    </div>
    </div>
  )
  }
}

export default WhitePaper;