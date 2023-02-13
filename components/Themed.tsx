import { Text as DefaultText, View as DefaultView, Pressable as DefaultPressable, TextInput as DefaultTextInput, PressableProps as DefaultPressableProps } from 'react-native';

import useColorScheme from '../hooks/useColorScheme';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof DarkTheme.colors & keyof typeof DefaultTheme.colors
){
  const theme = useColorScheme();
  const colorFromProps = props[theme];
  const themes = {dark: DarkTheme, light: DefaultTheme}

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return themes[theme].colors[colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type PressableProps = ThemeProps & DefaultPressableProps;
export type TextInputProps = ThemeProps & DefaultTextInput['props'];

export function Text(props : TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps}/>;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps}/>;
}

export function Pressable(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const color = "blue";

  return <DefaultPressable style={[{ color, backgroundColor}, style]} {...otherProps}/>;
}

export function TextInput(props: TextInputProps){
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  return <DefaultTextInput style={[{backgroundColor}, style]} {...otherProps}/>;
}