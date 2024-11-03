"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const fetchBooks = async () => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Generate a JSON data for a list of popular books and please include only JSON data and it should include title, author, genre and image url and dont include any code like ```json. Also include books small description as another key in the JSON data and include id ( which should be like uuid ) for each book";

    const result = await model.generateContent(prompt);
    return result.response.text();
};