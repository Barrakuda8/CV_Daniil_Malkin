import React from 'react';
import parse from 'html-react-parser';
import language_data from '../site_content.json';

const Skill = ({skill, language, showComment}) => {

    /*
        skill: skill's object
        language: site's current language (string)
        showCommect: function executing showing or hiding of skill's comment
        return: skill's block-container with information about it
    */

    let comment = skill.comment[language].replace(/"([a-zA-Zа-яёА-ЯЁ]+)\|([a-zA-Zа-яёА-ЯЁ]+)"/g, '<a href="/$2" className="link">$1</a>');

    return (
        <div className='item_block' onClick={() => showComment(skill.id)}>
            <span className='item_name'>{skill.name[language]}</span>
            <span className={'item_comment comment_' + skill.id}>{parse(comment)}</span>
            <div className={'item_arrow arrow_' + skill.id}></div>
        </div>
    )
}

const SkillType = ({type, language, showComment}) => {

    /*
        type: array of types name and skills
        language: site's current language (string)
        showCommect: function executing showing or hiding of skills comment
        return: block with skill type's name and blocks of its skills inside
    */

    return (
        <div className='skills_block'>
            <span className='skills_title' id={'skills_' + type[0]}>{language_data[language]['/skillset'][`skills_${type[0]}`]}</span>
            {type[1].map((skill) => <Skill skill={skill} language={language} showComment={showComment} key={skill.id}/>)}
        </div>
    )
}

const SkillsetPage = ({skills, language, showComment}) => {

    /*
        skills: array of skills' objects
        language: site's current language (string)
        showCommect: function executing showing or hiding of skill's comment
        return: block with all skill types inside
    */

    // ordering skill types
    let data = {
        'language': [],
        'programming': [],
        'personal': [],
    }

    for (let skill of skills) {
        data[skill.type].push(skill);
    }

    return (
        <div className='content container'>
            {Object.entries(data).map((type) => <SkillType type={type} language={language} showComment={showComment} key={type}/>)}
        </div>
    )
}

export default SkillsetPage;