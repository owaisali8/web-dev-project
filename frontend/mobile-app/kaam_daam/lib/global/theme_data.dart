import 'package:flutter/material.dart';

final darkThemeData = ThemeData(
    colorSchemeSeed: Colors.indigo,
    appBarTheme: AppBarTheme(backgroundColor: Colors.indigo.shade300),
    visualDensity: VisualDensity.standard,
    useMaterial3: true,
    scaffoldBackgroundColor: Colors.black,
    backgroundColor: Colors.black,
    textTheme: const TextTheme(
        subtitle1: TextStyle(color: Colors.white),
        bodyText1: TextStyle(color: Colors.white),
        bodyText2: TextStyle(color: Colors.white)),
    inputDecorationTheme: InputDecorationTheme(
        enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.indigo.shade300,
            ),
            borderRadius: const BorderRadius.all(Radius.circular(40))),
        labelStyle: TextStyle(color: Colors.indigo[300])),
    iconTheme: const IconThemeData(color: Colors.white));
