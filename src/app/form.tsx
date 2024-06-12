'use client'

import { FormEvent } from 'react'

import { useState, useRef, useEffect } from "react"
import Image from "next/image";
import styles from "./page.module.css";
import { Link } from '@chakra-ui/next-js'
import { Box, Text, Input, VStack, Select, Button, Flex, useColorModeValue } from '@chakra-ui/react'

import { useEdgeStore } from '../lib/edgestore';
import { deepStrictEqual } from 'assert';

export default function Form() {
    // state storing File
    const [file, setFile] = useState<File | null>(null);
    // state storing user request
    const [message, setMessage] = useState("Summarize the following PDF");
    // state storing AI reply
    const [reply, setReply] = useState("");

    // Reference to the AI reply container
    const replyContainerRef = useRef<HTMLDivElement>(null);

     // Reference to the file upload box
     const fileUploadRef = useRef<HTMLDivElement>(null);

    // FOR TESTING: Shows File details once uploaded, can re-use
    // interface FileDataProps {
    //   selectedFile: File | null;
    // }

    // const FileData: React.FC<FileDataProps> = ({ selectedFile }) => {
    //   return (
    //     <div>
    //       {selectedFile ? (
    //         <div>
    //           <h2>File Details:</h2>
    //           <p>File Name: {selectedFile.name}</p>
    //           <p>File Type: {selectedFile.type}</p>
    //         </div>
    //       ) : (
    //         <div>
    //           <br />
    //           <h4>Choose before Pressing the Upload button</h4>
    //         </div>
    //       )}
    //     </div>
    //   );
      
    // };

   
    // GEMINI API CALL
    async function onSubmit(event : FormEvent<HTMLFormElement>) {
      
      event.preventDefault()
      
      const formData = new FormData()
      formData.set('file', file)
      formData.set('message', message)
      
      try{
        const response = await fetch('https://gemini-endpoint-6grozjklla-uc.a.run.app/api/get_message', {
          method: 'POST',
          body: formData // Use JSON data as the body
      })
      const responseData = await response.json();
      setReply(responseData["message"])
      }
      catch(err){
        console.log(err)
      }
      
  }

  async function tempSubmit(event : FormEvent<HTMLFormElement>) {
      
    event.preventDefault()
  
    
    try{
      const response = await fetch('https://gemini-endpoint-6grozjklla-uc.a.run.app/api/temp_message', {
        method: 'GET',
    })
    const responseData = await response.json();
    setReply(responseData["message"])
    }
    catch(err){
      console.log(err)
    }
    
}


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setFile(file);
    } else {
      // Handle invalid file type
      console.error('Invalid file type. Please upload a PDF.');
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Scroll to the reply container when the reply changes
  useEffect(() => {
    if (replyContainerRef.current) {
      replyContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reply]);

    return (
      //Rendered on page
        <main>
        <div className={styles.description}>

          <VStack spacing='24px' margin='4'>

          <p>
            Upload School Notes and any other relevant Documents
          </p>

          {/*Form to submit file and user reuest*/}
          <form onSubmit={onSubmit}>
              <VStack >
                
                <div className={styles.fileupload}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {/* Display file name if a file is selected */}
                {file && 
                  <VStack>
                    <p>Selected file: {file.name}</p> 
                    <button className={styles.uploadButton}
                      type="button"
                      onClick={() => {
                        document.getElementById('hiddenFileInput')?.click();
                      }}
                    >
                      Upload Another PDF
                    </button>
                  </VStack>
                }
                {/* Display instructions if no file is selected */}
                {!file && 
                  <button className={styles.uploadButton}
                    type="button"
                    onClick={() => {
                      document.getElementById('hiddenFileInput')?.click();
                    }}
                  >
                    Upload PDF Here
                  </button>
                }
                <input 
                  id="hiddenFileInput" 
                  className={styles.drag}
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] ?? null);
                  }}
                  style={{ display: 'none' }} // Hide the default file input
                />
                {/* TODO: PDF EMBEDDING */}
              </div>
              <textarea 
                  placeholder="Enter your question here" 
                  name="prompt" 
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }} 
                  style={{
                    padding: '12px', // Adjust padding as needed
                    border: '1px solid #ccc', // Adjust border style as needed
                    borderRadius: '15px', // Adjust border radius as needed
                    fontSize: '16px', // Adjust font size as needed
                    width: '100%', // Adjust width as needed
                    height: '300px', // Adjust height as needed
                  }}
              />
              {/* EXTRA QUESTIONS
              <VStack>
                <p>
                  What do you need help with?
                </p>

                <Button 
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
                >
                  Assignment or Text
                </Button>

                <Button 
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
                >
                  Upcoming Exam
                </Button>

                <p>
                  What do you want?
                </p>

                <Button 
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
                >
                  Outline/Study Guide
                </Button>

                <Button 
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
                >
                  Lessons
                </Button>
              </VStack> */}
              
              <Button 
                type="submit"
                colorScheme="blue"
                variant="solid"
                size="lg"
              >
                Submit
              </Button>

            </VStack>
          </form>

          {/* Displays file details once uploaded */}
          {/* <FileData selectedFile={file} /> */}


          {/* Displays AI reply */}
          <div ref={replyContainerRef}> {/* Add ref to the reply container */}
            {reply && (
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
                shadow="md"
              >
                <Text fontSize="lg">{reply}</Text>
              </Box>
            )}
          </div>
          {/* TODO: Have the next button only be shown if there is an AI reply */}
          </VStack>
          <form onSubmit={tempSubmit}>
            <Button 
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  size="lg"
            >
                  Submit
            </Button>
          </form>
        </div>
      </main>
    )
}