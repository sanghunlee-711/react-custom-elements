import React from 'react';
import HomeImage from '../../image/1_home_landing_1x.png';
import '../../styles/sass.scss';

const Home = (props) => {
  const wrapper = document.getElementById('container');
  const newCustomEvent = new CustomEvent('onOpen');

  const openModal = () => {
    wrapper.dispatchEvent(newCustomEvent);
    alert('in react alert');
  };

  return (
    <div className="dtimeBoxWrap">
      <section className="dtimeBx">
        <span>{props.propsText} In Home Comp</span>
        <img
          className="mainImg"
          src={HomeImage}
          className="img-home"
          alt="home-file-loader"
          onClick={openModal}
        />
      </section>
    </div>
  );
};

export default Home;
