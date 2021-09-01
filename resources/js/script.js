// SELECTED ELEMENTS -------------------------------------------------------------------------
// Buttons
const btnVsPlayer = document.querySelector('.vs-player');
const btnVsPc = document.querySelector('.vs-pc');
const btnRules = document.querySelector('.rules');
const btnReset = document.querySelector('.reset');

// Middle section elements
const divLeft = document.querySelector('.left-div');
const divRight = document.querySelector('.right-div');

// Footer elements
const footer = document.querySelector('footer');
const scoreGoal = document.querySelector('#score-final');
const scoreP1 = document.querySelector('.player1-score');
const scoreP2 = document.querySelector('.player2-score');

// CREATED ELEMENTS --------------------------------------------------------------------------
// Middle section elements
const inputNameP1 = document.createElement('input');
const inputNameP2 = document.createElement('input');
inputNameP1.placeholder = 'Enter name Player1';
inputNameP2.placeholder = 'Enter name Player2';
inputNameP1.classList.add('disposition-left');
inputNameP2.classList.add('disposition-right');

const leftHand = document.createElement('img');
const rightHand = document.createElement('img');
leftHand.src = 'resources/img/hand-rock-1.png';
rightHand.src = 'resources/img/hand-rock-2.png';
leftHand.classList.add('disposition-left');
rightHand.classList.add('disposition-right');

// Middle section elements for PC -----------------------------------PC
const pcName = document.createElement('p');
pcName.classList.add('pc-name', 'disposition-right');
pcName.textContent = 'BigBrain PC';
const pcHand = document.createElement('img');
pcHand.src = 'resources/img/hand-rock-3.png';
pcHand.classList.add('disposition-right');

// Section rules
const divOverlay = document.createElement('section');
const imgRules = document.createElement('img');
imgRules.classList.add('rules-img');

document.body.appendChild(divOverlay);
divOverlay.appendChild(imgRules);
divOverlay.classList.add('dark-overlay', 'hide');

// End screen section
const divEndScreen = document.createElement('section');
divEndScreen.classList.add('section-end-screen', 'hide');
const divMessage = document.createElement('div');
divMessage.classList.add('message-container');

const paragraph = document.createElement('p');

const contact = document.createElement('a');
contact.setAttribute('href', 'https://www.facebook.com/profile.php?id=100004941375783');
contact.setAttribute('target', '_blank');
const contactIcon = document.createElement('img');
contactIcon.setAttribute('src', 'resources/img/facebook.png');
contactIcon.setAttribute('alt', 'facebook');
const btnPlayAgain = document.createElement('a');
btnPlayAgain.style.cursor = 'pointer';
btnPlayAgain.classList.add('play-again');
btnPlayAgain.textContent = 'Play again';

document.body.appendChild(divEndScreen);
divEndScreen.appendChild(divMessage);
divMessage.append(paragraph, contact, btnPlayAgain, contactIcon);
contact.appendChild(contactIcon);

let span = document.querySelector('.winner-name');

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let dataController = (() => {

    let data = {
        scores: [0, 0],
        finalScore: 10,
        controls: [false, false],
        player1Choice: '',
        player2Choice: ''
    };

    return {
        getData: () => {
            return data;
        },

        resetData: () => {
            data.scores = [0, 0];
            data.finalScore = 5;
            data.controls = [false, false];
            data.player1Choice = '';
            data.player2Choice = '';
        },

        resetPlayerChoices: (control) => {
            data.player1Choice = '';
            data.player2Choice = '';
            if(control){
                data.controls = [true, false];
            }else {
                data.controls = [true, true];
            }
        },

        detectPlayer1: (event, data) => {
            if(data.controls[0]){
                if(event.key == 'z' || event.key == 'Z') {
                    data.controls[0] = false;
                    data.player1Choice = 'rock';
                }else if(event.key == 'x' || event.key == 'X') {
                    data.controls[0] = false;
                    data.player1Choice = 'paper';
                }else if(event.key == 'c' || event.key == 'C') {
                    data.controls[0] = false;
                    data.player1Choice = 'scissors';
                }
            }
        },

        detectPlayer2: (event, data) => {
            if(data.controls[1]){
                if(event.key == 'ArrowLeft') {
                    data.controls[1] = false;
                    data.player2Choice = 'rock';
                }else if(event.key == 'ArrowDown') {
                    data.controls[1] = false;
                    data.player2Choice = 'paper';
                }else if(event.key == 'ArrowRight') {
                    data.controls[1] = false;
                    data.player2Choice = 'scissors';
                }
            }
        },

        detectPc: () => {
            if(divRight.contains(pcName)){
                let random = Math.floor(Math.random() * 3) + 1;
                if(random === 1) {
                    data.player2Choice = 'rock';
                }else if(random === 2) {
                    data.player2Choice = 'paper';
                }else {
                    data.player2Choice = 'scissors';
                }

                return true; // Sending PC alive control signal
            }else {
                return false;
            }
        },

        determineRoundVictor: (choice1, choice2) => {
            if((choice1 === 'rock' && choice2 === 'scissors') || (choice1 === 'paper' && choice2 === 'rock') || (choice1 === 'scissors' && choice2 === 'paper')) {
                return 1;
            }else if((choice2 === 'rock' && choice1 === 'scissors') || (choice2 === 'paper' && choice1 === 'rock') || (choice2 === 'scissors' && choice1 === 'paper')) {
                return 2;
            }
        },

        updateDataScores: (value) => {
            if(value === 1) {
                data.scores[0]++;
            }else if(value === 2) {
                data.scores[1]++;
            }
        },

        isWinner: () => {
            if(data.scores[0] === data.finalScore) {
                return 1;
            }else if(data.scores[1] === data.finalScore) {
                return 2;
            }else {
                return 0;
            }
        },

        updateFinalScore: (input) => {
            if(input.value != '') {
                data.finalScore = Number(input.value);
            }else {
                data.finalScore = 10;
            }
        }
    };
})();

let domController = (() => {

    winnerMessage = (name, control) => {
        if(control) {
            paragraph.innerHTML = `You just got beaten by our BigBrain PC &#8482;. I hope you had some fun with this project. Any feedback or constructive criticism would be greatly appreciated. :)`;
        }else {
            paragraph.innerHTML = `Congratulation <span class='winner-name'>${name}</span> on your victory. I hope you had some fun with this project. Any feedback or constructive criticism would be greatly appreciated. :)`;
        }
        divEndScreen.classList.remove('hide');
    };

    return {
        resetDom: (control) => {
            domController.showHideButtons();
            domController.showHideFooterContent();
            if(control) {
                domController.destroyInterfacePvE();
            }else {
                domController.destroyInterfacePvP();
            }
            
            setTimeout(() => {
                if(!divEndScreen.classList.contains('hide')) {
                    divEndScreen.classList.add('hide');
                }
                domController.animateShowHideFooter();
            }, 1000);

            setTimeout(() => {
                inputNameP1.value = '';
                inputNameP2.value = '';
                scoreP1.textContent = '0';
                scoreP2.textContent = '0';
                scoreGoal.value = '';
            }, 2000);
        },

        showHideButtons: () => {
            [btnVsPlayer, btnVsPc].forEach(element => {
                element.classList.toggle('hide');
            });
        },

        showHideRules: (target) => {
            if(target != imgRules) {
                divOverlay.classList.toggle('hide');
            }
        },

        animateShowHideFooter: () => {
            footer.classList.toggle('hide-footer');
        },

        showHideFooterContent: () => {
            [scoreGoal, scoreP1, scoreP2].forEach(element => {
                element.classList.toggle('hide');
            });
        },

        createInterfacePvP: () => {
            divLeft.append(inputNameP1, leftHand);
            divRight.append(inputNameP2, rightHand);
            setTimeout(() => {
                inputNameP1.classList.remove('disposition-left');
                inputNameP2.classList.remove('disposition-right');
            }, 1000);
            setTimeout(() => {
                leftHand.classList.remove('disposition-left');
                rightHand.classList.remove('disposition-right');
            }, 1500);
        },

        createInterfacePvE: () => { // *********************************************************************************
            divLeft.append(inputNameP1, leftHand);
            divRight.append(pcName, pcHand);
            setTimeout(() => {
                inputNameP1.classList.remove('disposition-left');
                pcName.classList.remove('disposition-right');
            }, 1000);
            setTimeout(() => {
                leftHand.classList.remove('disposition-left');
                pcHand.classList.remove('disposition-right');
            }, 1500);
        },

        destroyInterfacePvP: () => {
            inputNameP1.classList.add('disposition-left');
            inputNameP2.classList.add('disposition-right');
            setTimeout(() => {
                leftHand.classList.add('disposition-left');
                rightHand.classList.add('disposition-right');
            }, 500);
            setTimeout(() => {
                divLeft.innerHTML = '';
                divRight.innerHTML = '';
            }, 1500);
        },

        destroyInterfacePvE: () => {
            inputNameP1.classList.add('disposition-left');
            pcName.classList.add('disposition-right');
            setTimeout(() => {
                leftHand.classList.add('disposition-left');
                pcHand.classList.add('disposition-right');
            }, 500);
            setTimeout(() => {
                divLeft.innerHTML = '';
                divRight.innerHTML = '';
            }, 1500);
        },
        
        animateHands: (choice1, choice2, control) => {
            leftHand.classList.add('shake-left');
            if(control) {
                pcHand.classList.add('shake-right');
            }else {
                rightHand.classList.add('shake-right');
            }

            setTimeout(() => {
                leftHand.classList.remove('shake-left');
                if(control) {
                    pcHand.classList.remove('shake-right');
                }else {
                    rightHand.classList.remove('shake-right');
                }
            }, 2000);

            setTimeout(() => {
                switch(choice1) {
                    case 'rock':
                        leftHand.src = 'resources/img/hand-rock-1.png';
                        break;
                    case 'paper':
                        leftHand.src = 'resources/img/hand-paper-1.png';
                        break;
                    case 'scissors':
                        leftHand.src = 'resources/img/hand-scissors-1.png';
                        break;
                }

                if(control) {
                    switch(choice2) {
                        case 'rock':
                            pcHand.src = 'resources/img/hand-rock-3.png';
                            break;
                        case 'paper':
                            pcHand.src = 'resources/img/hand-paper-3.png';
                            break;
                        case 'scissors':
                            pcHand.src = 'resources/img/hand-scissors-3.png';
                            break;
                    }
                }else {
                    switch(choice2) {
                        case 'rock':
                            rightHand.src = 'resources/img/hand-rock-2.png';
                            break;
                        case 'paper':
                            rightHand.src = 'resources/img/hand-paper-2.png';
                            break;
                        case 'scissors':
                            rightHand.src = 'resources/img/hand-scissors-2.png';
                            break;
                    }
                }

                setTimeout(() => {
                    leftHand.src = 'resources/img/hand-rock-1.png';
                    if(control) {
                        pcHand.src = 'resources/img/hand-rock-3.png';
                    }else {
                        rightHand.src = 'resources/img/hand-rock-2.png';
                    }
                }, 1000);
            }, 2000);
        },

        updateDomScores: (data) => {
            setTimeout(() => {
                scoreP1.textContent = data.scores[0];
                scoreP2.textContent = data.scores[1];
            }, 2000);
        },

        winnerAnnouncement: (winner, control) => {
            if(winner === 1) {
                if(inputNameP1.value === '') {
                    winnerMessage('Player1');
                }else {
                    winnerMessage(inputNameP1.value);
                }
            }else if(winner === 2) {
                if(control) {
                    winnerMessage('', control);
                }else {
                    if(inputNameP2.value === '') {
                        winnerMessage('Player2');
                    }else {
                        winnerMessage(inputNameP2.value);
                    }
                }
            }
        },

        inputScoreGoalCheck: (input, data) => {
            let match = /^\d+$/.test(input.value);
            let max;

            if(data.scores[0] > data.scores[1]) {
                max = data.scores[0];
            }else {
                max = data.scores[1];
            }

            if(match) {
                if(Number(input.value) > 100) {
                    input.value = 100;
                }else if(Number(input.value) <= max) {
                    input.value = max + 1; 
                }
                
            }else if(!match && input.value != '') {
                if(max < 10) {
                    input.value = 10;
                }else if(max >= 10) {
                    input.value = max + 1;
                }
            }
        },

        onFocusPlaceholder: (event) => {
            event.target.placeholder = 'Default: 10, Max: 100';
        },

        offFocusPlaceholder: (event) => {
            if(event.target.value == '') {
                event.target.placeholder = 'Enter final score';
            }
        },

        rulesImgSwap: () => {
            if(window.innerWidth < 769) {
                imgRules.src = 'resources/img/rules-small.png';
            }if(window.innerWidth > 768) {
                imgRules.src = 'resources/img/rules.png';
            }
        }
    };
})();

let controller = ((dataCtrl, domCtrl) => {

    let setupEventListeners = () => {
        [btnVsPlayer, btnVsPc].forEach(btn => {
            btn.addEventListener('click', event => {
                domCtrl.showHideButtons();
                domCtrl.animateShowHideFooter();
                setTimeout(() => {
                    domCtrl.showHideFooterContent();
                }, 2000);
                
                if(event.target == btnVsPlayer) {
                    domCtrl.createInterfacePvP();
                    setTimeout(() => {
                        let data = dataCtrl.getData();
                        data.controls = [true, true];
                    }, 2500);
                }else if(event.target == btnVsPc) {
                    domCtrl.createInterfacePvE();
                    setTimeout(() => {
                        let data = dataCtrl.getData();
                        data.controls = [true, false];
                    }, 2500);
                }
            });
        });

        btnRules.addEventListener('click', domCtrl.showHideRules);

        btnReset.addEventListener('click', function callback(event) {
            event.target.removeEventListener('click', callback);
            setTimeout(() => {
                event.target.addEventListener('click', callback);
            }, 1000);
            if(!footer.classList.contains('hide-footer')) {
                dataCtrl.resetData();
                domCtrl.resetDom(divRight.contains(pcName));
            }
        });

        divOverlay.addEventListener('click', event => {
            domCtrl.showHideRules(event.target);
        });

        document.addEventListener('keydown', keyListener);

        btnPlayAgain.addEventListener('click', () => {
            dataCtrl.resetData();
            domCtrl.resetDom(divRight.contains(pcName));
        });

        scoreGoal.addEventListener('change', event => {
            domCtrl.inputScoreGoalCheck(event.target, dataCtrl.getData());
            dataCtrl.updateFinalScore(event.target);
        });

        [inputNameP1, inputNameP2, scoreGoal].forEach(input => {
            input.addEventListener('focus', () => {
                document.removeEventListener('keydown', keyListener);
            });
        });

        [inputNameP1, inputNameP2, scoreGoal].forEach(input => {
            input.addEventListener('focusout', () => {
                document.addEventListener('keydown', keyListener);
            });
        });

        scoreGoal.addEventListener('focus', domCtrl.onFocusPlaceholder);
        scoreGoal.addEventListener('focusout', domCtrl.offFocusPlaceholder);

        window.addEventListener('resize', domCtrl.rulesImgSwap);
    };

    let keyListener = (event) => {
        let data = dataCtrl.getData();
        dataCtrl.detectPlayer1(event, data);
        let pcControl = dataCtrl.detectPc();
        if(!pcControl) {
            dataCtrl.detectPlayer2(event, data);
        }

        if(data.player1Choice !== '' && data.player2Choice !== '') {
            document.removeEventListener('keydown', keyListener);
            domCtrl.animateHands(data.player1Choice, data.player2Choice, pcControl);

            let roundVictor = dataCtrl.determineRoundVictor(data.player1Choice, data.player2Choice);
            dataCtrl.updateDataScores(roundVictor);
            data = dataCtrl.getData();
            domCtrl.updateDomScores(data);
            let winner = dataCtrl.isWinner();
            dataCtrl.resetPlayerChoices(pcControl);

            setTimeout(() => {
                if(winner) {
                    domCtrl.winnerAnnouncement(winner, pcControl);
                    data.controls = [false, false];
                }
                document.addEventListener('keydown', keyListener);
            }, 3000);
        }
    };

    return {
        initiate: () => {
            setupEventListeners();
            domCtrl.rulesImgSwap();
        }
    };
})(dataController, domController);

controller.initiate();