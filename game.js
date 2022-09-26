const canvas = document.getElementsByClassName("canvas")[0];
const ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 500;
var time = 10;
var lose = false;
var score = 0;  /////////////////// declaration de variable score initialisé a 0


/////////////////////////////////key handlers
var keyRightPressed = false;
var keyLeftPressed = false;
document.body.addEventListener('keydown', keyDownHandler);
document.body.addEventListener('keyup', keyUpHandler);


function keyDownHandler(evt) {
   
    if ( evt.key == "ArrowRight") {
        keyRightPressed = true;  
        // Right arrow. 

    } else if (evt.key == "left" || evt.key == "ArrowLeft") {
        keyLeftPressed = true;
        // Left arrow.
    } else if (evt.key == "Enter" && lose == true) { //////////// quand le joueur pardue il peut press ENTER pour rejouer
        //////////////////ré-Initialisation des parametre de debut   
        ball.x = 250,   ////////////les corrdonné du ball au depart (250,400) parpor le canvas
        ball.y = 400,
        ball.stepy = -2; ///////// pour le deplacement dans l'axe Y (le signe négatif pour que la ball go up)
        coinInit();      ///////// fonction pour ré-Initialise les coins
        time = 10;       ////////  ré-Initialise le delai dans la fonction setInterval 
        score = 0;       ////////  ré-Initialise le score
        document.getElementById("idScore").innerHTML = score;  ///////// pour afficher le contenu de la variable score dans html
        lose = false;    ////////// ré-Initialise la variable lose a false qui indique le statue de game
        document.body.getElementsByClassName("shutDown")[0].classList.remove("show"); /////// pour supprimer la class show from 
        gameStart();  ////////// re-start le jeu
    }


}

function keyUpHandler(evt) {
    if (evt.key == "Right" || evt.key == "ArrowRight") {
        keyRightPressed = false;
        // Right arrow. 

    } else if (evt.key == "left" || evt.key == "ArrowLeft") {
        keyLeftPressed = false;
        // Left arrow.
    }


}

function moveBar() { /////////////// fonction pour deplacer la raquette
    if (keyRightPressed) { //////// quand le key Right est vrai donc deplacer vers la droite jusqu'a le width de canvas
        if (bar.x + bar.width < 500) bar.x = bar.x + 4; ////// on change la position de la raquette
        
    } else if (keyLeftPressed) { //////// quand le key left est vrai donc deplacer vers la gauche jusqu'a le debut de canvas
        if (bar.x > 0) bar.x = bar.x - 4;  ////// on change la position de la raquette
    
    }
}

var ball = {  //////////// varibale ball

    x: 250,   /////////// les corrdonnée de ball initialiser a (250,400)
    y: 400,
    stepx: 0, ////////// le deplacement dans l'axe X initialiser a 0 
    stepy: -2,////////// le deplacement dans l'axe Y initialiser a -2
    
    raduis: 10,////////// le raduis de ball
    draw: function () {    /////////// fonction pour dessiné la ball
        ctx.clearRect(0, 0, canvas.width, canvas.height); /////// pour supprimer tout contenu précédemment dessiné
        ctx.beginPath(); ///////// pour commencer un nouveau chemin en vidant la liste des sous-chemins
        ctx.fillStyle = "black";  //////// remplit le chemin courant ou donné avec la couleur de fond 'black'
        ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ///////////////le changement de corrdonnée de ball
        this.x = this.x + this.stepx; /// pour deplacer dans l'axe X 
        this.y = this.y + this.stepy; ////// pour deplacer dans l'axe Y 
    }


};
var bar = { //////////// varibale bar (raquette)

    height: 6, ///////// height de raquette initialiser a 6px
    width: 100, ///////// width de raquette initialiser a 100px
    x: 200, ///////// les corrdonnée de raquette dans le canvas
    y: 494,
    draw: function () { /////// fonction pour déssiné la raquette
        ctx.beginPath(); ///////// pour commencer un nouveau chemin en vidant la liste des sous-chemins
        ctx.rect(this.x, this.y, this.width, this.height); /////// pour déssiné une rectangle qui depart de corrdonnée (x=200,y=494) et avec width=100px et height=6px
        ctx.fillStyle = "black"; //////// remplit le chemin courant ou donné avec la couleur de fond 'black'
        ctx.closePath();
        ctx.fill();
    }
};

var coinList = []; ////////// declaration de variable array coinList quand va replire avec des coins(les objets quand va cassé) 

function coinInit() {   ///////// fonction pour initialiser coinList avec notre objet(coin image) 
    for (var i = 0; i < 6; i++) {
       coinList[i] = [] ///////// remplire chaque element avec array pour obtient une matrice
       for(var j = 0; j < 3; j++){
                coinList[i][j] = {x:0,y:0,height: 50, /////////// remplire la matrice coinList avec notre objet
                width: 50,
                status: true /////////// la attribut status indique si l'objet est cassé ou non
            };
       }
     
   }
   
}
 function   DrawCoins(){  /////// fonction pour déssiné les coins
        var img = document.createElement("img"); ///////////// pour créé un html elemnt 'img'
        img.src = "bitcoin.jpg"; //////////// nom de fichier de l'image
        for (var i = 0; i < 6; i++) {
            for(var j = 0; j < 3; j++){
                if(coinList[i][j].status==true){   /////// si l'objet n'est pas cassé on déssine
                    var posX = i * (70) + 30; /////// determiner les corrdonnée (x,y) pour chaque objet
                    var posY = j * (70) + 30;
                    coinList[i][j].x = posX;  //////// Initialise chaque objet avec ça corrdonnée dans la matrice
                    coinList[i][j].y = posY;
                    ctx.drawImage(img, posX, posY, 50, 50); ////////dissiné l'image avec width=50px et height=50px
                }
               
            }
        }
    }

    function scoreCount(){  ////// fonction pour counter le score
        score++;
        document.getElementById("idScore").innerHTML=score; ////////// pour modifier le html avec la valeur de score
    }
    function coinHit(){ /////////////// fonction pour determiner le comportement de ball apré de touché un objet(coin)
        for (var i = 0; i < 6; i++) {
            for(var j = 0; j < 3; j++){
                var C = coinList[i][j];
                if(coinList[i][j].status==true){
                    if (ball.x + ball.raduis >= C.x 
                        && ball.x - ball.raduis <= C.x + C.width 
                        && ball.y + ball.raduis >= C.y 
                        && ball.y - ball.raduis <= C.y + C.height){
                            if (ball.y + ball.raduis === C.y || ball.y - ball.raduis === C.y + C.height){ 
                               
                                ball.stepy = ball.stepy*-1;////////// si on touche l'objet du haut et du bas on change le signe de deplacement dans l'axe Y
                            }else if (ball.x + ball.raduis === C.x || ball.x - ball.raduis === C.x + C.width)  {
                                
                                ball.stepx = ball.stepx * -1; ////////// si on touche l'objet du gauche et du droite on change le signe de deplacement dans l'axe X
                            }
                                else if((ball.y + ball.raduis === C.y && ball.x + ball.raduis === C.x)
                                    ||(ball.y - ball.raduis === C.y + C.height && ball.x + ball.raduis === C.x)
                                    ||(ball.y + ball.raduis === C.y && ball.x - ball.raduis === C.x+C.width)
                                    ||(ball.y - ball.raduis === C.y + C.height && ball.x - ball.raduis === C.x + C.width)){
                                    ball.stepy = ball.stepy*-1; ////////// si on touche l'objet on coin on change le signe de deplacement dans l'axe Y et X
                                    ball.stepx = ball.stepx * -1;
                                   
                                }
                       
                        coinList[i][j].status= false; ////////// si la ball touche un objet on change le status d'objet a false c'est a dire cassé(dissparé)
                        scoreCount(); ///////// appel de fonction scoreCount apré chaque touche d'objet
                      
                    } 
                 
                   
                }
            }
        }
    }

    function checkLevelUp(){ /////////// fonction pour verifier si tous les objet sont cassé pour ré-initialier les objets(coins) avec augmantation de diffeculté par augmantation de vitesse et garder le score et continue la partie jusqu'a la ball mort
        for (var i = 0; i < 6; i++) {
            for(var j = 0; j < 3; j++){
                var C = coinList[i][j];
                if(C.status==true){
                  return ;
                }
            }
        }
        coinInit(); ////// initialiser les objets(coins)
        time = time -2; ////////// diminuer time dans la fonction setIntervale pour augmanter la vitesse
        clearInterval(interval);
        gameStart(); ///////// continuer le jeu avec le meme score
       
    
    }
    



function play() { ///////// fonction pour lancer un groupe des fonctions dans la fonction setIntervale
    ball.draw(); /////////// pour déssiné la ball
    bar.draw();  /////////// pour déssiné la raquette
    DrawCoins(); /////////// pour déssiné les objets(coins)
    coinHit();  ///// pour si on touche un objet
    moveBar();  ////// pour faire deplacer la raquette
}

var interval;
function gameStart() { ////////// fonction pour lancer le jeu
    interval = setInterval(() => { ///////// pour ré-execute une groupe de code chaque fin de delai 
         
        if (lose == false) { //////////// si le joueur n'a pas perdue
            checkLevelUp(); ////////////verifier si on augmante la difficulté
           
            play();   //////// lancer le groupe des fonctions

            /***determiner le comportement de ball apré de touché la raquette : on a diviser la raquette sur 5 partie chaque partie avoir un vecteur de deplacement***/
            
            if (((ball.x + ball.raduis >= bar.x && ball.x + ball.raduis <= bar.x + bar.width) || (ball.x - ball.raduis >= bar.x && ball.x - ball.raduis <= bar.x + bar.width)) && ball.y + ball.raduis === bar.y){
                
                
                if(ball.x + ball.raduis >= bar.x && ball.x  < bar.x + bar.width/5){/** si la ball touche la raquette dans la 1er partie(a guache)  **/
                    ball.stepx = -4;
                    ball.stepy = -1;
                }  
                if(ball.x  >= bar.x + bar.width/5 && ball.x  < bar.x + bar.width*2/5){/** si la ball touche la raquette dans la 2eme partie  **/
                    ball.stepx = -2;
                    ball.stepy = -1;
                } 
                if(ball.x  >= bar.x + bar.width*2/5 && ball.x  < bar.x + bar.width*3/5) {/** si la ball touche la raquette dans la 3eme partie(millieu)  **/
                    ball.stepx = 0;
                    ball.stepy = -2;
                }
                if(ball.x  >= bar.x + bar.width*3/5 && ball.x  < bar.x + bar.width*4/5){/** si la ball touche la raquette dans la 4eme partie  **/
                    ball.stepx = 2;
                    ball.stepy = -1;
                } 
                if(ball.x  >= bar.x + bar.width*4/5 && ball.x - ball.raduis <= bar.x + bar.width){/** si la ball touche la raquette dans la 5eme partie(a droite)  **/
                    ball.stepx = 4;
                    ball.stepy = -1;
                } 
              //  if(keyRightPressed && Math.sign(ball.stepx)===-1)  ball.stepx = ball.stepx * -1;
               // if(keyLeftPressed && Math.sign(ball.stepx)===1)  ball.stepx = ball.stepx * -1;
            } 
            if ((ball.x + ball.raduis === bar.x || ball.x + ball.raduis === bar.x + bar.width) && ball.y + ball.raduis > bar.y) ball.stepx = ball.stepx * -1;
            if (ball.x + ball.raduis >= 500 || ball.x - ball.raduis <= 0) ball.stepx = ball.stepx * -1; //////////// si la ball touche les murs de 2 coté
            if (ball.y - ball.raduis <= 0) ball.stepy = ball.stepy * -1; //// si la ball touche le plafond
        }
        if (ball.y - 2 * ball.raduis >= canvas.height) { ////////// si la ball pass la raquette donc le  joueur pardue le jeu
            lose = true;
            clearInterval(interval);
            shutDown(); ////////////////// fonction pour ajouter css class 
        }
    }, time);

}

function shutDown() { ////////////////// fonction pour ajouter css class
    document.body.getElementsByClassName("shutDown")[0].classList.add("show");
}
coinInit(); /////////// initialiser les objet pour la premier fois
gameStart(); ///////// lancer le jeu


