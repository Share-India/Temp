'use client';

import React, { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { AnalysisResult } from '@/components/AnalysisResult';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze the file.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
            Gemini PDF Analyzer
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Upload your PDF and get AI-powered improvement suggestions.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 space-y-8">
          {/* File Uploader */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
            <FileUploader onFileSelect={handleFileSelect} />
          </div>

          {/* Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !file}
            className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg text-lg font-medium text-white shadow-sm transition-all
              ${analyzing || !file
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5'
              }`}
          >
            {analyzing ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Analyzing...
              </>
            ) : (
              'Analyze PDF'
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        {result && <AnalysisResult result={result} />}
      </div>
    </main>
  );
}
