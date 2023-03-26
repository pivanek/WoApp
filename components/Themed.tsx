import { Text as DefaultText, View as DefaultView, Pressable as DefaultPressable, TextInput as DefaultTextInput, PressableProps as DefaultPressableProps, TouchableOpacity as DefaultTouchableOpacity, TouchableOpacityProps as DefaultTouchableOpacityProps } from 'react-native';

import useColorScheme from '../hooks/useColorScheme';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ClassAttributes } from 'react';


// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof DarkTheme.colors & keyof typeof DefaultTheme.colors
// ){
//   const theme = useColorScheme();
//   const colorFromProps = props[theme];
//   const themes = {dark: DarkTheme, light: DefaultTheme}

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return themes[theme].colors[colorName];
//   }
// }

export const themes = {dark: DarkTheme, light: DefaultTheme}

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof DarkTheme.colors & keyof typeof DefaultTheme.colors
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return  themes[theme].colors[colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'] & ClassAttributes<DefaultView>;
export type PressableProps = ThemeProps & DefaultPressableProps;
export type TextInputProps = ThemeProps & DefaultTextInput['props'] & ClassAttributes<DefaultTextInput>;
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacityProps;

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

export function Pressable(props: PressableProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultPressable style={[{ backgroundColor }, style]} {...otherProps}/>;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultTouchableOpacity style={[{ backgroundColor}, style]} {...otherProps}/>;
}

export function TextInput(props: TextInputProps ){
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  return <DefaultTextInput style={[{backgroundColor, color}, style]} {...otherProps}/>;
}