import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SetupStackParamList } from '../navigation/types';
import { NavigationProp } from '@react-navigation/native';

interface NavigableTextProps {
  text: string;
  textColor: string;
  screenName: keyof SetupStackParamList;
  navigation: NavigationProp<SetupStackParamList>;
}

const NavigableText: React.FC<NavigableTextProps> = ({
  text,
  textColor,
  screenName,
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ ...styles.linkText, color: textColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    textDecorationLine: 'underline',
  },
});

export default NavigableText;
