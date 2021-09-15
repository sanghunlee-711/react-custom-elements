import React from 'react';
import HomeImage from '../../image/1_home_landing_1x.png';
import { HomeCompProps } from '../../model/types';
import '../../styles/sass.scss';

const Home: React.FC<HomeCompProps> = (props) => {
  const wrapper = document.getElementById('container');
  const newCustomEvent = new CustomEvent('onOpen');

  const openModal = () => {
    wrapper?.dispatchEvent(newCustomEvent);
    alert('in react alert');
  };

  return (
    <div className="dtimeBoxWrap">
      <section className="dtimeBx">
        <span>{props.propsText} In Home Comp</span>
        <img
          className="img-home"
          src={HomeImage}
          alt="home-file-loader"
          onClick={openModal}
        />
      </section>
    </div>
  );
};

export default Home;
