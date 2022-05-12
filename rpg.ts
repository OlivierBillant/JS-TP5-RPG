class Joueur {
    private hp:number = 150;
    private score:number = 0;

    constructor() {}

    getHp():number{
        return this.hp;
    }

    setHp(degats:number){
        this.hp = this.hp - degats;
    }

    getScore():number{
        return this.score;
    }

    increaseScore(valeurMonstre){
        this.score += valeurMonstre;
    }

    isAlive():boolean{
        if(this.getHp() >= 0){
            return true;
        }else{
            return false;
        }
    }

    attack(monstre){
        let de = new De(6);
        let lanceJoueur:number = de.lanceDe();
        console.log("Le joueur fait : "+lanceJoueur);
        
        let lanceMonstre:number = de.lanceDe();
        console.log("Le monstre fait : "+lanceMonstre);

        if(lanceJoueur >= lanceMonstre){
            this.increaseScore(monstre.getValeur());
            console.log("Le monstre est vaincu")
        }else{
            monstre.isDead();
        }
    }

    esquive():boolean{
        let de = new De(6);
        let lanceBouclier = de.lanceDe();
        if(lanceBouclier <= 2){
            console.log("Le joueur esquive l'attaque !");
            return true;
        }else{
            console.log("Le joueur s'en prend plein la tête !");
            return false;
        }
    }
}

abstract class Monstre {
    valeur:number;
    status:boolean = true;
    constructor(valeur:number){
        this.valeur = valeur
     }

    abstract attack(joueur);

    getValeur(){
        return this.valeur;
    }
    isDead(){
        this.status = false;
    }

    isAlive():boolean{
        return this.status;
    }
}

class MonstreFacile extends Monstre {
    constructor(valeur:number) {
        super(valeur);
    }
    
    attack(joueur){
        let de = new De(6);
        let lanceJoueur:number = de.lanceDe();
        console.log("Le joueur fait : "+lanceJoueur);
        
        let lanceMonstre:number = de.lanceDe();
        console.log("Le monstre fait : "+lanceMonstre);

        if(lanceJoueur <= lanceMonstre){
            console.log("Le joueur tente une esquive")
            if (!joueur.esquive()){
                joueur.setHp(10);
            }
        }
    }
}
class MonstreDifficle extends Monstre {
    constructor(valeur:number) {
        super(valeur);
    }

    attack(joueur){
        let de = new De(6);
        let lanceJoueur:number = de.lanceDe();
        console.log("Le joueur fait : "+lanceJoueur);
        
        let lanceMonstre:number = de.lanceDe();
        console.log("Le monstre fait : "+lanceMonstre);

        if(lanceJoueur <= lanceMonstre){
            console.log("Le joueur tente une esquive")
            if (!joueur.esquive()){
                joueur.setHp(10);
            }
        }
        console.log("Le monstre tente de lancer un sort");
        let lanceMagique = de.lanceDe();
        if(lanceMagique == 6){
            console.log("LE SORT REUSSI !!!");
            
            joueur.setHp(10*5);
        }
    }
}

function rencontreAleatoire():Monstre{
    let de = new De(2);
    if(de.lanceDe() == 1){
        let slime = new MonstreFacile(1);
        return slime
    }else{
        let orc = new MonstreDifficle(2);
        return orc;
    }
}

class De {
    nombreFace:number;
    resultat:number;

    constructor(nombreFace:number){
        this.nombreFace = nombreFace;
    }

    lanceDe():number{
        return Math.floor(Math.random()*(this.nombreFace+1));
    }
}

let player1 = new Joueur();
console.log(player1.getHp());

do {
    let monstre = rencontreAleatoire();
    // let monstre = new MonstreFacile(1);
    player1.attack(monstre);
    console.log("Etat du joueur : "+player1.getHp()+" "+player1.getScore());
    monstre.attack(player1);
} while (player1.isAlive());
console.log("Le joueur est mort, son score est de  : "+player1.getScore());
