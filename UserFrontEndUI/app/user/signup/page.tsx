"use client";
import AnimateDiv from "@/components/AnimateDiv";
import Button from "@/components/CTAs/Button";
import H1 from "@/components/HTMLTags/H1";
import H2 from "@/components/HTMLTags/H2";
import { useState } from "react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        console.log("User created successfully:", data);
      } else {
        console.error("Error creating user:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AnimateDiv>
      <H1>Sign Up</H1>
      <H2>Welcome</H2>
      <div className="bg-gray-100 rounded-xl w-full flex flex-col p-8">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button buttonText="Sign Up" type="submit" primary />
        </form>
      </div>
    </AnimateDiv>
  );
}
