// src/components/AboutUs.jsx
import { imgUrl } from '../utils/cityImage'
import "./AboutUs.css";

function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-us-image">
        <img src={imgUrl('/images/us.png')} alt="B and H"/>
      </div>
      <div className="about-us-text">
        <p className="about-us-tag">Our Story</p>
        <h1>B & H</h1>
        <p className="about-us-bio">
          Two people, two passports, and a shared curiosity about the world.
          <br/><br/>
          What started as a single trip turned into something neither of us planned.
          We found ourselves chasing open borders, booking one-way tickets, and
          building a life around the question: what&apos;s next?
          <br/><br/>
          We&apos;ve navigated language barriers, missed trains, wrong turns, and
          unexpected detours, and somehow those moments always make the best stories.
          <br/><br/>
          This scrapbook is our way of holding onto it all, the highlights, the chaos,
          and everything in between.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
