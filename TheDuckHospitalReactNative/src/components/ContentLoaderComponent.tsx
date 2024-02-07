import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {appInfo} from '../constants/appInfo';

const ContentLoaderComponent = () => {
  return (
    <ContentLoader
      speed={2}
      width={600}
      height={100}
      viewBox="0 0 600 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <Rect
        x="0"
        y="8"
        rx="3"
        ry="3"
        width={appInfo.size.width * 0.3}
        height="6"
      />
      <Rect
        x="0"
        y="28"
        rx="3"
        ry="3"
        width={appInfo.size.width * 0.9}
        height="6"
      />
      <Rect
        x="0"
        y="48"
        rx="3"
        ry="3"
        width={appInfo.size.width * 0.9}
        height="6"
      />
      <Rect
        x="0"
        y="68"
        rx="3"
        ry="3"
        width={appInfo.size.width * 0.9}
        height="6"
      />
      <Rect
        x="0"
        y="88"
        rx="3"
        ry="3"
        width={appInfo.size.width * 0.9}
        height="6"
      />
    </ContentLoader>
  );
};

export default ContentLoaderComponent;
