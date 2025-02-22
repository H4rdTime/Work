// app/components/ApplicationForm.tsx
"use client";
import { useState } from "react";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });
      if (response.ok) alert("Заявка отправлена!");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="ФИО"
        required
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Телефон"
        required
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea
        placeholder="Адрес"
        required
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Отправить
      </button>
    </form>
  );
}