'use client'

import { FormEvent } from 'react'
import { useState } from "react"
import Image from "next/image";
import styles from "./page.module.css";
import { Link } from '@chakra-ui/next-js'
import { Input, VStack, Select, Button } from '@chakra-ui/react'

import { useEdgeStore } from '../lib/edgestore';

export default function Gchat() {

    const [reply, setReply] = useState("Ballin");

    async function onSubmit(event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("Anyone there")
        const formData = new FormData(event.currentTarget)
        
        //TODO: use formiddable in the backend to recieve both prompts and file
        //First check if it recieves the filename
        //Remember file.filepath will give google the filepath
        // var object = {};
        // formData.forEach(function(value, key){
        //     object[key] = value;
        // });
        // var json = JSON.stringify(object);
        const response = await fetch('http://localhost:3000/api/gemini', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json' // Specify JSON content type
            // },
            body: formData
        })
        const responseData = await response.json();
        setReply(responseData["message"])
        
    }
    return (
    <main className={styles.main}>
        <VStack>
        <form onSubmit={onSubmit}>
            <input type="text" name="prompt" />
            <button type="submit">Submit</button>
        </form>
        <div>{reply}</div>
        </VStack>
    </main>  
    )
}