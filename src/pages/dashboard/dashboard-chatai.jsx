import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`bg-gray-200 p-3 rounded-lg ${
          isUser ? ' bg-neutral-100 text-gray-800' : 'bg-gray-100 text-gray-700'
        }`}
      >
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default function DashboardChatai() {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [answerStatus, setAnswerStatus] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom when conversation changes
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [conversation]);

    const fetchTotalPriceData = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, 'order'));
        const totalPriceData = querySnapshot.docs.map(doc => doc.data().totalPrice);
        console.log("Total Price Data:", totalPriceData);
        return totalPriceData;
        } catch (error) {
        console.error("Error fetching total price data:", error);
        return [];
        }
    };

    // Perbaikan logika generateAnswer function
    const generateAnswer = async (e) => {
        setGeneratingAnswer(true);
        setAnswerStatus('Loading your answer...');
        e.preventDefault();
        const userQuestion = {
        message: question,
        isUser: true
        };
        setConversation(prevConversation => [...prevConversation, userQuestion]);
    
        try {
        let foundAnswer = null;
        const questionWords = question.toLowerCase().split(" ");
        const totalPriceData = await fetchTotalPriceData();
        const totalIncome = totalPriceData.reduce((acc, price) => acc + price, 0);
        const totalIncomeString = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalIncome);
    
        // logika pemrosesan pertanyaan
        if (questionWords.includes('how') && questionWords.includes('much') && questionWords.includes('total') && questionWords.includes('income')) {
            foundAnswer = `Total income: ${totalIncomeString}`;
        } else {
            // Jika bukan pertanyaan tentang pendapatan, gunakan API untuk menghasilkan jawaban
            const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
            method: 'post',
            data: {
                contents: [{ parts: [{ text: question }] }],
            },
            });
            foundAnswer = response.data.candidates[0].content.parts[0].text;
        }
    
        if (foundAnswer) {
            const answerMessage = {
            message: foundAnswer,
            isUser: false
            };
            setConversation(prevConversation => [...prevConversation, answerMessage]);
        }
    
        setAnswerStatus('');
        } catch (error) {
        console.log(error);
        const errorMessage = {
            message: 'Sorry - Something went wrong. Please try again!',
            isUser: false
        };
        setConversation(prevConversation => [...prevConversation, errorMessage]);
        }
    
        setGeneratingAnswer(false);
        setQuestion('');
    };
  

  return (
    <div className="pt-32 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-6 bg-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Chat with AI</h2>
          <p className="text-sm text-gray-600 mt-1">Welcome! How can I assist you today?</p>
        </div>
        <div className="px-4 py-6 overflow-y-auto" ref={chatContainerRef} style={{ maxHeight: '400px' }}>
          {conversation.map((conversationItem, index) => (
            <ChatMessage key={index} message={conversationItem.message} isUser={conversationItem.isUser} />
          ))}
          {answerStatus && <div className="text-gray-500 text-center py-2">{answerStatus}</div>}
        </div>
        <div className="px-4 py-3 bg-gray-100 border-t border-gray-200 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full py-2 px-3 bg-gray-200 focus:outline-none rounded-md"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            type="submit"
            onClick={generateAnswer}
            className="bg-gray-200 p-3 rounded-md hover:bg-gray-400 transition-all duration-300 ml-2 flex items-center"
            disabled={generatingAnswer}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};
