import React from 'react';
import { Sparkles } from 'lucide-react';

interface AnalysisResultProps {
    result: string;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-800">Analysis Result</h2>
            </div>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {result}
            </div>
        </div>
    );
}
