import React, { useState } from 'react';

const Link = ({ name, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
);

const Folder = ({ folder }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    return (
        <div>
            <button onClick={toggleExpanded}>{isExpanded ? '-' : '+'}</button>
            <a>{Object.keys(folder)[0]}</a>

            {isExpanded && (
                <ul>
                    {folder[Object.keys(folder)[0]].map((link, index) => (
                        <li key={index}>
                            <Link name={link.name} url={link.url} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const LinkList = ({ links }) => (
    <div>
        {links.map((link, index) => (
            <div>
            <Folder key={index} folder={link} />
            <br/>
            </div>
        ))}
    </div>
);

export default LinkList;
