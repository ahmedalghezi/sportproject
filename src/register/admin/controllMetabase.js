import React, {useState} from 'react';
import logo from "../../loading-gif.gif";

function ControlMetabase() {
    const [syncStatus, setSyncStatus] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [link, setLink] = useState(null);
    const [working, setWorking] = useState(false);
    const [key, setKey] = useState("");


    const [usernameTree, setUsernameTree] = useState(null);
    const [passwordTree, setPasswordTree] = useState(null);
    const [linkTree, setLinkTree] = useState(null);
    const [newIp, setNewIp] = useState(false);

    const handleSyncClick = async () => {
        setWorking(true);
        try {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({key: key})
            };
            const response = await fetch('https://inprove-sport.info/csv/moveToMetabase', options);


            setWorking(false);
            const data = await response.json();

            if (data.res === 'ok') {
                setUsername(data.username);
                setPassword(data.password);
                setLink(data.link);
                setLinkTree(data.tree.link);
                setPasswordTree(data.tree.password);
                setUsernameTree(data.tree.username);
                setNewIp(data.newIp);
                setSyncStatus('success');
            } else if (data.res === "no") {
                alert("Please login as an admin to continue");
                return;
            } else {
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
            <button disabled={working} className={"btn btn-primary btn-block"} onClick={handleSyncClick}>Synchronize
                Metabase
            </button>
            <img width={30} src={logo} alt="loading..." hidden={!working}/>
            {syncStatus === 'success' && (

                    <div>
                        <p>Data is moved successfully to Metabase, and will be deleted in 2 hours...<br/>
                            Please click on the following link to access Metabase, and use the given username and
                            password
                            to login:<br/>
                            Username: {username}<br/>
                            Password: {password}<br/>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {link}
                            </a>
                        </p>

                    </div>
            )}

            {syncStatus === 'success' && (

                <div>
                    <p>To access the decision tree platform<br/>
                        <br/>
                        Username: {usernameTree}<br/>
                        Password: {passwordTree}<br/>
                        <a href={linkTree} target="_blank" rel="noopener noreferrer">
                            {linkTree}
                        </a>
                    </p>

                </div>

            )}

            {newIp && (

                <div>
                    <p style="color: red;">For security reasons, the links are behind firewall.
                        Your IP has changed since your last access! Please wait 2 minutes before using the links. Thanks!</p>
                </div>

            )}




            {syncStatus === 'error' && (
                <p>An error occurred</p>
            )}
        </div>

    );
}

export default ControlMetabase;
