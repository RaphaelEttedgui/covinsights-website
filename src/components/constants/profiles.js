import {BasicUniverse} from '../Calculator/NewMath.js';

const universe = new BasicUniverse();

export default [
    {
        name: "Homme cinquantenaire",
        age: '50',
        gender:'M',
        risk: universe.prevalence * 100,
    },
    {
        name: "Femme cinquantenaire",
        age : '50',
        gender:'M',
        risk: universe. prevalence * 100,
    },
    {
        name: 'Grand-père',
        age: '70',
        gender: 'M',
        risk:'0',
    },
    {
        name: 'Grand-mère',
        age: '70',
        gender : 'F',
        risk:0,
    },
    {
        name : 'Etudiant fêtard',
        age : '20',
        gender:'ND',
        risk: 10,
    },
    {
        name: 'Etudiant qui socialise',
        age : '20',
        gender:'ND',
        risk: 1,
    },
    {
        name: 'Etudiant allant uniquement à l\'école',
        age: '20',
        gender: 'ND',
        risk: 0.25,
    },
    {
        name: 'Personne standard',
        age: '30',
        gender: 'ND',
        risk : universe.prevalence * 100,
    },
    {
        name: 'Travailleur de première ligne',
        age: '30',
        gender: 'ND',
        risk: universe.prevalence * 3*100,
    },
    {
        name : 'Personne surveillant son risque',
        age: '30',
        gender: 'ND',
        risk: universe.prevalence * 100 / 3,
    },
    {
        name : 'Personne ayant fait une quarantaine (zéro-risque)',
        age: '30',
        gender : 'ND',
        risk:0,
    }
]