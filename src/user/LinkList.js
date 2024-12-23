import React, { useState } from 'react';

const regex = /(\d+)_/;

const Link = ({ name, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
);

const Folder = ({ folder ,admin,onDeleteFile,onExpand}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    //const toggleExpanded = () => setIsExpanded(!isExpanded);


    const toggleExpanded = () => {
        const newExpandedState = !isExpanded; // Compute the new state
        setIsExpanded(newExpandedState);     // Update local state
        onExpand?.(newExpandedState);        // Notify the parent
    };


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
            <button className={"custom-header-button"} onClick={toggleExpanded}>{isExpanded ? '- ' : '+ '}{Object.keys(folder)[0]}</button>
            {isExpanded && (
                <ul>
                    {folder[Object.keys(folder)[0]].map((link, index) => {
                        const match = link.name.match(regex)
                        const shouldPerformMatch = match && match[1].length >= 12 && match[1].length <= 15;

                        return (
                            <li key={link.url} onClick={handleFileClick}>
                                {/* <Link name={"deletevftr5"+link.name} url={"#" +link.url} /> */}
                                {/* title={link.name} */}
                                <a hidden={!admin} name={"deletevftr5" + link.url} href={"#" + link.url} title={link.name}>
                                    (delete)
                                </a>
                                <a
                                    name={link.url}
                                    href={"#" + link.url}
                                    title={link.name}
                                    // Conditionally remove regex match from link.name
                                    onClick={() => shouldPerformMatch && handleFileClick(link.name.replace(regex, ''))}
                                >
                                    {shouldPerformMatch ? link.name.replace(regex, '') : link.name}
                                </a>
                            </li>
                        );

                        // <li key={link.url} onClick={handleFileClick}>
                        //     {/*<Link name={"deletevftr5"+link.name} url={"#" +link.url} />*/}
                        //     {/* title={link.name} */}
                        //     <a hidden={!admin} name={"deletevftr5"+link.url} href={"#" + link.url} title={link.name}>(delete) </a>
                        //     <a name={link.url} href={"#" + link.url} title={link.name}>{link.name}</a>
                        // </li>
                })}
                </ul>
            )}
        </div>
    );
};



const LinkList = ({ links, admin, onDeleteFile }) => {
    const [expandedFoldersCount, setExpandedFoldersCount] = useState(0);

    // Function to handle folder expansion and collapse
    const onExpandList = (isExpanded) => {
        setExpandedFoldersCount((prevCount) => isExpanded ? prevCount + 1 : prevCount - 1);
    };

    const listStyle = {
    //width: expandedFoldersCount > 0 ? "500px" : "300px", // Adjust width dynamically
        transition: "width 0.3s ease", // Smooth transition for width change
    };

    return (
        <div style={listStyle}>
            {links.map((link, index) => (
                <div key={index}>
                    <Folder
                        folder={link}
                        admin={admin}
                        onDeleteFile={onDeleteFile}
                        onExpand={onExpandList}
                    />
                    <br />
                </div>
            ))}
        </div>
    );
};



export default LinkList;
