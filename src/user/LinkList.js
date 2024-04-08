import React, { useState } from 'react';

const Link = ({ name, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
);

const Folder = ({ folder ,admin,onDeleteFile}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);


    const handleFileClick = (event) =>{
        event.preventDefault();
        if(event.target.name.startsWith("deletevftr5")){
            onDeleteFile(event.target.name.replace("deletevftr5",""));
            return;
        }
        window.location.href = "https://inprove-sport.info/" + "files/viewMyFiles/" + event.target.name;
    }

    return (
        <div>
            <button className={"form-control"} onClick={toggleExpanded}>{isExpanded ? '- ' : '+ '}{Object.keys(folder)[0]}</button>

            {isExpanded && (
                <ul>
                    {folder[Object.keys(folder)[0]].map((link, index) => (
                        <li key={link.url} onClick={handleFileClick}>
                            {/*<Link name={"deletevftr5"+link.name} url={"#" +link.url} />*/}
                            {/* title={link.name} */}
                            <a hidden={!admin} name={"deletevftr5"+link.url} href={"#" + link.url} title={link.name}>(delete) </a>
                            <a name={link.url} href={"#" + link.url} title={link.name}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const LinkList = ({ links ,admin, onDeleteFile}) => (
    <div>
        {links.map((link, index) => (
            <div>
            <Folder key={index} folder={link} admin={admin} onDeleteFile={onDeleteFile}/>
            <br/>
            </div>
        ))}
    </div>
);



export default LinkList;
