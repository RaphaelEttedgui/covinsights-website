import {BasicUniverse} from '../Calculator/NewMath.js';

const universe = new BasicUniverse();

export default [
    {
        name: "Careful 50 y.o. man",
        age: '50',
        gender:'M',
        risk: universe.prevalence * 100,
    },
    {
        name: "Careful 50 y.o. woman",
        age : '50',
        gender:'M',
        risk: universe.prevalence * 100,
    },
    {
        name: 'Grandpa (safe)',
        age: '70',
        gender: 'M',
        risk:'0',
    },
    {
        name: 'Grandma (safe)',
        age: '70',
        gender : 'F',
        risk:0,
    },
    {
        name : 'Party teenager',
        age : '20',
        gender:'ND',
        risk: 10,
    },
    {
        name: 'Socializing kid/teenager',
        age : '20',
        gender:'ND',
        risk: 1,
    },
    {
        name: 'Student / kid going to school',
        age: '20',
        gender: 'ND',
        risk: 0.25,
    },
    {
        name : 'Average middleage person',
        age: '30',
        gender: 'ND',
        risk: universe.prevalence * 100,
    },
    {
        name: 'Middleage frontline worker',
        age: '30',
        gender: 'ND',
        risk: universe.prevalence *100 * 3,
    },
    {
        name : 'Careful middleage person',
        age: '30',
        gender: 'ND',
        risk: universe.prevalence *100 / 3,
    },
    {
        name : 'zero-risk person (after quarantine)',
        age: '30',
        gender : 'ND',
        risk:0,
    }
]