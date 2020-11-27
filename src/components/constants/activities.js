export default [
    {
      name: "repas à 2 en intérieur",
      wearMask: true,
      duration:90,
      nbPeople: 1,
      nbMasked: 0,
      outdoors: false,
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
        outdoors: false,
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
        outdoors: true,
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
        outdoors: true,
        distance:"normal",
        talking:'normal',
        riskProfile: "normal",
    },
    {
        name:"bibliothèque/musée (avec masque)",
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
        outdoors:true,
        distance:"normal",
        talking:'normal',
        riskProfile: "normal",
    },
    {
        name:"small 2h dinner party",
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
        riskProfile: "normal",
    },
    {
        name:"Soirée jeux de 3h à 5 personnes.",
        nbPeople:4,
        duration:180,
        wearMask:false,
        nbMasked:0,
        outdoors:false,
        distance:"normal",
        talking:'loud',
        riskProfile: "normal",
    }
  ]
  