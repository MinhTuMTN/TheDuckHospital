import React from 'react';
import {ScrollView} from 'react-native';
import {
  AvatarProfile,
  ContainerComponent,
  DetailsInfomation,
} from '../../components';
import {useNavigation} from '@react-navigation/native';

const DetailsProfileScreen = ({route}: {route: any}) => {
  const navigation = useNavigation();
  /* 2. Get the param */
  const {profile} = route.params;
  console.log('profile', profile);

  return (
    <ContainerComponent paddingTop={0}>
      <ScrollView>
        <AvatarProfile profile={profile} />
        <DetailsInfomation info={profile} />
      </ScrollView>
    </ContainerComponent>
  );
};

export default DetailsProfileScreen;
