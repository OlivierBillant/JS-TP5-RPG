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
    }
    Joueur.prototype.getHp = function () {
        return this.hp;
    };
    Joueur.prototype.setHp = function (degats) {
        this.hp = this.hp - degats;
    };
    Joueur.prototype.getScore = function () {
        return this.score;
    };
    Joueur.prototype.increaseScore = function (valeurMonstre) {
        this.score += valeurMonstre;
    };
    Joueur.prototype.isAlive = function () {
        if (this.getHp() >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Joueur.prototype.attack = function (monstre) {
        var de = new De(6);
        var lanceJoueur = de.lanceDe();
        console.log("Le joueur fait : " + lanceJoueur);
        var lanceMonstre = de.lanceDe();
        console.log("Le monstre fait : " + lanceMonstre);
        if (lanceJoueur >= lanceMonstre) {
            this.increaseScore(monstre.getValeur());
            console.log("Le monstre est vaincu");
        }
        else {
            monstre.isDead();
        }
    };
    Joueur.prototype.esquive = function () {
        var de = new De(6);
        var lanceBouclier = de.lanceDe();
        if (lanceBouclier <= 2) {
            console.log("Le joueur esquive l'attaque !");
            return true;
        }
        else {
            console.log("Le joueur s'en prend plein la tête !");
            return false;
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
    return Monstre;
}());
var MonstreFacile = /** @class */ (function (_super) {
    __extends(MonstreFacile, _super);
    function MonstreFacile(valeur) {
        return _super.call(this, valeur) || this;
    }
    MonstreFacile.prototype.attack = function (joueur) {
        var de = new De(6);
        var lanceJoueur = de.lanceDe();
        console.log("Le joueur fait : " + lanceJoueur);
        var lanceMonstre = de.lanceDe();
        console.log("Le monstre fait : " + lanceMonstre);
        if (lanceJoueur <= lanceMonstre) {
            console.log("Le joueur tente une esquive");
            if (!joueur.esquive()) {
                joueur.setHp(10);
            }
        }
    };
    return MonstreFacile;
}(Monstre));
var MonstreDifficle = /** @class */ (function (_super) {
    __extends(MonstreDifficle, _super);
    function MonstreDifficle(valeur) {
        return _super.call(this, valeur) || this;
    }
    MonstreDifficle.prototype.attack = function (joueur) {
        var de = new De(6);
        var lanceJoueur = de.lanceDe();
        console.log("Le joueur fait : " + lanceJoueur);
        var lanceMonstre = de.lanceDe();
        console.log("Le monstre fait : " + lanceMonstre);
        if (lanceJoueur <= lanceMonstre) {
            console.log("Le joueur tente une esquive");
            if (!joueur.esquive()) {
                joueur.setHp(10);
            }
        }
        console.log("Le monstre tente de lancer un sort");
        var lanceMagique = de.lanceDe();
        if (lanceMagique == 6) {
            console.log("LE SORT REUSSI !!!");
            joueur.setHp(10 * 5);
        }
    };
    return MonstreDifficle;
}(Monstre));
function rencontreAleatoire() {
    var de = new De(2);
    if (de.lanceDe() == 1) {
        var slime = new MonstreFacile(1);
        return slime;
    }
    else {
        var orc = new MonstreDifficle(2);
        return orc;
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
    // let monstre = new MonstreFacile(1);
    player1.attack(monstre);
    console.log("Etat du joueur : " + player1.getHp() + " " + player1.getScore());
    monstre.attack(player1);
} while (player1.isAlive());
console.log("Le joueur est mort, son score est de  : " + player1.getScore());
