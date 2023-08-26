import "./App.css";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  listAll,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileInfo, setFileInfo] = useState([]);
  const [url, setUrl] = useState("");

  const filesListRef = ref(storage, "files/");

  const uploadFile = () => {
    if (fileUpload == null) return;
    setUrl("Getting file link..");
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrl(url);
        setFileInfo((prev) => [...prev, { name: fileUpload.name, url }]);
      });
    });
  };

  useEffect(() => {
    listAll(filesListRef).then((response) => {
      const newFiles = [];
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          newFiles.push({ name: item.name, url });
        });
      });

      setFileInfo((prev) => [...prev, ...newFiles]);
    });
  }, []);

  return (
    <div className="App">
      <h1>Your Attachment Area</h1>
      <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload File</button>
      <br />
      <p>
        <a href={url}>{url}</a>
      </p>
      <ol>
        {fileInfo.map((file, index) => (
          <li key={index}>
            {file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png") ? (
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <img src={file.url} alt={file.name} style={{ maxWidth: '100px' }} />
              </a>
            ) : (
              <span>{file.name}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
