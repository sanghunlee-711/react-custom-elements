import React from 'react';

const Home = () => {
  return (
    <div className="dtimeBoxWrap">
      <section className="dtimeBx">
        <img
          src="../../assets/img/1_home_landing_1x.png"
          className="img-home"
          onClick={() => console.log('onClick ~')}
          alt="home"
        />
      </section>
    </div>
  );
};

export default Home;
