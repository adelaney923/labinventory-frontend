import React from 'react'
import './landing.css'

const Landing = () => {
    return (
      <div id="landing">
        <div class="container">
          <img
            className='labphoto'
            src="https://res.cloudinary.com/adelaney923/image/upload/v1640113474/labphoto1_l17oef.jpg"
            alt="labphoto"
          />
          <div class="text-block">
              <div className='text'>
            <h1>
              <span className="lablist">LabList</span>
            </h1>
            <p>Your place to keep track of all your lab inventory.</p>
            </div>
          </div>
          </div>
      </div>
    );
}

export default Landing