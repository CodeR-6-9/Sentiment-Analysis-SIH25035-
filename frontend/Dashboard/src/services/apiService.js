const API_URL = "http://127.0.0.1:8000";

/**
 * @param {string} endpoint 
 * @returns {Promise<Array>} 
 */
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok for endpoint: ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    return [];
  }
};
export const getContactsData = () => fetchData("contacts");
export const getPieData = () => fetchData("pie");
export const getWordCloudData = () => fetchData("wordcloud");
export const getTextBlockContent = async () => {
  try {
    const response = await fetch(`${API_URL}/summary`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Failed to fetch text block content:", error);
    return "Error: Could not load content.";
  }
};