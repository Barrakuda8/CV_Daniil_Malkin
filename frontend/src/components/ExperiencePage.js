import React from 'react';
import parse from 'html-react-parser';

const Experience = ({experience, language, showComment}) => {

    /*
        experience: experience's object
        language: site's current language (string)
        showCommect: function executing showing or hiding of experience's comment
        return: experience's block-container with information about it
    */

    let comment = experience.comment[language].replace(/"([a-zA-Zа-яёА-ЯЁéÉ]+)\|([a-zA-Zа-яёА-ЯЁ]+)"/g, '<a href="/$2" className="link">$1</a>');

    return (
        <div className='item_block' onClick={(e) => showComment(e, experience.id)}>
            <span className='item_name'>{experience.position[language]}</span>
            <span className='item_param'>{experience.organisation[language]}, {experience.city[language]}, {experience.country[language]}</span>
            <span className='item_param'>{experience.start_date[language]} - {experience.end_date[language]}</span>
            <span className={'item_comment comment_' + experience.id}>{parse(comment)}</span>
            <div className={'item_arrow arrow_' + experience.id}></div>
        </div>
    )
}

const ExperiencePage = ({experiences, language, showComment}) => {

    /* 
        experiences: array of experiences' objects
        language: site's current language (string)
        showCommect: function executing showing or hiding of experience's comment
        return: block with all experiences' blocks inside
    */

    // ordering experiences by its start date
    experiences = experiences.sort((a, b) => parseInt(a.start_date['EN'].replace(/\w+\s/g, '')) < parseInt(b.start_date['EN'].replace(/\w+\s/g, '')) ? 1 : -1);

    return (
        <div className='content container'>
            {experiences.map((experience) => <Experience 
                                                experience={experience} 
                                                language={language} 
                                                showComment={showComment} 
                                                key={experience.id}
                                            />)}
        </div>
    )
}

export default ExperiencePage;