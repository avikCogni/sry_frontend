
import Image from "next/image";
import styles from "./page.module.css";
import { Link } from '@chakra-ui/next-js'
import { Input, VStack, Select, Button } from '@chakra-ui/react'
import Form from "./form"
import Gchat from "./gform"
import Navbar from "./navbar"

export default function Home() {
  return (
    //TODO: Figure out navbar from a video tutorial LOL
    <main className= {styles.main}>
      <Form/>
    </main>
  );
}

//Class type
//Grade level
//Type of Exam
//output of data