import React from 'react';
import parse from 'html-react-parser';

const Education = ({education, language, showComment}) => {

    /*  
        education: education's object
        language: site's current language (string)
        showCommect: function executing showing or hiding of education's comment
        return: education's block-container with information about it
    */

    let comment = education.comment[language].replace(/"([a-zA-Zа-яёА-ЯЁ]+)\|([a-zA-Zа-яёА-ЯЁ]+)"/g, '<a href="/$2" className="link">$1</a>');

    return (
        <div className='item_block' onClick={() => showComment(education.id)}>
            <span className='item_name'>{education.program[language]}</span>
            <span className='item_param'>{education.institution[language]}, {education.city[language]}, {education.country[language]}</span>
            <span className='item_param'>{education.start_date[language]} - {education.end_date[language]}</span>
            <span className={'item_comment comment_' + education.id}>{parse(comment)}</span>
            <div className={'item_arrow arrow_' + education.id}></div>
        </div>
    )
}

const EducationPage = ({educations, language, showComment}) => {

    /*
        educations: array of educations' objects
        language: site's current language (string)
        showCommect: function executing showing or hiding of education's comment
        return: block with all educations' blocks inside
    */

    // ordering educations by its start date
    educations = educations.sort((a, b) => parseInt(a.start_date['EN'].replace(/\w+\s/g, '')) < parseInt(b.start_date['EN'].replace(/\w+\s/g, '')) ? 1 : -1);

    return (
        <div className='content container'>
            {educations.map((education) => <Education education={education} language={language} showComment={showComment} key={education.id}/>)}
        </div>
    )
}

export default EducationPage;