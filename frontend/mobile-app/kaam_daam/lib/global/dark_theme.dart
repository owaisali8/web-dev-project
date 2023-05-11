import 'package:flutter/material.dart';
import './constants.dart';

class DarkThemeNotifier extends ChangeNotifier {
  DarkThemeNotifier();

  ThemeMode get isDarkMode {
    final darkMode = storage.getItem("isDarkMode");
    ThemeMode themeMode;

    switch (darkMode) {
      case true:
        themeMode = ThemeMode.dark;
        break;
      case false:
        themeMode = ThemeMode.light;
        break;
      default:
        themeMode = ThemeMode.system;
        break;
    }

    return themeMode;
  }

  void setDarkMode(bool val) {
    storage.setItem("isDarkMode", val);
    notifyListeners();
  }
}
