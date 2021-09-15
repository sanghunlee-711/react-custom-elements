import { EventEmitter } from 'events';
import React, { useEffect } from 'react';
import HomeImage from '../../image/1_home_landing_1x.png';

const Home = () => {
  const onTest = new EventEmitter();
  const ref = React.useRef(null);
  const wrapper = document.getElementById('container');
  const newCustomEvent = new CustomEvent('onOpen', (e) => {
    console.log('in react!', e);
  });

  const openModal = () => {
    // onTest.emit('onOpen');
    wrapper.dispatchEvent(newCustomEvent);

    console.log('just on Click');
  };

  useEffect(() => {
    const newCustomEvent = new CustomEvent('onOpen', (e) => {
      console.log('in react!', e);
    });

    // wrapper.dispatchEvent(newCustomEvent);
  }, []);

  return (
    <div ref={ref} className="dtimeBoxWrap">
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
