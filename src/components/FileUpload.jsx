// src/components/FileUpload.jsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Typography, Box } from "@mui/material";

const FileUpload = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Upload File</Typography>
      <div {...getRootProps()} style={{ border: "2px dashed #ccc", padding: "20px", marginTop: "10px" }}>
        <input {...getInputProps()} />
        <Typography>Drag & drop a file here, or click to select a file</Typography>
      </div>
    </Box>
  );
};

export default FileUpload;
