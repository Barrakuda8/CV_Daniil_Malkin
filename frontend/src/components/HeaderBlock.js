import React from 'react';
import {NavLink} from 'react-router-dom';
import $ from 'jquery';
import language_data from '../site_content.json';

const MenuLink = ({link, language}) => {

    /*
        link: link (string)
        language: site's current language (string)
        return: menus links block
    */

    return (
        <NavLink to={'/' + link} className='menu_link' id={'menu_' + link}>{language_data[language]['header'][`menu_${link}`]}</NavLink>
    )
}

const HeaderLanguage = ({language, changeLanguage}) => {

    /*  
        language: language (string)
        changeLanguage: function changing language on the site
        return: change language buttons' block
    */

    return (
        <div onClick={() => changeLanguage(language)} className={'header_language header_language_' + language}></div>
    )
}

const HeaderBlock = ({links, language, languages, changeLanguage, changeTheme}) => {

    /*  
        links: array of links (strings)
        language: site's current language (string)
        languages: array of languages (strings)
        changeLanguage: function changing language on the site
        changeTheme: function changing the site's theme
        return: site's header with menu, change theme button and language change buttons
    */

    function openMenu() {
        $('.menu_block').animate({
            'top': '50px'
        }, 400)

        $('.m_menu_background').css('display', 'flex');

        window.setTimeout(() => {
            $('.m_menu_open').css('display', 'none');
            $('.header_title').css('display', 'none');
            $('.header_language').css('display', 'flex');
            $('.theme_block').css('display', 'flex');
            $('.m_menu_close').css('display', 'flex');
        }, 200)
    }

    function closeMenu() {
        $('.menu_block').animate({
            'top': '-250px'
        }, 400)

        $('.m_menu_background').css('display', '');
        $('.m_menu_close').css('display', '');

        window.setTimeout(() => {
            $('.m_menu_open').css('display', '');
            $('.header_title').css('display', '');
            $('.header_language').css('display', '');
            $('.theme_block').css('display', '');
        }, 200)
    }

    return (
        <div className='header container'>
            <div className='header_top'>
                <div onClick={() => changeTheme()} className='theme_block'>
                    <div className='theme_sky_one'></div>
                    <div className='theme_sky_two'></div>
                    <div className='theme_sky_three'></div>
                    <div className='theme_sky_four'></div>
                    <div className='theme_cloud_one theme_cloud_back'></div>
                    <div className='theme_cloud_two theme_cloud_back'></div>
                    <div className='theme_cloud_three theme_cloud_back'></div>
                    <div className='theme_cloud_four theme_cloud_back'></div>
                    <div className='theme_cloud_five theme_cloud_back'></div>
                    <div className='theme_cloud_six theme_cloud_back'></div>
                    <div className='theme_cloud_seven theme_cloud_front'></div>
                    <div className='theme_cloud_eight theme_cloud_front'></div>
                    <div className='theme_cloud_nine theme_cloud_front'></div>
                    <div className='theme_cloud_ten theme_cloud_front'></div>
                    <div className='theme_cloud_eleven theme_cloud_front'></div>
                    <div className='theme_cloud_twelve theme_cloud_front'></div>
                    <div className='theme_sun'></div>
                    <div className='theme_moon_hole_one theme_moon_hole'></div>
                    <div className='theme_moon_hole_two theme_moon_hole'></div>
                    <div className='theme_moon_hole_three theme_moon_hole'></div>
                    <img src='/theme_star.png' alt='*' className='theme_star theme_star_one'/>
                    <img src='/theme_star.png' alt='*' className='theme_star theme_star_two'/>
                    <img src='/theme_star.png' alt='*' className='theme_star theme_star_three'/>
                    <img src='/theme_star.png' alt='*' className='theme_star theme_star_four'/>
                    <img src='/theme_star.png' alt='*' className='theme_star theme_star_five'/>
                    <img src='/theme_star.png' alt='*' className='theme_star theme_star_six'/>
                </div>
                <NavLink to='/' className='header_title'>{language_data[language]['header']['header_title']}</NavLink>
                <div className='header_languages'>{languages.map((language) => <HeaderLanguage 
                                                                                    language={language} 
                                                                                    changeLanguage={changeLanguage} 
                                                                                    key={language} 
                                                                                />)}</div>
                <div className='m_menu_open' onClick={() => openMenu()}>
                    <div className='m_menu_open_line'></div>
                    <div className='m_menu_open_line'></div>
                    <div className='m_menu_open_line'></div>
                </div>
            </div>
            <div className='menu_block'>
                {links.map((link) => <MenuLink link={link} language={language} key={link} />)}
            </div>
            <div className='m_menu_close m_menu_close_right' onClick={() => closeMenu()}></div>
            <div className='m_menu_close m_menu_close_left' onClick={() => closeMenu()}></div>
            <div className='m_menu_background' onClick={() => closeMenu()}></div>
        </div>
    )
}

export default HeaderBlock;