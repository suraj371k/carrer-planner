import React, { useCallback, useState, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useResume } from "@/hooks/useResume";

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadResumeFile, isUploading, uploadError } = useResume();

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    try {
      if (selectedFile) {
        console.log("Starting upload for file:", selectedFile.name);
        const result = await uploadResumeFile(selectedFile);
        console.log("Upload successful: ", result);
        // Clear the selected file after successful upload
        setSelectedFile(null);
      } else {
        alert("Please select a file first");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col  items-center w-full h-auto py-10 p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Analyze Your Resume</h1>
        <p className="text-lg text-gray-600">
          Get instant AI-powered feedback to improve your resume.
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center w-full max-w-md transition-colors
        ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} 
        ${selectedFile ? "border-green-500 bg-green-50" : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <div className="text-green-600 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <button
              className="text-blue-600 text-sm mt-4 hover:underline"
              onClick={() => setSelectedFile(null)}
            >
              Choose a different file
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="mb-2 font-medium">
              {isDragging ? "Drop your resume here" : "Drag & drop your resume"}
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Input
              type="file"
              onChange={handleFileUpload}
              className="mx-auto max-w-xs"
              accept=".pdf,.doc,.docx"
            />
            <p className="text-xs text-gray-400 mt-2">
              PDF, DOC, DOCX up to 5MB
            </p>
          </>
        )}
      </div>

      <div className="mt-8">
        <Button
          onClick={handleAnalyze}
          disabled={!selectedFile || isUploading}
          className={`px-8 py-3 text-lg ${
            !selectedFile || isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "Analyzing..." : "Analyze Resume"}
        </Button>

        {uploadError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {uploadError.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
