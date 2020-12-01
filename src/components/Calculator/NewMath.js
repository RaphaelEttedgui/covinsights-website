class Universe{
	/*
	The universe class contains the prevalence at time, as well as the
	probabilities of changing state. There should be a common universe to
	all persons and activities in an experiment, for easy update.
	*/
	constructor(prevalence){
		this.prevalence = prevalence;
	}
	
	setPrevalence(prevalence){
		this.prevalence = prevalence;
	}
	/*
	- Probability of being hospitalized if infected;
	- Probability of needing ICU if hospitalized;
	- Probability of dying if hospitalized.
	All the numbers come from the paper of Institut Pasteur :
	"Estimating the burden of SARS-CoV-2 in France"
	https://hal-pasteur.archives-ouvertes.fr/pasteur-02548181/document
	*/
	ageFactors(age="20", gender="ND"){
		var hospAgeFactor, reaAgeFactor, deathAgeFactor;
		if(gender==="M"){
			if (age < 20){
				hospAgeFactor = 0.1;
				reaAgeFactor = 17.5;
				deathAgeFactor = 1.2;
			}
			else if (age < 30){
				hospAgeFactor = 0.6;
				reaAgeFactor = 12.2;
				deathAgeFactor = 1.3;
			}
			else if (age < 40){
				hospAgeFactor = 1.2;
				reaAgeFactor = 17.2;
				deathAgeFactor = 2.5;
			}
			else if (age < 50){
				hospAgeFactor = 1.6;
				reaAgeFactor = 24.3;
				deathAgeFactor = 3.9;
			}
			else if (age < 60){
				hospAgeFactor = 3.2;
				reaAgeFactor = 31.7;
				deathAgeFactor = 7.5;
			}
			else if (age < 70){
				hospAgeFactor = 7.0;
				reaAgeFactor = 36.4;
				deathAgeFactor = 14.2;
			}
			else if (age < 80){
				hospAgeFactor = 11.4;
				reaAgeFactor = 29.0;
				deathAgeFactor = 25.3;
			}
			else{
				hospAgeFactor = 31.4;
				reaAgeFactor = 5.7;
				deathAgeFactor = 42.0;
			}
		}
		else if(gender==="F"){
			if (age<20){
				hospAgeFactor = 0.09;
				reaAgeFactor = 8.5;
				deathAgeFactor = 0.;
			}
			else if (age<30){
				hospAgeFactor = 0.5;
				reaAgeFactor = 6.8;
				deathAgeFactor = 1.4;
			}
			else if (age<40){
				hospAgeFactor = 0.9;
				reaAgeFactor = 10.4;
				deathAgeFactor = 1.6;
			}
			else if (age<50){
				hospAgeFactor = 1.3;
				reaAgeFactor = 14.3;
				deathAgeFactor = 3.2;
			}
			else if (age<60){
				hospAgeFactor = 2.5;
				reaAgeFactor = 19.0;
				deathAgeFactor = 6.4;
			}
			else if (age<70){
				hospAgeFactor = 5.3;
				reaAgeFactor = 21.6;
				deathAgeFactor = 12.0;
			}
			else if (age<80){
				hospAgeFactor = 8.0;
				reaAgeFactor = 17.0;
				deathAgeFactor = 20.7;
			}
			else{
				hospAgeFactor = 15.9;
				reaAgeFactor = 3.4;
				deathAgeFactor = 34.0;
			}
		}
		// si gender non défini on met la moyenne
		else{
			if (age<20){
				hospAgeFactor = 0.1;
				reaAgeFactor = 13.5;
				deathAgeFactor = 0.6;
			}
			else if (age<30){
				hospAgeFactor = 0.5;
				reaAgeFactor = 9.8;
				deathAgeFactor = 1.4;
			}
			else if (age<40){
				hospAgeFactor = 1.0;
				reaAgeFactor = 14.1;
				deathAgeFactor = 2.1;
			}
			else if (age<50){
				hospAgeFactor = 1.5;
				reaAgeFactor = 19.8;
				deathAgeFactor = 3.6;
			}
			else if (age<60){
				hospAgeFactor = 2.8;
				reaAgeFactor = 25.9;
				deathAgeFactor = 7.0;
			}
			else if (age<70){
				hospAgeFactor = 6.1;
				reaAgeFactor = 29.7;
				deathAgeFactor = 13.2;
			}
			else if (age<80){
				hospAgeFactor = 9.6;
				reaAgeFactor = 23.5;
				deathAgeFactor = 23.2;
			}
			else{
				hospAgeFactor = 21.7;
				reaAgeFactor = 4.6;
				deathAgeFactor = 38.4;
			}
		}
		return [hospAgeFactor/100, reaAgeFactor/100, deathAgeFactor/100];	
	}
}

class BasicUniverse extends Universe{
	constructor(){
		super(0.010); // Prevalence in early November in France.
	}
}

class RiskProfile{
	constructor(type="basic"){
		this.type = type;
	}
	
	getProfileRisk(){
		return 1.0;
	}
}

class NonWorkerRiskProfile extends RiskProfile{
	constructor(){
		super("nonWorker");
	}
	getProfileRisk(){
		return 1.0 / 3.0;
	}
}

class WorkerRiskProfile extends RiskProfile{
	constructor(){
		super("worker");
	}
	getProfileRisk(){
		return 3.0;
	}
}

class CustomActivity{
    constructor(name="an activity", duration=60, nb_people=1, mask=false, maskProportion=0., talking="normal", location="indoors", distance="normal", riskProfile=new RiskProfile()){
		this.name = name;
		this.duration=duration;
		this.nb_people = nb_people;
		this.mask = mask;
		this.maskProportion = maskProportion;
		this.talking = talking;
		this.location=location;
		this.distance=distance;
		this.hours = Math.floor(duration/60);
        this.minutes = duration % 60;
        this.riskProfile=riskProfile;
	}
    
    getRisk(){
		var risk = 0.06
		if (this.mask){
			risk = risk / 2;
		}
		risk = risk * (1 - 0.75 * this.maskProportion);
		if (this.location=="outdoors"){
			risk = risk / 20;
        }
        if (this.location=="train" || this.location=="car"){
			risk = risk / 4;
        }
        if (this.location=="plane"){
			risk = risk / 6;
		}
		if (this.talking === "loud"){
			risk = risk * 5;
		}
		if (this.talking === "quiet"){
			risk = risk / 5;
		}
		if (this.distance ==="close"){
			risk = risk * 2;
		}
		if (this.distance === "long"){
			risk = risk /2;
		}
		if (this.distance === "veryLong"){
			risk = risk /4;
		}
        risk = risk * this.riskProfile.getProfileRisk();
        // This, multiplied by the prevalence, gives the probability of getting covid from a 1h interaction with the person
		return [risk, this.hours, this.minutes, this.nb_people];
	}
}

class Person extends RiskProfile{
	constructor(name, age, gender="ND", activity_list=[], universe = new BasicUniverse()){
		super(universe);
		this.name = name;
		this.age = age;
		this.gender = gender;
		this.activityList = activity_list;
		this.universe = universe;
		this.ageFactors = this.universe.ageFactors(this.age, this.gender);
	}
	
	addActivity(activity){
		this.activityList.push(activity);
	}
	
	clearActivityList(){
		// Javascript has a garbage collector so no need to care about memory release.
		this.activityList = [];
	}
	
	getRisk(){
		// Returns the probability of having the disease
		var risk=1;
		if(this.activityList === undefined || this.activityList.length === 0)
		{
			return 0;
		}
		var i=0;
		for(i=0; i<this.activityList.length; i++)
		{
            var myActi = this.activityList[i].getRisk(); // [risk, hours, minutes, nb_people]
            var myRisk = myActi[0] * this.universe.prevalence;
            // Handle duration
			var composedRisk = 1 - Math.pow((1-myRisk),myActi[1])*(1-myRisk*myActi[2]/60);
			// We hardcap the risk from one single person to the household value, 0.5.
			if(composedRisk>0.5){
				composedRisk=0.5;
			}
            // Handle nb people
            var totalRisk = Math.pow((1-composedRisk), myActi[3]); // gives 1-the risk

			risk = risk*totalRisk;
        }
        risk=1-risk;
		return risk;
	}
	
	computeAgeDangerProfile(){
		// Probability of catching the disease, being hospitalized, ICU, death.
		var risk = this.getRisk();
		var riskHosp = risk * this.ageFactors[0];
		var riskRea = riskHosp * this.ageFactors[1];
		var riskDeath = riskHosp * this.ageFactors[2];
		return [risk, riskHosp, riskRea, riskDeath];
	}
}



class Interaction{
	constructor(name){
		this.name = name;
	}
	
	getRisk(){
		return 0;
	}
}

class InteractionOne extends Interaction{
	constructor(name="an activity", duration=60, maskA=false, maskB=false, talking="normal", outdoors=false, distance="normal"){
		/* A one on one interaction. Options are :
		talking = "normal", "loud" (x3), "quiet" (/3)
		outdoors (/20)
		distance = "normal", "close" (x2), "long" (/2) */
		super(name);
		this.duration=duration;
		this.maskA=maskA;
		this.maskB=maskB;
		this.talking = talking;
		this.outdoors=outdoors;
		this.distance=distance;
		this.hours = Math.floor(duration/60);
		this.minutes = duration % 60;
	}
	
	setMask(maskA,maskB){
		this.maskA = maskA;
		this.maskB = maskB;
	}
	
	// Returns the risk of contamination if the other has the disease.
	getActivityRisk(){
		var risk = 0.06
		if (this.maskA){
			risk = risk / 2;
		}
		if (this.maskB){
			risk = risk / 4;
		}
		if (this.outdoors){
			risk = risk / 20;
		}
		if (this.talking === "loud"){
			risk = risk * 5;
		}
		if (this.talking === "quiet"){
			risk = risk / 5;
		}
		if (this.distance ==="close"){
			risk = risk * 2;
		}
		if (this.distance === "long"){
			risk = risk /2;
		}
		if (this.distance === "veryLong"){
			risk = risk /4;
		}
		var finalRisk = 0
		// Adapting the risk to the duration. 6% chance of contamination per hour.
		var i;
		for (i=0; i< this.hours; i++){
			finalRisk = finalRisk + (1-finalRisk)*risk;
		}
		finalRisk = finalRisk + (1-finalRisk)*risk*this.minutes/60;
		return finalRisk;
	}
}

// Recreating the defaultdict from python.
class DefaultDict {
    constructor(defaultVal) {
      return new Proxy({}, {
        get: (target, name) => name in target ? target[name] : defaultVal
      })
    }
  }

class GroupReunion{
	/*
	Simulating a family gathering. The mask policy can be "none", "all", or "under50".
	In the latter, only the people younger than 50 wear a mask.
	Output : the probability that at least one person is sick, hospitalized or dies,
	as well as the average number of hospitalizations, ICU or death.
	Finally, we estimate the number of family gatherings and compute the
	count for the whole country, as the "cost" of christmas.
	*/
	constructor(duration=60, maskPolicy="none", distance="normal", outdoors=false, talking="normal", personList=[]){
		this.duration = duration;
		this.maskPolicy = maskPolicy;
		this.distance = distance;
		this.outdoors = outdoors;
		this.talking = talking;
		this.personList = personList;
		this.generateMasked();
		// We use a one-on-one interaction to compute the various risks.
        this.interaction = new InteractionOne("meeting", this.duration, false, false, this.talking, this.outdoors, this.distance);
		// *** TODO *** Ajouter le calcul du profil de risque.
	}
	
	generateMasked(){
		// Compute who wears a mask according to the mask policy.
		this.masked = new DefaultDict(false);
		if(this.maskPolicy==="all"){
			this.masked = new DefaultDict(true);
		}
		else if(this.maskPolicy==="under50"){
			var i = 0;
			for(i=0; i<this.personList.length;i++){
				if(this.personList[i].age < 50){
					this.masked[i] = true;
				}
			}
		}
	}
	
	addPerson(p){
		this.personList.push(p);
	}
	
	update(){
		this.generateMasked();
		// *** TODO *** Ajouter le calcul de this.riskProfile
	}
	
	computeRiskProfile(){
		/*
		Formulas :
		- Mean number of people hospitalized : sum(p_hosp)
		- Probability that at least one person is hospitalized : 1 - prod(1-p_hosp)
		*/
		var risk = 1.0;
		var hospRisk = 1.0;
		var reaRisk = 1.0;
		var deathRisk = 1.0;
		var moyenneHosp = 0.0;
		var moyenneRea = 0.0;
		var moyenneDeaths = 0.0;
		var i;
		for(i=0; i<this.personList.length;i++){
			var myRisk = this.personList[i].get_risk();
			// We update the probability that no-one has the disease
			risk = risk * (1-myRisk);
			var j;
			for(j=0; j<this.personList.length; j++){
				this.interaction.setMask(this.masked[i], this.masked[j]);
				// Updating the risk for person i by taking into account the possible
				// contamination by person j.
				myRisk = myRisk + (1-myRisk)*this.interaction.getActivityRisk()*this.personList[j].getRisk();
			}
			var hospProba = this.personList[i].ageFactors[0];
			var reaProba = this.personList[i].ageFactors[1];
			var deathProba = this.personList[i].ageFactors[2];
			// Updating the proba that no-one gets hospitalized
			hospRisk = hospRisk * (1 - myRisk*hospProba);
			reaRisk = reaRisk * (1 - myRisk*hospProba*reaProba)
			deathRisk = deathRisk  *(1 - myRisk*hospProba*deathProba)
			// Updating the average number of hospitalizations
			moyenneHosp = moyenneHosp + myRisk*hospProba
			moyenneRea = moyenneRea + myRisk*hospProba*reaProba
			moyenneDeaths = moyenneDeaths + myRisk*hospProba*deathProba
		}
		risk = 1-risk;
		hospRisk = 1-hospRisk;
		reaRisk = 1-reaRisk;
		deathRisk = 1-deathRisk;
		return [risk, hospRisk, reaRisk, deathRisk, moyenneHosp, moyenneRea, moyenneDeaths];
	}
}

export {BasicUniverse, CustomActivity, Person, Universe, GroupReunion, RiskProfile, NonWorkerRiskProfile, WorkerRiskProfile, InteractionOne};