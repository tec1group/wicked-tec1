import * as React from "react";
import styled from "styled-components";
import { Stylable } from "../types";

interface Tec1HeaderProps extends Stylable {
  worker: any;
}

const BaseTec1Header = ({ worker, className }: Tec1HeaderProps) => {
  const handleUpload = (event: any) => {
    const files = event.target.files;
    if (files == null || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () =>
      worker.postMessage({ type: "UPDATE_MEMORY", value: reader.result });
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const pfrom = window.prompt("Start address (hex)", "0800");
    const psize = window.prompt("Size (hex)", "1000");
    if (pfrom != null && psize != null) {
      const from = parseInt(pfrom, 16);
      const size = parseInt(psize, 16);
      worker.postMessage({ type: "READ_MEMORY", from, size });
    }
  };

  return (
    <div className={`${className} tec1-header`}>
      <div>
        <label htmlFor="file-upload">HEX</label>
        <input
          id="file-upload"
          type="file"
          accept=".hex"
          onChange={handleUpload}
        />
      </div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};
export const Tec1Header = styled(BaseTec1Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px;
`;
