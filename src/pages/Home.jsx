import React from 'react'
import Process from '../components/Process'
import Footer from '../components/Footer'
import IcoImage from '../components/IcoImage'
import Reviews from '../components/Reviews'
import Youtube from '../components/Youtube'
import Approach from '../components/Approach'
import Recruitment from '../components/Recruitment'
import Vision from '../components/Vision'
import Herocards from '../components/HeroCards'
import Hero from '../components/Hero'
import Jobs from '../components/Jobs'
import Navbar from '../components/Navbar'
import Consultation from '../components/Consultation'
import Clients from '../components/Clients'
import Marquee from '../components/Marquee'
import RecentBlogs from '../components/RecentBlogs'
import Books from '../components/Books'
import FloatingButtons from '../components/FloatingButtons'

const Home = () => {
  return (
    <div>
      
        <Navbar/>
        <Hero/>
        <Marquee/>
        <Herocards/>
        <Vision/>
        <Clients/>
        <Recruitment/>
        <Consultation/>
        <Approach/>
        <Jobs/>
        <RecentBlogs/>
        <Books/>
        <Youtube/>
        <Reviews/>
        <Process/>
        <IcoImage/>
        <Footer/>
        
        {/* Floating Buttons */}
        <FloatingButtons/>
    </div>
  )
}

export default Home