export default [
    {
      name: "Repas à 2 en intérieur",
      wearMask: false,
      duration:90,
      nbPeople: 1,
      nbMasked: 0,
      location: "indoors",
      talking: "normal",
      distance: "normal",
      riskProfile: "normal",
    },
    {
        name: "Bar",
        wearMask: false,
        duration:120,
        nbPeople: 15,
        nbMasked: 0,
        location: "indoors",
        talking: "normal",
        distance: "normal",
        riskProfile: "worker",
    },
    {
        name: "Aventure d'un soir",
        wearMask:false,
        duration:300,
        nbPeople:1,
        nbMasked:0,
        outdoors:false,
        talking:"loud",
        distance:"close",
        riskProfile:"worker",
    },
    {
        name: "Cours de danse (partenaire fixe)",
        wearMask: true,
        duration:60,
        nbPeople: 20,
        nbMasked: 20,
        location: "indoors",
        talking: "normal",
        distance: "normal",
        riskProfile: "normal",
    },
    {
        name: "Concert (gradins, avec masque)",
        wearMask: true,
        duration:120,
        nbPeople: 10,
        nbMasked: 10,
        location: "indoors",
        talking: "loud",
        distance: "normal",
        riskProfile: "normal",
    },
    {
        name:"Concert (fosse, avec masque)",
        wearMask: true,
        duration: 120,
        nbPeople: 100,
        nbMasked: 100,
        location: "indoors",
        talking: "loud",
        distance: "normal",
        riskProfile: "normal",
    },
    {
        name:"Ecole / Université (une journée)",
        nbPeople: 10,
        duration: 480,
        wearMask: true,
        nbMasked: 10,
        location: "indoors",
        distance: "long",
        talking: 'quiet',
        riskProfile: "normal",
    },
    {
        name:"File d'attente(30mn)",
        wearMask: true,
        duration: 30,
        nbPeople: 4,
        nbMasked: 4,
        location: "indoors",
        talking: "normal",
        distance: "normal",
        riskProfile: "normal",
    },
    {
        name:"Nourriture à emporter (avec masque)",
        nbPeople:1,
        duration:5,
        wearMask: true,
        nbMasked:1,
        location: "indoors",
        distance:"long",
        talking:'quiet',
        riskProfile: "normal",
    },
    {
        name:"Promenade",
        nbPeople:3,
        duration:60,
        wearMask: false,
        nbMasked:0.,
        location: "outdoors",
        distance:"veryLong",
        talking:'quiet',
        riskProfile: "normal",
    },
    {
        name:"Repas à 2 en extérieur",
        nbPeople:1,
        duration:90,
        wearMask: false,
        nbMasked:0.,
        location: "outdoors",
        distance:"normal",
        talking:'normal',
        riskProfile: "normal",
    },
    {
        name:"Bibliothèque/musée (avec masque)",
        nbPeople:5,
        duration:120,
        wearMask:true,
        nbMasked:5,
        outdoors:false,
        distance:"long",
        talking:'quiet',
        riskProfile: "normal",
    },
    {
        name:"Faire ses courses",
        nbPeople:10,
        duration:30,
        wearMask:true,
        nbMasked:10,
        outdoors:false,
        distance:"normal",
        talking:'quiet',
        riskProfile: "worker",
    },
    {
        name:"Pique-nique de 2h",
        nbPeople:5,
        duration:120,
        wearMask:false,
        nbMasked:0,
        location:"outdoors",
        distance:"normal",
        talking:'normal',
        riskProfile: "normal",
    },
    {
        name:"Travail en open space",
        nbPeople:10,
        duration:480,
        wearMask:true,
        nbMasked:10,
        outdoors:false,
        distance:"long",
        talking:'quiet',
        riskProfile: "normal",
    },
    {
        name:"Transports en commun (1h)",
        nbPeople:20,
        duration:60,
        wearMask:true,
        nbMasked:20,
        outdoors:false,
        distance:"normal",
        talking:'quiet',
        riskProfile: "normal",
    },
    {
        name:"Dîner entre amis de 2h",
        nbPeople:4,
        duration:120,
        wearMask:false,
        nbMasked:0,
        outdoors:false,
        distance:"normal",
        talking:'normal',
        riskProfile: "normal",
    },
    {
        name:"Cinema/Théâtre",
        nbPeople:50,
        duration:120,
        wearMask:true,
        nbMasked:50,
        outdoors:false,
        distance:"long",
        talking:'quiet',
        riskProfile: "normal",
    },
    {
        name:"Théâtre(1er rang)",
        nbPeople:8,
        duration:120,
        wearMask:true,
        nbMasked:0,
        outdoors:false,
        distance:"long",
        talking:'loud',
        riskProfile: "worker",
    },
    {
        name:"Soirée jeux de 3h à 5 personnes",
        nbPeople:4,
        duration:180,
        wearMask:false,
        nbMasked:0,
        outdoors:false,
        distance:"normal",
        talking:'normal',
        riskProfile: "normal",
    },
    {
        name:"Uber (30mn)",
        nbPeople:1,
        duration:30,
        wearMask:true,
        nbMasked:1,
        location:"car",
        distance:"normal",
        talking:'normal',
        riskProfile: "normal",
    }
  ]
  