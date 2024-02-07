import React from 'react';
import {ScrollView} from 'react-native';
import {
  AvatarProfile,
  ContainerComponent,
  DetailsInfomation,
} from '../../components';

const DetailsProfileScreen = () => {
  return (
    <ContainerComponent paddingTop={0}>
      <ScrollView>
        <AvatarProfile />
        <DetailsInfomation />
      </ScrollView>
    </ContainerComponent>
  );
};

export default DetailsProfileScreen;
