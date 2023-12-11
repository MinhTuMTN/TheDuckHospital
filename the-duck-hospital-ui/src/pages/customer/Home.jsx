import React from "react";
import MainComponent from "../../components/Customer/Home/MainComponent";
import Services from "../../components/Customer/Home/Services";
import TimeWorking from "../../components/Customer/Home/TimeWorking";
import Support from "../../components/Customer/Home/Support";

function Home(props) {
  return (
    <>
      <MainComponent />
      <Services />
      <TimeWorking />
      <Support />
    </>
  );
}

export default Home;
