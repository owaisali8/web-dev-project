import 'package:flutter/material.dart';
import 'package:kaam_daam/components/login_form.dart';

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            const SizedBox(
              height: 60,
            ),
            Row(children: const [
              Spacer(),
              Icon(Icons.work, size: 60),
              Spacer()
            ]),
            const SizedBox(
              height: 60,
            ),
            const LoginForm(),
            const SizedBox(
              height: 20,
            )
          ],
        ),
      )),
    );
  }
}
