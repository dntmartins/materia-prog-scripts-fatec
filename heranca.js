function Animal(nome) {
    this.nome = nome || 'Animal sem nome';
}

Animal.prototype.fazerBarulho = function () {
    return 'Urgh!';
};

function Cao(nome) {
    Animal.call(this, nome);
}

// Herda de Animal
Cao.prototype = new Animal();
//Corrige construtor de Cao
Cao.prototype.constructor = Cao;

Cao.prototype.fazerBarulho = function () {
    return 'Wuff Wuff!';
};

function Gato(nome) {
    Animal.call(this, nome);
}

// Herda de Animal
Gato.prototype = new Animal();
//Corrige construtor de Cao
Gato.prototype.constructor = Cao;
//Sobrescreve metodo fazerBarulho de Aniaml
Gato.prototype.fazerBarulho = function () {
    return 'Meow Meow!';
};

function Manada() {
    this.animais = [];
    this.addAnimal = function (animal) {
        this.animais.push(animal);
    };
}

function ManadaVirgula() {
    this.imprimeAnimais = function () {
        var animaisText = "";
        for (var i = 0; i < this.animais.length; i++) {
            if (i + 1 == this.animais.length) {
                animaisText += this.animais[i];
            } else {
                animaisText += this.animais[i] + ", ";
            }
        }
        console.log(animaisText);
    };
}

function ManadaSustenido() {
    this.imprimeAnimais = function () {
        var animaisText = "";
        for (var i = 0; i < this.animais.length; i++) {
            if (i + 1 == this.animais.length) {
                animaisText += this.animais[i];
            } else {
                animaisText += this.animais[i] + "# ";
            }
        }
        console.log(animaisText);
    };
}

// Herda de Manada
ManadaVirgula.prototype = new Manada();
// Herda de Manada
ManadaSustenido.prototype = new Manada();

var animal = new Animal();
var cao = new Cao("Sanção");
var gato = new Gato("Garfield")
console.log(animal.fazerBarulho());
console.log(cao.fazerBarulho());
console.log(gato.fazerBarulho());

var manadaVirgula = new ManadaVirgula();
manadaVirgula.addAnimal(cao.nome); //Adicionando nome apenas, mas poderia ser o objeto
manadaVirgula.addAnimal(gato.nome); //Adicionando nome apenas, mas poderia ser o objeto
manadaVirgula.imprimeAnimais()
var manadaSustenido = new ManadaSustenido();
manadaSustenido.addAnimal(cao.nome);
manadaSustenido.addAnimal(gato.nome);
manadaSustenido.imprimeAnimais()
