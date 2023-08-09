import React, { useState } from 'react';
import logo from "../../loading-gif.gif";

function ControlMetabase() {
    const [syncStatus, setSyncStatus] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [link, setLink] = useState(null);
    const [working, setWorking] = useState(false);
    const [key,setKey] = useState("");

    const handleSyncClick = async () => {
        setWorking(true);
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key:key })
            };
            const response = await fetch('https://inprove-sport.info/csv/moveToMetabase',options);


            setWorking(false);
            const data = await response.json();

            if (data.res === 'ok') {
                setUsername(data.username);
                setPassword(data.password);
                setLink(data.link);
                setSyncStatus('success');
            }else if(data.res === "no") {
                alert("Please login as an admin to continue");
                return;
            }
            else {
                setSyncStatus('error');
                setWorking(false);
            }
        } catch (error) {
            setSyncStatus('error');
            setWorking(false);
        }
    };

    function handleKey(event) {
        event.preventDefault();
        setKey(event.target.value);
    }

    return (
        <div>
            <p>Here you may temporarily synchronize data to Metabase</p>
            <div className="form-group">
                <input type="text" className="form-control" name="key" placeholder="key" onChange={handleKey}/>
            </div>
            <button disabled={working} className={"btn btn-primary btn-block"} onClick={handleSyncClick}>Synchronize Metabase</button>
            <img width={30} src={logo} alt="loading..." hidden={!working} />
            {syncStatus === 'success' && (
                <div>
                    <p>Data is moved successfully to Metabase, and will be deleted in 2 hours...<br/>
                        Please click on the following link to access Metabase, and use the given username and password to login:<br/>
                        Username: {username}<br/>
                        Password: {password}<br/>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                        </a>
                    </p>

                </div>
            )}
            {syncStatus === 'error' && (
                <p>An error occurred</p>
            )}
        </div>
    );
}

export default ControlMetabase;
