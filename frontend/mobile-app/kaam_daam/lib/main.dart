import 'package:flutter/material.dart';
import 'package:kaam_daam/global/constants.dart';
import 'package:kaam_daam/views/home.dart';
import 'package:kaam_daam/views/login.dart';
import 'package:kaam_daam/views/settings.dart';
import 'package:kaam_daam/views/sign_up.dart';

void main() async {
  await storage.ready;
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    final String? accessToken = storage.getItem('accessToken');

    return MaterialApp(
      title: 'Kaam Daam',
      debugShowCheckedModeBanner: false,
      color: Colors.black,
      debugShowMaterialGrid: false,
      initialRoute: '/',
      routes: {
        '/' :(context) => accessToken == null? const Login():  const Home(),
        '/login': (context) => const Login(),
        '/sign-up': (context) => const SignUp(),
        '/home': (context) => const Home(),
        '/settings': (context) => const Settings()
      },
      themeMode: ThemeMode.light,
      theme: ThemeData(
        colorSchemeSeed: Colors.indigo,
        visualDensity: VisualDensity.standard,
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
          colorSchemeSeed: Colors.indigo,
          visualDensity: VisualDensity.standard,
          useMaterial3: true,
          brightness: Brightness.dark),
    );
  }
}
