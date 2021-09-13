import React from 'react';
import HomeImage from '../../assets/img/1_home_landing_1x.png';

const Home = () => {
  return (
    <div className="dtimeBoxWrap">
      <section className="dtimeBx">
        <img
          src={HomeImage}
          className="img-home"
          onClick={() => console.log('onClick ~')}
          alt="home"
        />
      </section>
    </div>
  );
};

export default Home;
