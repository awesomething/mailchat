# OpenAI & LangChain chatbot with custom context knowledge base

To learn how to use this repo watch [this tutorial video](https://youtu.be/AMc2A5Abj3M)

This chatbot uses Pinecone index to retrieve relevant information from a custom knowledge base.
Learn how to create a Pinecone index in [this tutorial](https://youtu.be/k1LrBOtNARk)

Tech stack: LangChain, Pinecone, Typescript, Openai, Next.js, Tailwind

## Getting Started

1. Clone the repo

```
git clone [github https url]
```

2. Install packages

```
npm install
```

3. Set up your `.env` file

- Change `.env.example` into `.env` and fill the neccessary keys.
- For OPENAI API key visit [openai](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)
- For Pinecone API key and environment and index names visit [pinecone](https://pinecone.io/) and create your index

4. Run the development server:

```
npm run dev
```

## Deploy on Vercel

!! If your Vercel app throws back a timeout error when deployed, the response is taking more than 5s, which is the limit of a free Vercel plan.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import OutputForm from './OutputForm';
import './App.css';

const ChatMain = () => {
  // ... (other state and useEffect code)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const requestData = {
      prompt: userMessage,
      // Add other necessary fields for Azure OpenAI API
      // (refer to Azure OpenAI API documentation for details)
    };

    try {
      const response = await fetch('YOUR_AZURE_OPENAI_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AZURE_OPENAI_API_KEY',
          // Add other necessary headers for Azure OpenAI API
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        console.log('POST request failed.');
      }

      const responseData = await response.json();
      const assistantMessage = responseData.choices[0].message.content;

      setMessages((prevMessages) => [
        { role: 'assistant', content: assistantMessage },
        { role: 'user', content: userMessage },
        ...prevMessages,
      ]);

      setUserMessage('');
      setIsLoading(false);
      console.log('POST request completed successfully:', assistantMessage);
    } catch (error) {
      console.error('Error during POST request:', error);
      setIsLoading(false);
    }
  };

  // ... (remaining code)

  return (
    // ... (JSX structure remains the same)
  );
};

export default ChatMain;
