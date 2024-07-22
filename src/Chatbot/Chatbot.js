// import React, { useState } from 'react';
// import axios from 'axios';
// import './Chatbot.css';

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState('');

//     const sendMessage = async () => {
//         if (!userInput.trim()) return;

//         const newMessages = [...messages, { sender: 'user', text: userInput }];
//         setMessages(newMessages);
//         setUserInput('');

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/get_response', { message: userInput });
//             setMessages([...newMessages, { sender: 'bot', text: response.data.response }]);
//         } catch (error) {
//             console.error('Error fetching response:', error);
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-box">
//                 {messages.map((message, index) => (
//                     <p key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
//                         {message.text}
//                     </p>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 placeholder="Type your message here..."
//                 onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default Chatbot;


import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/get_response', { message: userInput });
            setMessages([...newMessages, { sender: 'bot', text: response.data.response }]);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">React Chatbot UI</div>
            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your message here"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>▶</button>
            </div>
        </div>
    );
};

export default Chatbot;
