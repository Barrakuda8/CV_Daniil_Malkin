import React from 'react';
import language_data from '../site_content.json';
import $ from 'jquery';

let legsInterval;

const GamePage = ({language}) => {

    /*  
        language: site's current language (string)
        return: game's block with score block, speed block and button block inside
    */

    function moveButton(e) {

        /*
            function executing button's move on mouse enter or on click
            and giving points for clicking.

            buttons destionation is selected randomly,
            after it the distance and time of the movement are calculated.
        */

        if(e.type == 'click') {
            $('.game_score').html(parseInt($('.game_score').html()) + 1);
        }

        window.clearInterval(legsInterval);
        $('.game_button_block').stop();

        let top = Math.floor(Math.random() * (window.innerHeight * 0.6)) + window.innerHeight * 0.2;
        let left = Math.floor(Math.random() * (window.innerWidth * 0.6)) + window.innerWidth * 0.2;

        let diffY = Math.abs(top - e.clientY);
        let diffX = Math.abs(left - e.clientX);

        let distance = Math.floor(Math.sqrt(diffY * diffY + diffX * diffX));
        let time = distance * 10 / $('.game_speed').val();

        $('.game_button > div').css('display', 'block');

        legsInterval = window.setInterval(() => {
            let left = '20deg';
            let right = '-20deg';
            if($('.game_button_left_leg').css('rotate') == '20deg') {
                left = '-20deg';
                right = '20deg';
            }

            $('.game_button_left_leg').animate({
                rotate: left
            }, 100)

            $('.game_button_right_leg').animate({
                rotate: right
            }, 100)
        }, 100)

        $('.game_button_block').animate({
            "top": top + 'px',
            "left": left + 'px'
        }, time, 'linear', () => {
            window.clearInterval(legsInterval);
            $('.game_button > div').css('display', '');
        })
    }

    function checkInput(e) {
        let value = parseInt(e.target.value);

        if(value > 10) {
            value = 10;
        } else if (value < 1) {
            value = 1;
        }
        
        $('.game_speed').val(value);
    }

    return (
        <div className='content'>
            <div className='game_top_block'>
                <div className='game_score_block'>
                    <span className='game_score_label'>{language_data[language]['/game']['game_score_label']}</span>
                    <span className='game_score'>0</span>
                </div>
                <div className='game_speed_block'>
                    <span className='game_speed_label'>{language_data[language]['/game']['game_speed_label']}</span>
                    <input className='game_speed' type='number' min='1' max='10' defaultValue={3} onInput={checkInput}/>
                </div>
            </div>
            <div className='game_button_block' onMouseEnter={moveButton} onClick={moveButton}>
                <div className='game_button'>
                    <span className='game_button_text'>{language_data[language]['/game']['game_button_text']}</span>
                    <div className='game_button_head'></div>
                    <div className='game_button_left_leg'></div>
                    <div className='game_button_right_leg'></div>
                </div>
            </div>
        </div>
    )
}

export default GamePage;