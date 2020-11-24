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

class InteractionCrowd extends Interaction{
	constructor(name="an activity", duration=60, nb_people=1, mask=false, maskProportion=0., talking="normal", outdoors=false, distance="normal"){
		super(name);
		this.duration=duration;
		this.nb_people = nb_people;
		this.mask = mask;
		this.maskProportion = maskProportion;
		this.talking = talking;
		this.outdoors=outdoors;
		this.distance=distance;
		this.hours = Math.floor(duration/60);
		this.minutes = duration % 60;
	}
	
	getActivityRisk(){
		var risk = 0.06
		if (this.mask){
			risk = risk / 2;
		}
		risk = risk * (1 - 0.75 * this.maskProportion);
		if (this.outdoors){
			risk = risk / 20;
		}
		if (this.talking === "loud"){
			risk = risk * 5;
		}
		if (this.talking === "quiet"){
			risk = risk / 5;
		}
		var finalRisk = 0;
		var totalRisk = 0;
		// Adapting the risk to the duration. 6% chance of contamination per hour.
		var i;
		var j;
		for(j=0; j<this.nb_people; j++){
			finalRisk = finalRisk + (1-finalRisk)*risk;
		}
		for (i=0; i< this.hours; i++){
			totalRisk = totalRisk + (1-totalRisk)*finalRisk;
		}
		totalRisk = totalRisk + (1-totalRisk)*finalRisk*this.minutes/60;
		return totalRisk;
	}
}

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
	ageFactors(age, gender="ND"){
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
		super(0.015); // Prevalence in early November in France.
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

class Activity{
	/* An activity is an interaction plus a risk profile.
	We can access the total risk or just the one related to the interaction. */
	constructor(interaction, riskProfile, universe){
		this.interaction = interaction;
		this.riskProfile = riskProfile;
		this.universe = universe;
	}
	
	getRisk(){
		return this.interaction.getRisk() * this.riskProfile.getProfileRisk() * this.universe.prevalence;
	}
	
	getActivityRisk(){
		return this.interaction.getRisk() * this.riskProfile.getProfileRisk();
	}
}

class Person extends RiskProfile{
	constructor(name, age, gender="ND", activity_list=[], universe = new BasicUniverse()){
		super(universe);
		this.name = name;
		this.age = age;
		this.gender = gender;
		this.activityList = activity_list;
		this.ageFactors = this.universe.ageFactors()
	}
	
	addActivity(activity){
		this.activityList.push(activity);
	}
	
	addInteraction(interaction){
		this.activityList.append(Activity(interaction));
	}
	
	clearActivityList(){
		// Javascript has a garbage collector so no need to care about memory release.
		this.activityList = [];
	}
	
	getRisk(){
		// Returns the probability of having the disease
		var risk=0;
		if(this.activityList === undefined || this.activityList.length === 0)
		{
			return 0;
		}
		var i=0;
		for(i=0; i<this.activityList.length; i++)
		{
			risk = risk + (1-risk)*this.activityList[i].getRisk();
		}
	}
	
	getProfileRisk(){
		// Returns how many time the person is more risky than the average.
		// Multiply par the universe prevalence to get the risk.
		var risk=0;
		if(this.activityList === undefined || this.activityList.length === 0)
		{
			return 0;
		}
		var i=0;
		for(i=0; i<this.activityList.length; i++)
		{
			risk = risk + (1-risk)*this.activityList[i].getActivityRisk();
		}
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
			reaRisk = reaRisk  (1 - myRisk*hospProba*reaProba)
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

export {Interaction, InteractionCrowd, InteractionOne, BasicUniverse, Activity, Person, Universe, GroupReunion, RiskProfile, NonWorkerRiskProfile, WorkerRiskProfile};