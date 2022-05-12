var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Joueur = /** @class */ (function () {
    function Joueur() {
        this.hp = 150;
        this.score = 0;
        this.kcFacile = 0;
        this.kcFDifficile = 0;
    }
    Joueur.prototype.getHp = function () {
        return this.hp;
    };
    Joueur.prototype.esquive = function () {
        var de = new De(6);
        var lanceBouclier = de.lanceDe();
        console.log("Le joueur tente une esquive");
        if (lanceBouclier <= 2) {
            console.log("Le joueur esquive l'attaque !");
            return true;
        }
        else {
            console.log("Le joueur s'en prend plein la tête !");
            return false;
        }
    };
    Joueur.prototype.subitDegatsNormaux = function () {
        var degats = 10;
        if (!this.esquive()) {
            this.hp = this.hp - degats;
            // condition positivite
        }
    };
    Joueur.prototype.subitDegatsMagiques = function () {
        var degats = 10;
        var multiplicateurMagique = 5;
        this.hp = this.hp - degats * multiplicateurMagique;
    };
    Joueur.prototype.getScore = function () {
        return this.score;
    };
    Joueur.prototype.getKcFacile = function () {
        return this.kcFacile;
    };
    Joueur.prototype.getKcDifficile = function () {
        return this.kcFDifficile;
    };
    Joueur.prototype.increaseScore = function (valeurMonstre) {
        this.score += valeurMonstre;
    };
    Joueur.prototype.isAlive = function () {
        if (this.getHp() > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Joueur.prototype.attack = function (monstre) {
        var de = new De(6);
        var lanceJoueur = de.lanceDe();
        // console.log("Le joueur fait : " + lanceJoueur);
        var lanceMonstre = de.lanceDe();
        // console.log("Le monstre fait : " + lanceMonstre);
        if (lanceJoueur >= lanceMonstre) {
            this.increaseScore(monstre.getValeur());
            monstre.isDead();
            console.log("Le monstre est vaincu");
        }
        else {
            console.log("Le monstre resiste...");
        }
    };
    Joueur.prototype.scoring = function (monstre) {
        if (monstre.constructor["name"] == "MonstreFacile") {
            this.kcFacile++;
        }
        else {
            this.kcFDifficile++;
        }
    };
    return Joueur;
}());
var Monstre = /** @class */ (function () {
    function Monstre(valeur) {
        this.status = true;
        this.valeur = valeur;
    }
    Monstre.prototype.getValeur = function () {
        return this.valeur;
    };
    Monstre.prototype.isDead = function () {
        this.status = false;
    };
    Monstre.prototype.isAlive = function () {
        return this.status;
    };
    Monstre.prototype.attack = function (joueur) {
        var de = new De(6);
        var lanceJoueur = de.lanceDe();
        // console.log("Le joueur fait : " + lanceJoueur);
        var lanceMonstre = de.lanceDe();
        // console.log("Le monstre fait : " + lanceMonstre);
        if (lanceJoueur < lanceMonstre) {
            joueur.subitDegatsNormaux();
        }
    };
    return Monstre;
}());
var MonstreFacile = /** @class */ (function (_super) {
    __extends(MonstreFacile, _super);
    function MonstreFacile(valeur) {
        return _super.call(this, valeur) || this;
    }
    return MonstreFacile;
}(Monstre));
var MonstreDifficle = /** @class */ (function (_super) {
    __extends(MonstreDifficle, _super);
    function MonstreDifficle(valeur) {
        return _super.call(this, valeur) || this;
    }
    MonstreDifficle.prototype.attack = function (joueur) {
        _super.prototype.attack.call(this, joueur);
        console.log("Le monstre tente de lancer un sort");
        var de = new De(6);
        var lanceMagique = de.lanceDe();
        if (lanceMagique == 6) {
            console.log("LE SORT REUSSI !!!");
            joueur.subitDegatsMagiques();
        }
        else {
            console.log("Le sort échoue...");
        }
    };
    return MonstreDifficle;
}(Monstre));
function rencontreAleatoire() {
    var de = new De(2);
    if (de.lanceDe() == 1) {
        return new MonstreFacile(1);
    }
    else {
        return new MonstreDifficle(2);
    }
}
var De = /** @class */ (function () {
    function De(nombreFace) {
        this.nombreFace = nombreFace;
    }
    De.prototype.lanceDe = function () {
        return Math.floor(Math.random() * (this.nombreFace + 1));
    };
    return De;
}());
var player1 = new Joueur();
console.log(player1.getHp());
do {
    var monstre = rencontreAleatoire();
    console.log("Le joueur affronte un nouveau " + monstre.constructor["name"]);
    do {
        player1.attack(monstre);
        if (monstre.isAlive()) {
            monstre.attack(player1);
            console.log("Etat du joueur : " + player1.getHp() + " " + player1.getScore());
        }
        else {
            player1.scoring(monstre);
        }
    } while (monstre.isAlive() && player1.isAlive());
} while (player1.isAlive());
console.log("Le joueur est mort, son score est de : " + player1.getScore()
    + " il a tué " + player1.getKcFacile() + " monstres faciles et " + player1.getKcDifficile() + " monstres difficiles");
