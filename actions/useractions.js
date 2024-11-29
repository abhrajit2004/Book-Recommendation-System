"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";


export const getBookImages = async (bookname, bookauthor) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookname}+inauthor:${bookauthor}&key=${process.env.BOOKS_API}`);

    const data = await response.json();
    
    if(data.items && data.items.length > 0 && data.items[0].volumeInfo.imageLinks){
        return data.items[0].volumeInfo.imageLinks.thumbnail;
    }
        
}


export const fetchBooks = async () => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a JSON data for a big like 10 list of popular books and please include only JSON data and do it in this format output only -

     don't include any code like text like  "\`\`\`json" or anything on starting or ending, just the JSON data in this format
    [
     {
        "title" : "";
        "author" : "";
        "genre" : "";
        "image" : ""; ( keep it blank for all )
        "description" : "";
        "id" : ""; ( should be like uuid )
        "booklink" : ""; ( should be the link from goodreads )
     },
     ]`;

    const result = await model.generateContent(prompt);

    return result.response.text();
};

export const getAllSearchedBooks = async (bookname, genre, language) => {

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate an array of JSON data for ${bookname} books or ${genre} books in ${language} language ( if available ) and do it in this format output only nothing else -
    
    don't include any code like text like  "\`\`\`json" or anything on starting or ending, just the JSON data in this format
    [
     {
        "title" : "";
        "author" : "";
        "genre" : "";
        "image" : "";
        "description" : "";
        "id" : ""; ( should be like uuid )
        "booklink" : ""; ( correct free book preview link from goodreads website for each json data corresponding to their title and author with correct book number dont give wrong book links )
     },
     {
      ....
     }
     ]
  
     dont include code like "\`\`\`" or anything else
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
};