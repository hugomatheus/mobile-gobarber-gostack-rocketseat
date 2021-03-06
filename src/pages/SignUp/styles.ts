import styled from 'styled-components/native';
import { Platform } from 'react-native';
// Lib que será utilizada para um botaozinho no final da tela que o iphone x + tem e com isso dar um certo espaço no elemento
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'ios' ? 40 : 150}px;
`;
export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* fiz o teste tirando o position absolute e seu posicionamento e não vi difereça */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${12 + getBottomSpace()}px;
`;

export const BackToSignInText = styled.Text`
  margin-left: 16px;
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;
