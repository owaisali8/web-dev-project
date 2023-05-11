import 'package:flutter/material.dart';
import 'package:kaam_daam/components/login_form.dart';

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Row(children: const [Spacer(), Icon(Icons.work, size: 60), Spacer()]),
          const LoginForm(),
          const SizedBox(
            height: 20,
          )
        ],
      )),
    );
  }
}
