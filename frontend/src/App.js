import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import axios from 'axios';

import './App.css';
import MainPage from './components/MainPage';
import HeaderBlock from './components/HeaderBlock';
import MiniDaniil from './components/MiniDaniil';
import EducationPage from './components/EducationPage';
import ExperiencePage from './components/ExperiencePage';
import PortfolioPage from './components/PortfolioPage';
import SkillsetPage from './components/SkillsetPage';
import GamePage from './components/GamePage';

import language_data from './site_content.json';
import theme_data from './theme_positions.json';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'language': 'EN',
            'theme': 'light',
            'educations': [],
            'experiences': [],
            'portfolioLinks': [],
            'skills': [],
            // variables for Mini Daniil's presentation
            'miniDaniilFunc': this.miniDaniilFirst,
            'miniDaniilStep': 0,
            'miniDaniilState': false,
            'miniDaniilText': 0,
            'miniDaniilInterval': '',
            'miniDaniilTimeout': ''
        }
    }

    componentDidMount() {

        // get selected language from cookies or select english
        const cookie = new Cookies();
        let language = cookie.get('language');
        if (language != undefined) {
            this.setState({'language': language});
        } else {
            language = 'EN';
        }

        // get prefered theme from cookies or settings or select light theme
        let theme = cookie.get('theme');
        if((theme != 'light' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || theme == 'dark') {
            this.setState({'theme': 'dark'});
            this.setTheme('dark');
        } else {
            this.setState({'theme': 'light'});
            this.setTheme('light');
        }

        // load data from backend server
        this.loadData();

        // add some changes on window resize for correct menu display and Mini Daniil animations
        window.addEventListener('resize', () => {

            const step = this.state.miniDaniilStep;

            if(window.innerWidth >= 768) {

                if($('.m_menu_background').css('display') == 'flex') {
                    $('.m_menu_open').css('display', '');
                    $('.header_title').css('display', '');
                    $('.header_language').css('display', '');
                    $('.theme_block').css('display', '');
                    $('.m_menu_background').css('display', '');
                    $('.menu_block').css('top', '');
                    $('.m_menu_close').css('display', '');
                }

                let largeScaleDiff = 0;

                if(window.innerWidth > 1300) {
                    largeScaleDiff = (window.innerWidth - 1300) / 2;
                }

                if(step >= 6) {
                    $('.mini_daniil').css('top', $('.header_top').height() * 1.2 + 'px');

                    if(step <= 10) {
                        $('.mini_daniil').css('left', $('.theme_block').position().left + $('.mini_daniil').width() * 0.3 + largeScaleDiff);
                    } else if(step >= 11) {
                        this.miniDaniilPutDownLeftHand(0);
                        $('.mini_daniil_left_net').css('width', 0);

                        if([11, 12].includes(step)) {
                            let left = Math.floor($('#menu_education').position().left + $('#menu_experience').position().left  - $('.mini_daniil').width() + $('#menu_education').width()) / 2 + largeScaleDiff;
                            $('.mini_daniil').css('left', left + 'px');
                        } else if(step >= 13) {
                            let left = Math.floor($('#menu_skillset').position().left + $('#menu_game').position().left  - $('.mini_daniil').width() + $('#menu_skillset').width()) / 2 + largeScaleDiff;
                            $('.mini_daniil').css('left', left + 'px');
                        }
                    }
                };

                if(step == 5) {
                    this.miniDaniilPutDownLeftHand(0);
                } else if(step == 9) {
                    this.miniDaniilPutDownRightHand(0);
                } else if([8, 11, 14].includes(step)) {
                    this.miniDaniilPutDownRightHand(0);
                    this.miniDaniilLift70LeftHand(0);
                }

                if([10, 12, 15].includes(step)) {
                    window.clearTimeout(this.state.miniDaniilTimeout);
                }
            } else {

                if([6, 7, 8, 9].includes(step)) {
                    $('.mini_daniil').css('top', $('.header_top').height() * 1.2 + 'px');
                } else if(step >= 11) {
                    this.miniDaniilLift90LeftHand(0);
                    $('.mini_daniil').css('left', '');
                    $('.mini_daniil_left_net').css('width', $('.mini_daniil').position().top + $('.mini_daniil').height() * 0.4 + 'px');
                }

                if([4, 5, 6, 7, 10, 11, 12, 13, 14, 15].includes(step)) {
                    $('.m_menu_open').trigger('click');
                }
                
                if([8, 11, 14].includes(step)) {
                    this.miniDaniilPutDownLeftHand(0);
                    this.miniDaniilLift70RightHand(0);
                }
                
                if(step == 11) {
                    $('.mini_daniil').css('top', $('.header_top').height() * 1.2 + 42 + 'px');
                } else if([12, 16, 17, 18].includes(step)) {
                    $('.mini_daniil').css('top', $('.header_top').height() * 1.2 + 84 + 'px');
                } else if([13, 14].includes(step)) {
                    $('.mini_daniil').css('top', $('.header_top').height() * 1.2 + 126 + 'px');
                } else if(step == 15) {
                    $('.mini_daniil').css('top', $('.header_top').height() * 1.2 + 168 + 'px');
                }
            }
        })
    }

    loadData = () => {

        /* 
            method loads data from backend server
        */

        const headers = {
            'Content-Type': 'application/json'
        }

        let hostAddress;

        if (window.location.origin === "http://localhost:3000") {
            hostAddress = "http://127.0.0.1:8000";
        } else {
            hostAddress = window.location.origin + ':8443';
            console.log(hostAddress);
        }

        axios.get(hostAddress + '/api/educations/')
        .then(response => {
            const educations = response.data;
            this.setState({'educations': educations});
        }).catch(error => console.log(error));

        axios.get(hostAddress + '/api/experiences/')
        .then(response => {
            const experiences = response.data;
            this.setState({'experiences': experiences});
        }).catch(error => console.log(error));

        axios.get(hostAddress + '/api/portfolio_links/')
        .then(response => {
            const portfolioLinks = response.data;
            this.setState({'portfolioLinks': portfolioLinks});
        }).catch(error => console.log(error));

        axios.get(hostAddress + '/api/skills/')
        .then(response => {
            const skills = response.data;
            this.setState({'skills': skills});
        }).catch(error => console.log(error));
    }

    setLanguage = (language) => {

        /*
            language: new selected language (string)

            method sets new language
        */

        const cookie = new Cookies();
        cookie.set('language', language);
        this.setState({'language': language});
        $('.mini_daniil_text_cloud').html(language_data[language]['mini_daniil'][this.state.miniDaniilText]);
    }

    changeTheme = () => {

        /* 
            method changes current theme to another one
        */

        let theme = this.state['theme'];
        if(theme == 'light') {
            theme = 'dark';
        } else {
            theme = 'light';
        }

        if((theme == 'dark' && !$('#dark_mode').length) || (theme == 'light' && $('#dark_mode').length)) {
            const cookie = new Cookies();
            cookie.set('theme', theme);
            this.setState({'theme': theme});
            this.setTheme(theme);
        }
    }

    setTheme = (theme) => {

        /* 
            theme: new theme (string)

            method set new theme as current theme
        */

        if(theme == 'dark') {
            window.setTimeout(() => {
                $('head').append('<link rel="stylesheet" href="/darkApp.css" id="dark_mode">');
            }, 500);
        } else {
            window.setTimeout(() => {
                $('#dark_mode').remove();
            }, 500);
        }

        for(const [el, style] of Object.entries(theme_data[theme])) {
            $(`.${el}`).animate(style, 500);
        }
    }

    showComment = (id) => {

        /* 
            id: item's id (int)

            item's onclick method to show or hide the comment connected to the item
        */

        if($(`.comment_${id}`).css('display') == 'none') {
            $(`.comment_${id}`).css('display', 'inline');
            $(`.arrow_${id}`).addClass('item_arrow_hide');
        } else {
            $(`.comment_${id}`).css('display', '');
            $(`.arrow_${id}`).removeClass('item_arrow_hide');
        }
    }

    miniDaniilClick = () => {

        /* 
            Mini Daniil's onclick method pausing or continuing his animation
        */

        if(this.state.miniDaniilState) {
            this.setState({'miniDaniilState': false});
            this.miniDaniilPause();
        } else {
            this.setState({'miniDaniilState': true});
            this.miniDaniilContinue();
        }
    }

    miniDaniilPause = () => {

        /* 
            method executing actions needed to pause Mini Daniil's animation correctly
        */

        const step = this.state.miniDaniilStep;

        if([1, 18].includes(step)) {
            window.clearTimeout(this.state.miniDaniilTimeout);
            window.clearInterval(this.state.miniDaniilInterval);
        } else if ([2, 7, 8, 9, 11, 12, 14, 15, 16, 17].includes(step)) {
            window.clearTimeout(this.state.miniDaniilTimeout);
            window.clearInterval(this.state.miniDaniilInterval);
            $('.mini_daniil_mouth').css('background-color', '');
        } else if ([3, 5, 19, 20].includes(step)) {
            window.clearTimeout(this.state.miniDaniilTimeout);
        } else if ([4, 20].includes(step)) {
            $('.mini_daniil').stop();
            $('.mini_daniil_left_net').stop();
            $('.mini_daniil_right_net').stop();
        } else if ([6, 10, 13].includes(step)) {
            $('.mini_daniil').stop();
            window.clearInterval(this.state.miniDaniilInterval);
        };

        if(step == 10 && window.innerWidth < 768) {
            window.clearTimeout(this.state.miniDaniilTimeout);
        };
    }

    miniDaniilContinue = () => {

        /* 
            method continuing Mini Daniil's presentation  
        */

        this.state.miniDaniilFunc();
    }

    miniDaniilTalk = (lastText, nextStep, nextFunc, actionText=undefined, actionFunc=undefined) => {

        /* 
            lastText: last phrase's to say id (int)
            nextStep: next step's id (int)
            nextFunc: next step's function (function)
            actionText: id of the phrase after which some action needs to be performed (or not) (int)
            actionFunc: function that needs to be performed (function)

            method executing Mini Daniil's talking process
        */

        if(this.state.miniDaniilText <= lastText) {

            let currentTextId = this.state.miniDaniilText;
            
            if([17, 18].includes(this.state.miniDaniilText) && window.innerWidth < 768) {
                currentTextId += 0.5;
            }

            let currentText = language_data[this.state.language]['mini_daniil'][currentTextId];

            $('.mini_daniil_text_cloud').html(currentText);
            $('.cloud_text').css('display', '');

            if(actionText == this.state.miniDaniilText && actionFunc != undefined) {
                actionFunc();
            }

            let time = currentText.length * 120;

            this.setState({'miniDaniilText': this.state.miniDaniilText + 1});
            window.clearInterval(this.state.miniDaniilInterval);
            this.setState({'miniDaniilInterval': window.setInterval(() => {
                if($('.mini_daniil_mouth').css('background-color') != 'rgba(0, 0, 0, 0)') {
                    $('.mini_daniil_mouth').css('background-color', '');
                } else {
                    $('.mini_daniil_mouth').css('background-color', 'brown');
                };
            }, 500)})
            this.setState({'miniDaniilTimeout': window.setTimeout(() => {
                this.miniDaniilTalk(lastText, nextStep, nextFunc, actionText, actionFunc);
            }, time)});
        } else {
            this.setState({'miniDaniilTimeout': window.setTimeout(() => {
                window.clearInterval(this.state.miniDaniilInterval);
                $('.mini_daniil_mouth').css('background-color', '');
                $('.cloud_text').css('display', 'none');
                this.setState({'miniDaniilStep': nextStep, 'miniDaniilFunc': nextFunc});
                nextFunc();
            }, 500)});
        }
    }

    miniDaniilMove = (goal, nextStep, nextFunc, secondGoal = undefined) => {

        /* 
            goal: destination of Mini Daniil's movement (HTML object)
            nextStep: next step's id (int)
            nextFunc: next step's function (function)
            secondGoal: if set destionation is between goal and secondGoal (HTML object)

            method executing Mini Daniil's moving process from point A to point B
        */

        let finalPosition;
        let largeScaleDiff = 0;

        if(window.innerWidth > 1300) {
            largeScaleDiff = (window.innerWidth - 1300) / 2;
        }

        if(secondGoal != undefined) {
            finalPosition = Math.floor($(`${goal}`).position().left + $(`${secondGoal}`).position().left  - $('.mini_daniil').width() + $(`${goal}`).width()) / 2 + largeScaleDiff;
        } else {
            finalPosition = $(`${goal}`).position().left + $('.mini_daniil').width() * 0.3 + largeScaleDiff;
        }

        const distance = Math.floor(finalPosition - $('.mini_daniil').position().left);
        
        if (distance > 0) {
            const time = distance * 8;

            let currentLeg = 'right';
            this.setState({'miniDaniilInterval': window.setInterval(() => {
                $(`.mini_daniil_${currentLeg}_leg`).animate({
                    'rotate': '-30deg'
                })

                $(`.mini_daniil_${currentLeg}_bottom_leg`).animate({
                    'rotate': '50deg',
                    'height': '120%'
                }, 200, () => {
                    $(`.mini_daniil_${currentLeg}_bottom_leg`).animate({
                        'rotate': '0deg',
                        'height': '100%'
                    }, 200, () => {
                        $(`.mini_daniil_${currentLeg}_leg`).animate({
                            'rotate': '0deg'
                        }, 200)

                        if (currentLeg == 'right') {
                            currentLeg = 'left';
                        } else {
                            currentLeg = 'right';
                        }
                    })
                })
            }, 600)})

            window.setTimeout(() => {
                $('.mini_daniil').animate({
                    'left': finalPosition
                }, time, 'linear', () => {
                    window.clearInterval(this.state.miniDaniilInterval);
                    this.setState({'miniDaniilStep': nextStep, 'miniDaniilFunc': nextFunc});
                    nextFunc();
                })
            }, 600)
        } else {
            this.setState({'miniDaniilStep': nextStep, 'miniDaniilFunc': nextFunc});
            nextFunc();
        }
    }

    miniDaniilLift70LeftHand = (time=400) => {

        /* 
            time: time in which the movement should be done (ms) (int)

            method executing Mini Daniil's left hand lifting at 70 degrees incline
        */

        $('.mini_daniil_left_sleeve').animate({
            'rotate': '70deg',
            'left': '2%'
        }, time, 'linear');

        $('.mini_daniil_left_arm').animate({
            'rotate': '70deg'
        }, time, 'linear');

        $('.mini_daniil_left_bottom_arm').animate({
            'rotate': '80deg',
            'height': '120%',
            'top': '100%'
        }, time, 'linear');
    }

    miniDaniilLift90LeftHand = (time=400) => {

        /* 
            time: time in which the movement should be done (ms) (int)

            method executing Mini Daniil's left hand lifting at 90 degrees incline
        */

        $('.mini_daniil_left_sleeve').animate({
            'rotate': '90deg',
            'height': '30%',
            'left': '2%'
        }, time, 'linear');

        $('.mini_daniil_left_arm').animate({
            'rotate': '90deg'
        }, time, 'linear');

        $('.mini_daniil_left_bottom_arm').animate({
            'rotate': '90deg',
            'height': '120%',
            'top': '100%'
        }, time, 'linear');
    }

    miniDaniilLift70RightHand = (time=400) => {

        /* 
            time: time in which the movement should be done (ms) (int)

            method executing Mini Daniil's right hand lifting at 70 degrees incline
        */

        $('.mini_daniil_right_sleeve').animate({
            'rotate': '-70deg',
            'right': '2%'
        }, time, 'linear');

        $('.mini_daniil_right_arm').animate({
            'rotate': '-70deg'
        }, time, 'linear');

        $('.mini_daniil_right_bottom_arm').animate({
            'rotate': '-80deg',
            'height': '120%',
            'top': '100%'
        }, time, 'linear');
    }

    miniDaniilLift90RightHand = (time=400) => {

        /* 
            time: time in which the movement should be done (ms) (int)

            method executing Mini Daniil's right hand lifting at 90 degrees incline
        */

        $('.mini_daniil_right_sleeve').animate({
            "rotate": '-90deg',
            "height": '30%',
            'right': '2%'
        }, time, 'linear');

        $('.mini_daniil_right_arm').animate({
            "rotate": '-90deg'
        }, time, 'linear');

        $('.mini_daniil_right_bottom_arm').animate({
            'rotate': '-90deg',
            'height': '120%',
            'top': '100%'
        }, time, 'linear');
    }

    miniDaniilPutDownLeftHand = (time=400) => {

        /* 
            time: time in which the movement should be done (ms) (int)

            method executing Mini Daniil's left hand putting down
        */

        $('.mini_daniil_left_bottom_arm').animate({
            'rotate': '0deg',
            'height': '100%',
            'top': '98%'
        }, time, 'linear');
        
        $('.mini_daniil_left_sleeve').animate({
            'rotate': '30deg',
            'height': '40%',
            'left': '0'
        }, time, 'linear');

        $('.mini_daniil_left_arm').animate({
            'rotate': '30deg'
        }, time, 'linear');
    }

    miniDaniilPutDownRightHand = (time=400) => {

        /* 
            time: time in which the movement should be done (ms) (int)

            method executing Mini Daniil's right hand putting down
        */

        $('.mini_daniil_right_bottom_arm').animate({
            'rotate': '0deg',
            'height': '100%',
            'top': '98%'
        }, time, 'linear');
        
        $('.mini_daniil_right_sleeve').animate({
            'rotate': '-30deg',
            'height': '40%',
            'right': '0'
        }, time, 'linear');

        $('.mini_daniil_right_arm').animate({
            'rotate': '-30deg'
        }, time, 'linear');
    }

    miniDaniilWaveHand = (repeatTimes, nextStep, nextFunc, putDownAfter=true) => {

        /* 
            repeatTimes: how many times Mini Daniil should wave his hand (int)
            nextStep: next step's id (int)
            nextFunc: next step's function (function)
            putDownAfter: indicates if Mini Daniil should put down his hand after waving (bool)

            method executing Mini Daniil's waving hand process
        */

        this.miniDaniilLift70RightHand();
        
        this.setState({'miniDaniilTimeout': window.setTimeout(() => {
            let x = 0;
            this.setState({'miniDaniilInterval': window.setInterval(() => {
                if(x < repeatTimes) {
                    $('.mini_daniil_right_bottom_arm').animate({
                        'rotate': '-40deg'
                    }, 400, 'linear', () => {
                        $('.mini_daniil_right_bottom_arm').animate({
                            'rotate': '-80deg'
                        }, 400, 'linear')
                    })
                    x++;
                } else {
                    window.clearInterval(this.state.miniDaniilInterval);

                    if(putDownAfter) {
                        this.miniDaniilPutDownRightHand();
                    }
                    
                    this.setState({'miniDaniilStep': nextStep, 'miniDaniilFunc': nextFunc});
                    nextFunc();
                }
            }, 800)});
        }, 400)});
    }

    miniDaniilNetsAppear = (finalTop, onlyLeft, nextStep = undefined, nextFunc = undefined) => {

        /* 
            finalTop: Mini Daniil's top position after the movement (int)
            onlyLeft: indicates if it's only left net that should appear (bool)
            nextStep: next step's id (int)
            nextFunc: next step's function (function)

            method executing Mini Daniil's nets (or strings) appearance and triggering his vertical movement with it
        */

        const currentPosition = parseInt($('.mini_daniil').css('top').replace('px', ''));
        const distance = Math.ceil(Math.abs(currentPosition - finalTop));
        const time = distance * 6;

        if(!onlyLeft) {
            $('.mini_daniil_right_net').animate({
                'width': currentPosition + $('.mini_daniil').height() * 0.4
            }, time / 2);
        }

        $('.mini_daniil_left_net').animate({
            'width': currentPosition + $('.mini_daniil').height() * 0.4
        }, time / 2, () => {
            this.miniDaniilNetsMove(finalTop, time, nextStep, nextFunc);
        });
    }

    miniDaniilNetsMove = (finalTop, time, nextStep, nextFunc) => {

        /* 
            finalTop: Mini Daniil's top position after the movement (int)
            time: time in which the movement should be done (ms) (int)
            nextStep: next step's id (int)
            nextFunc: next step's function (function)

            method executing Mini Daniil's vertical movement with nets (or strings)
        */

        if(finalTop > $('.mini_daniil').position().top) {
            $('.mini_daniil_left_net').css('width', finalTop + $('.mini_daniil').height() * 0.4 + 'px');
        }

        $('.mini_daniil').animate({
            'top': finalTop + 'px'
        }, time, () => {
            if(nextFunc != undefined && nextStep != undefined) {
                this.setState({'miniDaniilFunc': nextFunc, 'miniDaniilStep': nextStep});
                nextFunc();
            };
        })
    }

    miniDaniilFirst = () => {

        /*
            Mini Daniil's presentation's 1st step's method
            executes MD's waving hand
        */

        $('.cloud_text').css('display', 'none');
        this.miniDaniilWaveHand(2, 2, this.miniDaniilSecond);
        this.setState({'miniDaniilStep': 1});
    }

    miniDaniilSecond = () => {

        /*
            Mini Daniil's presentation's 2nd step's method
            executes MD's saying phases from 1 to 9
        */

        this.miniDaniilTalk(9, 3, this.miniDaniilThird);
    }

    miniDaniilThird = () => {

        /*
            Mini Daniil's presentation's 3rd step's method
            executes MD's lifting hands at 90 degrees incline
        */

        this.miniDaniilLift90LeftHand();
        this.miniDaniilLift90RightHand();

        this.setState({'miniDaniilFunc': this.miniDaniilFourth, 'miniDaniilStep': 4});
        this.setState({'miniDaniilTimeout': window.setTimeout(() => {
            this.miniDaniilFourth();
        }, 400)})
    }

    miniDaniilFourth = () => {

        /*
            Mini Daniil's presentation's 4th step's method
            executes MD's nets (or strings) appearing and moving him up 
        */

        if(window.innerWidth < 768) {
            $('.m_menu_open').trigger('click');
        }
        this.miniDaniilNetsAppear($('.header_top').height() * 1.2, false, 5, this.miniDaniilFifth);
    }

    miniDaniilFifth = () => {

        /*
            Mini Daniil's presentation's 5th step's method
            executes MD's nets (or strings) moving away and putting down his hands
            (only right one in mobile version)
        */

        $('.mini_daniil_left_net').animate({
            'width': 0
        }, 200);

        $('.mini_daniil_right_net').animate({
            'width': 0
        }, 200, () => {

            if(window.innerWidth >= 768) {
                this.miniDaniilPutDownLeftHand();
            };

            this.miniDaniilPutDownRightHand();

            this.setState({'miniDaniilFunc': this.miniDaniilSixth, 'miniDaniilStep': 6});
            this.setState({'miniDaniilTimeout': window.setTimeout(() => {
                this.miniDaniilSixth();
            }, 400)});
        });
    }

    miniDaniilSixth = () => {

        /*
            Mini Daniil's presentation's 6th step's method
            executes MD's moving to the theme block in PC version
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilMove('.theme_block', 7, this.miniDaniilSeventh);
        } else {
            this.setState({'miniDaniilStep': 7, 'miniDaniilFunc': this.miniDaniilSeventh});
            this.miniDaniilSeventh();
        }
    }

    miniDaniilSeventh = () => {

        /*
            Mini Daniil's presentation's 7th step's method
            executes MD's saying phases from 10 to 12
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilLift90LeftHand();
        } else if($('.m_menu_open').css('display') != 'none') {
            $('.m_menu_open').trigger('click');
        };
        this.miniDaniilTalk(12, 8, this.miniDaniilEighth, 10, () => $('.theme_block').trigger('click'));
    }

    miniDaniilEighth = () => {

        /*
            Mini Daniil's presentation's 8th step's method
            executes MD's saying phases from 13 to 14 and showing portfolio item in site's menu
        */

        let talkStep, talkFunc;
        if(window.innerWidth >= 768) {
            this.miniDaniilLift70LeftHand();
            talkStep = 13;
            talkFunc = () => $('#menu_portfolio')[0].click();
        } else {
            this.miniDaniilPutDownLeftHand();
            if(this.state.miniDaniilText < 14) {
                this.miniDaniilLift70RightHand();
                if($('.m_menu_open').css('display') != 'none') {
                    $('.m_menu_open').trigger('click');
                }
            }
            talkStep = 14;
            talkFunc = () => {
                $('#menu_portfolio')[0].click();
                this.miniDaniilPutDownRightHand();
                $('.m_menu_background').trigger('click');
            }
        }
        this.miniDaniilTalk(14, 9, this.miniDaniilNinth, talkStep, talkFunc);
    }

    miniDaniilNinth = () => {

        /*
            Mini Daniil's presentation's 9th step's method
            executes MD's saying phases from 15 to 16
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilPutDownLeftHand();
        }
        this.miniDaniilTalk(16, 10, this.miniDaniilTenth, 15, () => $('.item_block:last-child').trigger('click'));
    }

    miniDaniilTenth = () => {

        /*
            Mini Daniil's presentation's 10th step's method
            executes MD's moving between education item and experience item in menu in PC version
            and to education item in mobile version
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilMove('#menu_education', 11, this.miniDaniilEleventh, '#menu_experience');
        } else {
            this.miniDaniilLift90LeftHand();
            this.setState({'miniDaniilTimeout': window.setTimeout(() => {
                this.miniDaniilNetsAppear($('.header_top').height() * 1.2 + 42, true, 11, this.miniDaniilEleventh);
            }, 400)});
        }
    }

    miniDaniilEleventh = () => {

        /*
            Mini Daniil's presentation's 11th step's method
            executes MD's saying phase number 17 and showing education item in site's menu
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilLift70LeftHand();
        } else {
            if($('.m_menu_open').css('display') != 'none') {
                $('.m_menu_open').trigger('click');
            }
            this.miniDaniilLift70RightHand();
        }
        this.miniDaniilTalk(17, 12, this.miniDaniilTwelfth, 17, () => $('#menu_education')[0].click());
    }

    miniDaniilTwelfth = () => {

        /*
            Mini Daniil's presentation's 12th step's method
            executes MD's saying phase number 18 and showing experience item in site's menu
            (also moving to it in mobile version)
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilPutDownLeftHand();
            this.miniDaniilLift70RightHand();
            this.miniDaniilTalk(18, 13, this.miniDaniilThirteenth, 18, () => $('#menu_experience')[0].click());
        } else {
            this.miniDaniilNetsMove($('.header_top').height() * 1.2 + 84, 200);
            this.setState({'miniDaniilTimeout': window.setTimeout(() => {
                if($('.m_menu_open').css('display') != 'none') {
                    $('.m_menu_open').trigger('click');
                }
                this.miniDaniilLift70RightHand();
                this.miniDaniilTalk(18, 13, this.miniDaniilThirteenth, 18, () => $('#menu_experience')[0].click());
            }, 200)});
        }
    }

    miniDaniilThirteenth = () => {

        /*
            Mini Daniil's presentation's 13th step's method
            executes MD's moving between skillset item and game item in menu in PC version
            and to skillset item in mobile version
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilPutDownRightHand();
            $('.mini_daniil_text_cloud').css({'right': '160%', 'left': 'auto'});
            $('.mini_daniil_text_cloud_bottom').addClass('text_cloud_bottom_mirror');
            this.miniDaniilMove('#menu_skillset', 14, this.miniDaniilFourteenth, '#menu_game');
        } else {
            this.miniDaniilNetsMove($('.header_top').height() * 1.2 + 126, 200);
            this.setState({'miniDaniilFunc': this.miniDaniilFourteenth, 'miniDaniilStep': 14});
            this.setState({'miniDaniilTimeout': window.setTimeout(() => {
                this.miniDaniilFourteenth();
            }, 200)});
        }
    }

    miniDaniilFourteenth = () => {

        /*
            Mini Daniil's presentation's 14th step's method
            executes MD's saying phases from 19 to 21 and showing skillset item in site's menu
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilLift70LeftHand();
        } else if($('.m_menu_open').css('display') != 'none') {
           $('.m_menu_open').trigger('click');
        };
        this.miniDaniilTalk(21, 15, this.miniDaniilFifteenth, 21, () => $('#menu_skillset')[0].click());
    }

    miniDaniilFifteenth = () => {

        /*
            Mini Daniil's presentation's 15th step's method
            executes MD's saying phases from 22 to 25 and showing game item in site's menu
            (also moving to it in mobile version)
        */

        if(window.innerWidth >= 768) {
            this.miniDaniilPutDownLeftHand();
            this.miniDaniilLift70RightHand();
            this.miniDaniilTalk(25, 16, this.miniDaniilSixteenth, 23, () => $('#menu_game')[0].click());
        } else {
            this.miniDaniilNetsMove( $('.header_top').height() * 1.2 + 168, 200);
            this.setState({'miniDaniilTimeout': window.setTimeout(() => {
                if($('.m_menu_open').css('display') != 'none') {
                    $('.m_menu_open').trigger('click');
                }
                this.miniDaniilTalk(25, 16, this.miniDaniilSixteenth, 23, () => $('#menu_game')[0].click());
            }, 200)});
        }
    }

    miniDaniilSixteenth = () => {

        /*
            Mini Daniil's presentation's 16th step's method
            executes MD's saying phases from 26 to 28
            (also moving a little higher and moving away the left net (or string) in mobile version)
        */

        if(window.innerWidth < 768) {
            $('.m_menu_background').trigger('click');

            $('.mini_daniil').animate({
                'top': $('.header_top').height() * 1.2 + 84 + 'px'
            }, 400, () => {
                $('.mini_daniil_left_net').animate({
                    'width': 0
                }, 400, () => {
                    this.miniDaniilPutDownLeftHand();
                });
            });
        }
        this.miniDaniilPutDownRightHand();
        this.miniDaniilTalk(28, 17, this.miniDaniilSeventeenth, 26, () => $('.header_title')[0].click());
    }

    miniDaniilSeventeenth = () => {

        /*
            Mini Daniil's presentation's 17th step's method
            executes MD's saying phases from 29 to 30
        */

        this.miniDaniilTalk(30, 18, this.miniDaniilEighteenth);
    }

    miniDaniilEighteenth = () => {

        /*
            Mini Daniil's presentation's 18th step's method
            executes MD's waving hand
        */

        this.miniDaniilWaveHand(2, 19, this.miniDaniilNineteenth, false);
    }

    miniDaniilNineteenth = () => {

        /*
            Mini Daniil's presentation's 19th step's method
            executes MD's lifting hand at 90 degrees incline
        */

        this.miniDaniilLift90LeftHand();
        this.miniDaniilLift90RightHand();

        this.setState({'miniDaniilFunc': this.miniDaniilTwentieth, 'miniDaniilStep': 20});
        this.setState({'miniDaniilTimeout': window.setTimeout(() => {
            this.miniDaniilTwentieth();
        }, 400)})
    }

    miniDaniilTwentieth = () => {

        /*
            Mini Daniil's presentation's 20th step's method
            executes MD's moving off screen
        */

        this.miniDaniilNetsAppear($('.mini_daniil').height() * -1.5, false);
        this.setState({'miniDaniilTimeout': window.setTimeout(() => {
            $('.mini_daniil').css('display', 'none');
        }, 5000)})
    }

    render () {
        return (
            <BrowserRouter>
                <HeaderBlock 
                            links={['portfolio', 'education', 'experience', 'skillset', 'game']} 
                            language={this.state.language} 
                            languages={['EN', 'FR', 'RU']} 
                            changeLanguage={(language) => this.setLanguage(language)} 
                            changeTheme={() => this.changeTheme()}
                />
                <MiniDaniil language={this.state.language} miniDaniilClick={this.miniDaniilClick} />
                <Routes>
                    <Route exact path={'/'} element={<MainPage language={this.state.language} />}/>
                    <Route exact path={'/portfolio'} element={<PortfolioPage 
                                                                portfolioLinks={this.state.portfolioLinks} 
                                                                language={this.state.language} 
                                                                showComment={this.showComment} 
                                                            />} />
                    <Route exact path={'/education'} element={<EducationPage 
                                                                educations={this.state.educations} 
                                                                language={this.state.language} 
                                                                showComment={this.showComment} 
                                                            />} />
                    <Route exact path={'/experience'} element={<ExperiencePage 
                                                                experiences={this.state.experiences} 
                                                                language={this.state.language} 
                                                                showComment={this.showComment} 
                                                            />}/>
                    <Route exact path={'/skillset'} element={<SkillsetPage 
                                                                skills={this.state.skills} 
                                                                language={this.state.language} 
                                                                showComment={this.showComment} 
                                                            />}/>
                    <Route exact path={'/game'} element={<GamePage language={this.state.language} />}/>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;
