import React, {useState} from 'react';
import mammoth from "mammoth"; // extract text from .docx files

const UploadFile = ({ onExtract }) => {
    const [questions, setQuestions] = useState([]);

    const handleFileUpload = async(event) => { 
        const file = event.target.files[0];

        if (file && file.name.endsWith(".docx")) {
            const reader = new docxReader();

            reader.onload = async (e) => {
                const arrayBuffer = e.target.result;
                const result = await mammoth.extractRawText({ arrayBuffer }); // {value: string, messages: string}

                const text = result.value; 
                const parsedQAs = parseQuestions(text);
                setQuestions(parsedQAs);
                onExtract(parsedQAs); // Pass to parent

            };
        }
        else {
            alert("Please upload a valid file")
        }
    };

    const parseQuestions = (text) => {
        const lines = text.split("\n").map(line => line != "")
        
        const questions = [];

        for (let i = 0; i < lines.length; i += 6) {
            const question = lines[i];
            const options = lines.slice(i + 1, i + 5);
            const correctAnswer = lines[i + 5];

            if (question && options.length === 4 && correctAnswer){
                questions.push({
                    question,
                    options,
                    correctAnswer: correctAnswer.toUpperCase()
                });
            }
        }
    }
    return questions;
};


