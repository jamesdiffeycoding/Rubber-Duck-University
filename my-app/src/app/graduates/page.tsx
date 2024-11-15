"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

const DisplayStoredData = () => {
  // State to hold the data retrieved from localStorage
  const [storedData, setStoredData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // State to track which card is being edited
  const [editingComment, setEditingComment] = useState(""); // State for the comment input
  const { isDarkMode } = useTheme(); // Use `isDarkMode` directly

  useEffect(() => {
    // Get the data from localStorage when the component mounts
    const data = JSON.parse(localStorage.getItem("topicAnswerData")) || [];

    // Sort the data by date in descending order (newest first)
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Set the state with the sorted data
    setStoredData(sortedData);
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to calculate the time difference and format relative time
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);

    // Check if the stored date is today
    const isSameDay =
      now.getDate() === date.getDate() &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear();

    if (isSameDay) {
      // Calculate time difference in milliseconds
      const diffInMilliseconds = now - date;

      // Convert to minutes and hours
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

      if (diffInMinutes < 60) {
        // Display minutes ago
        return diffInMinutes === 1
          ? "1 minute ago"
          : `${diffInMinutes} minutes ago`;
      } else {
        // Display hours ago
        return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
      }
    } else {
      // If not the same day, return a formatted date
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  // Handle comment change for a specific card
  const handleCommentChange = (e) => {
    setEditingComment(e.target.value); // Update the comment input state
  };

  // Handle saving the comment to the specific card
  const handleSaveComment = (index) => {
    if (editingComment.trim() === "") return; // Don't add empty comments

    const updatedData = [...storedData];
    updatedData[index].comment = editingComment; // Update the specific card's comment

    // Save the updated data back to localStorage
    localStorage.setItem("topicAnswerData", JSON.stringify(updatedData));

    // Update the state to trigger a re-render
    setStoredData(updatedData);
    setSelectedCard(null); // Close the editing state for this card
    setEditingComment(""); // Clear the comment input field
  };

  // Handle the card expand action when editing
  const handleEditCard = (index) => {
    setSelectedCard(index); // Mark the card as selected for editing
    setEditingComment(storedData[index].comment || ""); // Populate the comment field with existing comment if any
  };

  return (
    <div
      className={`p-6 h-full ${
        isDarkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-emerald-300 text-gray-900 border-gray-300"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Duck graduates</h2>
      <p>
        You have helped <strong>{storedData.length} </strong> ducks to graduate
        from their degree.
      </p>
      {storedData.length === 0 ? (
        <p>No data found.</p> // Message if no data exists in localStorage
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ transition: "all 0.3s ease" }}
        >
          {storedData.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md border transition-all ease-in-out ${
                selectedCard === index
                  ? "w-full bg-gray-800 text-white flex-grow"
                  : isDarkMode
                  ? "bg-gray-900 text-white border-gray-700"
                  : "bg-amber-200 text-gray-900 border-gray-300"
              }`}
              style={{
                transition: "all 0.3s ease",
                flexBasis: selectedCard === index ? "100%" : "auto", // Adjust the size of the card
                zIndex: selectedCard === index ? 1 : 0, // Bring the selected card to the front
              }}
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={`/ducks (${index + 1}).jpg`}
                  alt="Rubber Ducky"
                  className="w-24 h-24 object-contain rounded-full border-4 border-solid"
                  style={{
                    borderColor: isDarkMode ? "#ffffff" : "#1F2937",
                  }}
                />
              </div>

              <div>
                <strong>Topic:</strong> {item.topic}
              </div>
              <div>
                <strong>Answer:</strong> {item.answer}
              </div>
              <div>
                <strong>Date:</strong> {getRelativeTime(item.date)}{" "}
                {/* Show relative time or full date */}
              </div>

              {/* Displaying comment if it exists */}
              {item.comment && (
                <div className="mt-2">
                  <strong>Comment:</strong> {item.comment}
                </div>
              )}

              {/* Button to add or edit comment */}
              <div className="mt-4 flex flex-col items-center">
                {selectedCard === index ? (
                  <>
                    <textarea
                      className="w-full p-2 resize-none text-black rounded-md border border-gray-400"
                      placeholder="Edit your comment"
                      value={editingComment}
                      onChange={handleCommentChange}
                      rows="6"
                    />
                    <button
                      onClick={() => handleSaveComment(index)}
                      className={`mt-2 px-4 py-2 rounded-md ${
                        isDarkMode
                          ? "bg-emerald-800 hover:bg-emerald-700 text-white"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }`}
                    >
                      Save Comment
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditCard(index)}
                    className={`mt-2 px-4 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-emerald-800 hover:bg-emerald-700 text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {storedData[index]?.comment
                      ? "Edit Comment"
                      : "Add Comment"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayStoredData;
