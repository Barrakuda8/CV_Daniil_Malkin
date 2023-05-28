import React from 'react';
import parse from 'html-react-parser';
import language_data from '../site_content.json';

const MainPage = ({language}) => {

    /*
        language: site's current language (string)
        return: block with a photo and a text
    */

    let text = language_data[language]['/']['main_text'].replace(/\n/g, '</br></br>').replace(/"([a-zA-Zа-яёА-ЯЁéÉ]+)\|([a-zA-Zа-яёА-ЯЁ]+)"/g, '<a href="/$2" className="link">$1</a>');

    return (
        <div className='container main_content'>
            <img src='/Daniil.jpg' alt='Daniil' className='main_photo'/>
            <span className='main_text'>{parse(text)}</span>
        </div>
    )
}

export default MainPage;