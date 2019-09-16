'use strict'

class Game {

    constructor(){

        let rowsNum = 6;
        let colsNum = 7;
        
        this.diamonds = '♢';
        this.hearts = '♡';
        this.spades = '♠‌';
        this.clubs = '♣';

        this.rows = [];

        this.counter = 0;
       
        this.createTable(rowsNum, colsNum);
        
    }

    createTable(rowsNum, colsNum) {
        let parent = document.querySelector('#game');
        let table = document.createElement('table');
        let random =  function (){
            return Math.floor(Math.random() * 4 + 1 );
        };
        let its = this;
        console.log(its);
        
        for (let i = 0; i < rowsNum; i++) {
            let tr = document.createElement('tr');
            this.rows[i] = [];

            for (let j = 0; j < colsNum; j++) {
                let td = document.createElement('td');
                tr.appendChild(td);

                this.rows[i][j] = td;

                let randomClass =  random();

                if ( randomClass == 1 ) {
                    td.classList.add('diamonds');
                } else if ( randomClass == 2 ) {
                    td.classList.add('hearts');
                } else if ( randomClass == 3 ) {
                    td.classList.add('spades');
                } else if ( randomClass == 4 ) {
                    td.classList.add('clubs');
                }

                td.dataset.y = i;
                td.dataset.x = j;

                td.innerHTML = '<span class="" style="font-size:24px;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;">‌</span>';
                
                if ( td.className == 'diamonds' ) {
                    td.innerText = this.diamonds;
                } else if ( td.className == 'hearts' ) {
                    td.innerText = this.hearts;
                } else if ( td.className == 'spades' ) {
                    td.innerText = this.spades;
                } else if ( td.className == 'clubs' ) {
                    td.innerText = this.clubs;
                }

                td.addEventListener('mouseenter', function(event){

                    let allTd = document.querySelectorAll('td');
                    allTd.forEach(function(elem){
                        elem.classList.remove('hover');
                    })

                    let cell = event.target;
                    let targetClass = event.target.className;

                    td.classList.add('hover');
                    its.getNeighbors(cell, targetClass);
                    
                });

                td.addEventListener('mouseleave', function(event){

                    let allTd = document.querySelectorAll('td');
                    allTd.forEach(function(elem){
                        elem.classList.remove('hover');
                    })
                    
                });

            }

            table.appendChild(tr);
        }

        parent.appendChild(table);

        table.addEventListener('click', function(event){

            let cell = event.target.closest('td');

            let targetClass = event.target.className;

            
            
            if(cell){

                let allTarget = document.querySelectorAll('.hover');
                let score = document.querySelector('.score');

                allTarget.forEach(function(elem){
                    elem.innerText = '';
                    elem.classList.remove('hover');
                });

                its.getNeighbors(cell, targetClass);

                its.counter++;
                score.innerText = its.counter;
            }
            
        });

        }

        getNeighbors(elem, targetClass){

            // if (elem.previousSibling || elem.nextSibling) {

            //     if (elem.previousSibling.className == targetClass || elem.nextSibling.className == targetClass) {
            //         console.log(elem.previousSibling)
            //         console.log(elem.nextSibling)
    
            //         console.log('есть соседи')
            //     }

            // }
            
            let x = +elem.dataset.x;
            let y = +elem.dataset.y;
            let deltaY = this.rows.length - y;
            let deltaX = this.rows[0].length - x;
            
            for (let i = 1; i <= +y; i++) {
                if(this.rows[y - i][x].className == targetClass) {
                        this.rows[y - i][x].classList.add('hover');
                    } else {
                       break;
                    }
            }

            for (let i = 1; i < deltaY; i++) {
                if( this.rows[y + i][x].className == targetClass ) {
                        this.rows[y + i][x].classList.add('hover');
                    } else {
                        break;
                    }
            }

            for (let i = 1; i <= x; i++) {
                if ( this.rows[y][x - i].className == targetClass ) {
                        this.rows[y][x - i].classList.add('hover');
                    } else {
                        break;
                    }
            }

            for (let i = 1; i < deltaX; i++) {
                if ( this.rows[y][x + i].className == targetClass ) {
                        this.rows[y][x + i].classList.add('hover');
                    } else {
                        break;
                    }
            }

            if ( y > 0 && y < 5) {

                if ( x == 0 ){
                    let next1 = this.rows[y + 1][x].nextSibling;
                    let next2 = this.rows[y - 1][x].nextSibling;

                    if ( next1.className == targetClass ) {
                  
                    
                        next1.classList.add('hover');
        
                    }

                    if ( next2.className == targetClass ) {
                  
                    
                            next2.classList.add('hover');
            
                    }

                }

                if (x > 0 && x < 6) {

                let prev1 = this.rows[y + 1][x].previousSibling;
                let next1 = this.rows[y + 1][x].nextSibling;
                let prev2 = this.rows[y - 1][x].previousSibling;
                let next2 = this.rows[y - 1][x].nextSibling;

                if ( prev1.className == targetClass ) {

                    prev1.classList.add('hover');
    
                    }
                if ( next1.className == targetClass ) {
                  
                    
                    next1.classList.add('hover');
    
                    }
                if ( prev2.className == targetClass  ) {
                  
                    
                    prev2.classList.add('hover');
    
                    }
                if ( next2.className == targetClass ) {
                  
                    
                    next2.classList.add('hover');
    
                    }
                }

                if ( x == 6 ){

                    let prev1 = this.rows[y + 1][x].previousSibling;
                    let prev2 = this.rows[y - 1][x].previousSibling;

                    if ( prev1.className == targetClass ) {
                  
                    
                        prev1.classList.add('hover');
        
                    }

                    if ( prev2.className == targetClass ) {
                  
                    
                        prev2.classList.add('hover');
            
                    }
                }
                
            }

            if (y == 0 && x == 0) {

                let next1 = this.rows[y + 1][x].nextSibling;

                if (next1.className == targetClass) {
                    next1.classList.add('hover');
                }

            }

            if (y == 0 && x == 6) {

                let prev1 = this.rows[y + 1][x].previousSibling;

                if (prev1.className == targetClass) {
                    prev1.classList.add('hover');
                }

            }

            if (y == 5 && x == 0) {

                let next2 = this.rows[y - 1][x].nextSibling;

                if (next2.className == targetClass) {
                    next2.classList.add('hover');
                }
            }

            if (y == 5 && x == 6) {

                let prev2 = this.rows[y - 1][x].previousSibling;

                if (prev2.className == targetClass) {
                    prev2.classList.add('hover');
                }

            }

            if (y == 0 && x > 0 && x < 6) {

                let prev1 = this.rows[y + 1][x].previousSibling;
                let next1 = this.rows[y + 1][x].nextSibling;

                if (prev1.className == targetClass) {
                    prev1.classList.add('hover');
                }
                if (next1.className == targetClass) {
                    next1.classList.add('hover');
                }

            }

            if (y == 5 && x > 0 && x < 6) {

                let prev2 = this.rows[y - 1][x].previousSibling;
                let next2 = this.rows[y - 1][x].nextSibling;

                if (prev2.className == targetClass) {
                    prev2.classList.add('hover');
                }

                if (next2.className == targetClass) {
                    next2.classList.add('hover');
                }

            }

        }
}

let game = new Game;
