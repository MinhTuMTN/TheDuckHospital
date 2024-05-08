import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../constants/appColors';

interface ExpandableListItemProps {
  item: {
    title: string;
    content: any;
  };
}
const ExpandableListItem = (props: ExpandableListItemProps) => {
  const {item} = props;
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={25}
          color={appColors.white}
          style={{
            backgroundColor: appColors.darkBlue,
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.itemContent}>{item.content}</View>}
    </View>
  );
};

export default ExpandableListItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 15,
    // padding: 10,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // elevation: 3,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemContent: {
    marginTop: 10,
  },
});
