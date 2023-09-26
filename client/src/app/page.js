import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {Form} from '../components/Form';


export default function Home() {
  
  return (
    <>
      <main className="overflow-hidden">
     
        <Navbar />
        <Form/>
        <Footer />
      </main>
    </>
  );
}
