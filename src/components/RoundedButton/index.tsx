import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}

const RoundedButton: React.FC<ButtonProps> = ({ onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}
      style={{
        width: 70,
        height: 70,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        borderRadius: 25,
        right: 20
      }}>
      <Material name='plus' color='white' size={30} />
    </TouchableOpacity>
  );
};

export default RoundedButton;