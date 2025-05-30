import React, { useState } from 'react';
import './QA.css'; // nhớ tạo CSS nếu muốn style đẹp hơn
import AppLayout from '../../Layouts/AppLayout';
import Footer from '../Footers/Footer';

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
    <>
      <AppLayout />
      <div className="qa-container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Câu Hỏi & Trả Lời</h1>
        <div>
          {qas.map((qa) => (
            <div key={qa.id} className="qa-item">
              <div
                className="qa-header cursor-pointer"
                onClick={() => toggleAnswer(qa.id)}
              >
                <h2 className="font-semibold">{qa.question}</h2>
                <span className="text-2xl transition-transform duration-300">
                  {openId === qa.id ? '▼' : '▶'}
                </span>
              </div>
              {openId === qa.id && (
                <p className="qa-answer">{qa.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
