'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ease-in-out
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        {acceptedFiles.length > 0 ? (
          <>
            <FileText className="w-12 h-12 text-blue-500 animate-bounce" />
            <p className="text-lg font-medium text-gray-700">{acceptedFiles[0].name}</p>
            <p className="text-sm text-gray-500">Click or drag to replace</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400" />
            <p className="text-lg font-medium text-gray-700">
              Drag & drop a PDF here, or click to select
            </p>
            <p className="text-sm text-gray-500">PDF files only (max 10MB)</p>
          </>
        )}
      </div>
    </div>
  );
}
