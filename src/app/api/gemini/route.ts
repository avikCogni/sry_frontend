const { GoogleGenerativeAI } = require("@google/generative-ai");
import formidable, { File } from 'formidable';
import {join} from 'path'

//GOOGLE CLOUD STUFF
import { Storage } from "@google-cloud/storage";
const storage = new Storage();
//GEN AI STUFF (FREE)
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({model:"gemini-1.5-pro"});

//FILEMANAGER STUFF
// import { GoogleAIFileManager } from "@google/generative-ai/files";
// const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

//GPT VERTEX AI STUFF
import { NextApiRequest, NextApiResponse } from 'next';
import { VertexAI } from '@google-cloud/vertexai';

//VERTEX AI STUFF
// const {VertexAI} = require('@google-cloud/vertexai');
// const vertexAI = new VertexAI({project: process.env.GEMINI_PROJECT_ID, location: 'us-central1'});
// const generativeModel = vertexAI.getGenerativeModel({
//   model: 'gemini-1.5-flash-001',
// });


import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

import path from 'path';
import { writeFile } from 'node:fs';


export async function POST(request: NextRequest) {
    
    console.log("Anyone there")
    const formData = await request.formData()
    
    const file: File = formData.get('file') as unknown as File
    const prompt = formData.get('message')
    
    
    //##FILE AND PROMPT SUCESSFULLY SENT TO ROUTE## ----------

    // if (!file) {
    //     return NextResponse.json({ success: false })
    // }
    

    //##Prepping File for Google Cloud Storage##
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const { writeFile } = require('fs').promises;
    const { tmpdir } = require('os');
    const { join } = require('path');
    
    // //##Creating file in local directory##
    const fileName = `${Date.now()}_${file.name}`;
    console.log(fileName)
    const tmpPath = join(tmpdir(), fileName);
    // const utf8Buffer = Buffer.from(buffer.toString(), 'utf8');
    await writeFile(tmpPath, buffer);
    await storage.bucket('sryfiles').file(file.name).save(buffer);

    
    //##VERTEX PROMPT UPLOAD## (TEST) ---------------------
    
    const projectId = 'sanguine-rhythm-425500-u8';
    try {
      console.log("Made it here")
      const vertexAI = new VertexAI({ projectId, location: 'us-central1' });
  
      const generativeModel = vertexAI.getGenerativeModel({
        model: 'gemini-1.5-flash-001',
      });
  
      const prompt =
        "What's a good name for a flower shop that specializes in selling bouquets of dried flowers?";
  
      const resp = await generativeModel.generateContent(prompt);
      console.log("PArt 2 Made it here")
      const contentResponse = await resp.response;
      console.log("PArt 3 Made it here")
      console.log(JSON.stringify(contentResponse));
  
      res.status(200).json({ contentResponse }); // Return the content response
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
    //OLD VERTEX TEST ------------
    // console.log("Made it here") 
    // const p = "Can you even hear me right now Gemini AI";
    // try {
    //   const resp = await generativeModel.generateContent(p);
    //   console.log("Response:", resp); // Log the entire response object
    
    //   if (resp.candidates) {
    //     console.log("Candidates:", resp.candidates);
    //   } else {
    //     console.error("No candidates found in the response.");
    //   }
    
    // } catch (error) {
    //   console.error("Error generating content:", error);
    // }
    //##GEMINI FILE UPLOAD OLD##
    

    // // const sample_file = genAI.upload_file(tmpPath, "Sample file")
    // const uploadResult = await fileManager.uploadFile(tmpPath, {
    //     mimeType: file.type,
    //     displayName: "Sample file",
    // });
    
    // console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);
    // //## GEMINI CALL ###
   
   
    // const result = await model.generateContent([
    //     {
    //       fileData: {
    //         mimeType: uploadResult.file.mimeType,
    //         fileUri: uploadResult.file.uri
    //       }
    //     },
    //     { text: prompt },
    //   ]);
    // const response = await result.response;
    // const text = response.text();

    // const text = contentResponse
    const text = "Temporary message"
    return NextResponse.json({"message": text})
}