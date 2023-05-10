import 'package:flutter/material.dart';
import 'package:kaam_daam/global/theme_data.dart';
import 'package:kaam_daam/views/employee_home.dart';
import 'package:kaam_daam/views/login.dart';
import 'package:kaam_daam/views/sign_up.dart';
import 'package:localstorage/localstorage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});
  final LocalStorage storage = LocalStorage('kaam_daam');

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    final accessToken = storage.getItem('accessToken');

    return MaterialApp(
      title: 'Kaam Daam',
      debugShowCheckedModeBanner: true,
      color: Colors.black,
      initialRoute: '/',
      routes: {
        '/': (context) =>
            accessToken == null ? const Login() : const EmployeeHome(),
        '/login': (context) => const Login(),
        '/sign-up': (context) => const SignUp(),
        '/employee/home': (context) => const EmployeeHome()
      },
      themeMode: ThemeMode.system,
      theme: ThemeData(
        colorSchemeSeed: Colors.indigo,
        visualDensity: VisualDensity.standard,
        useMaterial3: true,
      ),
      darkTheme: darkThemeData,
    );
  }
}
