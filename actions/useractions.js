"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const getBookImages = async (bookname, bookauthor) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookname}+inauthor:${bookauthor}&key=${process.env.BOOKS_API}`);

    const data = await response.json();

    return data.items[0].volumeInfo.imageLinks.thumbnail;
}


export const fetchBooks = async () => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a JSON data for a big like 20 list of popular books and please include only JSON data and it should include title, author, description, genre and image url. Include id ( which should be like uuid ) for each book do it in this format output only nothing else -

     don't include any code like text like  "\`\`\`json" or anything else just the JSON data in this format
    [
     {
        "title" : "";
        "author" : "";
        "genre" : "";
        "image" : "";
        "description" : "";
        "id" : "";
     },
     {
      ....
     }
     ]

    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
};

export const getAllSearchedBooks = async (bookname, genre, language) => {

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate an array of JSON data for ${bookname} books or ${genre} books in ${language} language ( if available ) and it should include title, author, genre, image url, small description, id( which should be like uuid ) and do it in this format output only nothing else -
    
    don't include any code like text like  "\`\`\`json" or anything else just the JSON data in this format
    [
     {
        "title" : "";
        "author" : "";
        "genre" : "";
        "image" : "";
        "description" : "";
        "id" : "";
     },
     {
      ....
     }
     ]
  

    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
};