import React, { useState, useEffect  } from 'react';
import UploadFileC from "./adminFileUpload2"; // New version
import UploadFileC_Old from './adminFileUploadOld'; // Old version

const AdminFileUploadSwitcher = (props) => {
  const [useNewVersion, setUseNewVersion] = useState(true);


     useEffect(() => {
    console.log("AdminFileUploadSwitcher props:", props);
    console.log("Current version in use:", useNewVersion ? "New" : "Old");
    }, [props, useNewVersion]);

  const toggleVersion = () => {
    console.log("Toggling version from", useNewVersion ? "New" : "Old");
    setUseNewVersion(!useNewVersion);
  };

  return (
    <div>
      <div className="version-toggle">
        <label>
          <input
            type="checkbox"
            checked={useNewVersion}
            onChange={toggleVersion}
          />
          Use New Version
        </label>
      </div>

      {useNewVersion ? (
        <UploadFileC {...props} />
      ) : (
        <UploadFileC_Old {...props} />
      )}
    </div>
  );
};

export default AdminFileUploadSwitcher;
