import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        // Get API Key from environment variable
        const apiKey = process.env.GEMINI_API_KEY;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not set in environment variables.' }, { status: 500 });
        }

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString('base64');
        const mimeType = file.type || 'application/pdf';

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `Analyze the following PDF document and provide detailed, actionable improvement suggestions. 
    Focus on:
    1. Structure and Clarity
    2. Content Quality and Depth
    3. Grammar and Tone
    4. Visual presentation (if applicable based on text layout)
    
    Provide the response in a structured format with headings and bullet points.`;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            },
        ]);

        const response = result.response;
        const analysis = response.text();

        return NextResponse.json({ analysis });
    } catch (error: any) {
        console.error('Error analyzing PDF:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to analyze PDF. Please check your API Key and file.' },
            { status: 500 }
        );
    }
}
