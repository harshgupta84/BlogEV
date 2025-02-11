import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import useUserStore from "@/store/userStore";
const topicsList = [
  "Technology",
  "Programming",
  "AI & ML",
  "Web Development",
  "Cybersecurity",
  "Blockchain",
  "Cloud Computing",
  "Data Science",
  "DevOps",
  "UI/UX Design",
  "Open Source",
  "Startups",
  "Marketing",
  "Finance",
  "Health & Wellness",
  "Education",
];

export default function SelectInterest() {
  
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [search, setSearch] = useState("");
  const {userEmail}=useUserStore()


  const navigate=useNavigate();
  const handleToggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic) // Remove if already selected
        : [...prev, topic] // Add if not selected
    );
  };

  const handleSubmit = () => {
    console.log("Selected Topics:", selectedTopics);
    authService.setTopic(userEmail,selectedTopics)
    navigate('/auth/login');
    // Here, you can send selectedTopics to the backend or store in global state.
  };

  const filteredTopics = topicsList.filter((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-background mt-24">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#0098C5]">
        Select Your Interests
      </h1>

      <input
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-md px-4 py-2 border rounded-md dark:bg-neutral-800 dark:text-white"
      />

      <div className="flex flex-wrap gap-3 justify-center max-w-3xl">
        {filteredTopics.map((topic) => (
          <Badge
            key={topic}
            className={`cursor-pointer px-3 py-2 rounded-full ${
              selectedTopics.includes(topic)
                ? "bg-[#0098C5] text-white"
                : "bg-neutral-300 dark:bg-neutral-700"
            }`}
            onClick={() => handleToggleTopic(topic)}
          >
            {topic}
          </Badge>
        ))}
      </div>

      <Button
        className="mt-6 bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] text-white"
        onClick={handleSubmit}
      >
        Confirm Selection
      </Button>
    </div>
  );
}
