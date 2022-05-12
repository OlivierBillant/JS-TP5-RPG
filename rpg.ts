class Joueur {
    private hp: number = 150;
    private score: number = 0;
    private kcFacile:number = 0;
    private kcFDifficile:number = 0;

    constructor() { }

    getHp(): number {
        return this.hp;
    }

    esquive(): boolean {
        let de = new De(6);
        let lanceBouclier = de.lanceDe();
        console.log("Le joueur tente une esquive")
        if (lanceBouclier <= 2) {
            console.log("Le joueur esquive l'attaque !");
            return true;
        } else {
            console.log("Le joueur s'en prend plein la tête !");
            return false;
        }
    }

    subitDegatsNormaux() {
        let degats = 10;
        if (!this.esquive()) {
            this.hp = this.hp - degats;
            // condition positivite
        }
    }

    subitDegatsMagiques() {
        let degats = 10;
        let multiplicateurMagique = 5;
        this.hp = this.hp - degats * multiplicateurMagique;
    }

    getScore(): number {
        return this.score;
    }

    getKcFacile():number{
        return this.kcFacile;
    }

    getKcDifficile():number{
        return this.kcFDifficile;
    }

    increaseScore(valeurMonstre) {
        this.score += valeurMonstre;
    }

    isAlive(): boolean {
        if (this.getHp() > 0) {
            return true;
        } else {
            return false;
        }
    }

    attack(monstre: Monstre) {
        let de = new De(6);
        let lanceJoueur: number = de.lanceDe();
        // console.log("Le joueur fait : " + lanceJoueur);
        let lanceMonstre: number = de.lanceDe();
        // console.log("Le monstre fait : " + lanceMonstre);

        if (lanceJoueur >= lanceMonstre) {
            this.increaseScore(monstre.getValeur());
            monstre.isDead();
            console.log("Le monstre est vaincu")
        } else{console.log("Le monstre resiste...");
        }           
    }

    scoring(monstre){
        if(monstre.constructor["name"] == "MonstreFacile"){
            this.kcFacile++;
        }else{
            this.kcFDifficile++;
        }
    }
}

abstract class Monstre {
    valeur: number;
    status: boolean = true;
    constructor(valeur: number) {
        this.valeur = valeur
    }

    getValeur() {
        return this.valeur;
    }
    isDead() {
        this.status = false;
    }

    isAlive(): boolean {
        return this.status;
    }
    attack(joueur: Joueur) {
        let de = new De(6);
        let lanceJoueur: number = de.lanceDe();
        // console.log("Le joueur fait : " + lanceJoueur);
        let lanceMonstre: number = de.lanceDe();
        // console.log("Le monstre fait : " + lanceMonstre);

        if (lanceJoueur < lanceMonstre) {
            joueur.subitDegatsNormaux();
        }
    }
}

class MonstreFacile extends Monstre {
    constructor(valeur: number) {
        super(valeur);
    }
}

class MonstreDifficle extends Monstre {
    constructor(valeur: number) {
        super(valeur);
    }

    attack(joueur: Joueur) {
        super.attack(joueur);
        console.log("Le monstre tente de lancer un sort");
        let de = new De(6);
        let lanceMagique = de.lanceDe();
        if (lanceMagique == 6) {
            console.log("LE SORT REUSSI !!!");
            joueur.subitDegatsMagiques();
        } else {
            console.log("Le sort échoue...");
        }
    }
}

function rencontreAleatoire(): Monstre {
    let de = new De(2);
    if (de.lanceDe() == 1) {
        return new MonstreFacile(1);
    } else {
        return new MonstreDifficle(2);
    }
}

class De {
    nombreFace: number;
    resultat: number;

    constructor(nombreFace: number) {
        this.nombreFace = nombreFace;
    }

    lanceDe(): number {
        return Math.floor(Math.random() * (this.nombreFace + 1));
    }
}

let player1 = new Joueur();
console.log(player1.getHp());

do {
    let monstre = rencontreAleatoire();
    console.log("Le joueur affronte un nouveau "+monstre.constructor["name"]);
    do{
        
        player1.attack(monstre);
        if(monstre.isAlive()){ 
            monstre.attack(player1);
            console.log("Etat du joueur : " + player1.getHp() + " " + player1.getScore());
        }else{
            player1.scoring(monstre);}
        }while(monstre.isAlive() && player1.isAlive())
} while (player1.isAlive());

console.log("Le joueur est mort, son score est de : " + player1.getScore()
+" il a tué "+player1.getKcFacile()+" monstres faciles et "+player1.getKcDifficile()+" monstres difficiles");
