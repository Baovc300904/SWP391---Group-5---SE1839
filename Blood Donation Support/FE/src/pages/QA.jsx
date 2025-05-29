import React, { useState } from 'react';

export default function QA() {
  const qas = [
    {
      id: 1,
      question: "React là gì?",
      answer: "React là thư viện JavaScript dùng để xây dựng giao diện người dùng."
    },
    {
      id: 2,
      question: "useState dùng để làm gì?",
      answer: "useState là một hook giúp lưu trữ và cập nhật state trong functional component."
    },
    {
      id: 3,
      question: "JSX là gì?",
      answer: "JSX là cú pháp mở rộng của JavaScript, cho phép viết HTML trong JavaScript."
    }
  ];

  const [openId, setOpenId] = useState(null);

  const toggleAnswer = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Câu Hỏi & Trả Lời</h1>
      <div className="space-y-4">
        {qas.map((qa) => (
          <div key={qa.id} className="bg-white rounded-xl shadow p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(qa.id)}
            >
              <h2 className="font-semibold">{qa.question}</h2>
              <span className="text-2xl transition-transform duration-300">
                {openId === qa.id ? '▼' : '▶'}
              </span>
            </div>
            {openId === qa.id && (
              <p className="mt-2 text-gray-700">{qa.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
