'use client'
import styles from "./goal.module.css";
import { Link } from '@chakra-ui/next-js'
import { Input, VStack, Select, Button } from '@chakra-ui/react'

export default function Goal(){
    return (
    <main className = {styles.main} >
        <div className={styles.description}>
            <VStack spacing='24px' margin='4'>
                <p> Select your goal </p>
                <Button> Test </Button>
                <Button> Final Exam </Button>
                <Button> AP Exam </Button>
                <Link href="results">
                    <Button> Next </Button>
                </Link>
            </VStack>
        </div>
    </main>
    );
}