'use client'

import styles from "./results.module.css";0
import { Link } from '@chakra-ui/next-js'
import { Input, VStack, Select, Button } from '@chakra-ui/react'

export default function Result(){
    return (
    <main className = {styles.main} >
        <div className={styles.description}>
            <p> Your results: </p>
        </div>
    </main>
    );
}