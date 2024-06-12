import React, { useState } from 'react';
import logo from "../../loading-gif.gif";
import Avatar from '../../chaithra/avatar/avatarNew';
import SectionAndEntryManager from '../../register/admin/avatarManger';

const AvatarActions = () => {
    const [working, setWorking] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const [avatarKey, setAvatarKey] = useState(Date.now()); // Use a timestamp as a key

    const handleSyncClick = async () => {
        setWorking(true);
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
           const result=  await fetch('https://inprove-sport.info/avatar/BhdYsskMxsTePaxTsd/calculateAvatarElement', options);
            setWorking(false);
            setAvatarKey(Date.now()); // Update key to force re-mount
        } catch (error) {
            setWorking(false);
        }
    };

    return (
        <div>
            <h2>Avatar</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button className="btn btn-secondary" onClick={() => { setShowAvatar(true); setShowManager(false); }}>
                    View Sample Avatar
                </button>
                <button className="btn btn-secondary" onClick={() => { setShowManager(true); setShowAvatar(false); }}>
                    Manager
                </button>
                <button className="btn btn-secondary" disabled={working} onClick={handleSyncClick}>
                    Synchronize Avatar
                </button>
            </div>
            <img width={30} src={logo} alt="loading..." hidden={!working} />
            {showAvatar && <Avatar key={avatarKey} />}
            {showManager && <SectionAndEntryManager />}
        </div>
    );
};

export default AvatarActions;
