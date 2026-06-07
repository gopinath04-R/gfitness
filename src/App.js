import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BMICalculator from './components/BMICalculator';
import NutritionCalculator from './components/NutritionCalculator';
import HomeWorkout from './components/HomeWorkout';
import GymWorkout from './components/GymWorkout';
import MuscleWorkout from './components/MuscleWorkout';
import Footer from './components/Footer';
import './index.css';

function HomePage() {
  return (
    <>
      <Hero />
      <BMICalculator />
      <NutritionCalculator />
      <HomeWorkout />
      <GymWorkout />
      <MuscleWorkout />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;