import { EventEmitter } from 'events';
import React from 'react';
import HomeImage from '../../image/1_home_landing_1x.png';

const Home = () => {
  const onTest = new EventEmitter();

  const openModal = () => {
    onTest.emit('onOpen');

    console.log(onTest.listeners('event'));
  };

  return (
    <div className="dtimeBoxWrap">
      <section className="dtimeBx">
        <img
          className="mainImg"
          src={HomeImage}
          className="img-home"
          alt="home-file-loader"
          onClick={openModal}
        />
        {/* <img
          src="../../image/1_home_landing_1x.png'"
          alt="image-webpack-loader"
        /> */}
      </section>
    </div>
  );
};

export default Home;
