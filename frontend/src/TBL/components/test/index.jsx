import React, { useState } from "react";

const App = () => {
  const [pdfData, setPdfData] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setPdfData(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfData;
    link.download = fileName;
    link.click();
  };

  return (
    <div>
      <h1>HOME PAGE</h1>
      {/* <input type="file" accept=".pdf" onChange={handleFileChange} />
      {pdfData && (
        <div>
          <div>
            <img
              src="pdf-icon.png"
              alt="PDF Icon"
              width="100px"
              height="100px"
            />
            <p>{fileName}</p>
          </div>
          <button onClick={handleDownload}>Download</button>
        </div>
      )} */}
    </div>
  );
};

export default App;
