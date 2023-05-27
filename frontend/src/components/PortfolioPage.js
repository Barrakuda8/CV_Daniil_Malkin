import React from 'react';
import parse from 'html-react-parser';

const PortfolioLink = ({link, language, showComment}) => {

    /*
        link: link's object
        language: site's current language (string)
        showCommect: function executing showing or hiding of link's comment
        return: link's block-container with information about it
    */

    let comment = link.comment[language].replace(/"([a-zA-Zа-яёА-ЯЁ]+)\|([a-zA-Zа-яёА-ЯЁ]+)"/g, '<a href="/$2" className="link">$1</a>');

    return (
        <div className='item_block' onClick={() => showComment(link.id)}>
            <span className='item_name'>{link.name[language]}</span>
            <a className='item_link' href={link.link}>{link.link}</a>
            <span className={'item_comment comment_' + link.id}>{parse(comment)}</span>
            <div className={'item_arrow arrow_' + link.id}></div>
        </div>
    )
}

const PortfolioPage = ({portfolioLinks, language, showComment}) => {

    /*  
        portfolioLinks: array of links' objects
        language: site's current language (string)
        showCommect: function executing showing or hiding of link's comment
        return: block with all links' blocks inside
    */

    return (
        <div className='content container'>
            {portfolioLinks.map((link) => <PortfolioLink 
                                            link={link} 
                                            language={language} 
                                            showComment={showComment} 
                                            key={link.id} 
                                        />)}
        </div>
    )
}

export default PortfolioPage;