import 'package:flutter/material.dart';
import 'package:kaam_daam/components/sign_up_form.dart';

class SignUp extends StatelessWidget {
  const SignUp({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: SingleChildScrollView(
            padding: const EdgeInsets.only(top: 8),
            child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
            Row(children: [
              const Spacer(),
              Text('Sign Up', style: Theme.of(context).textTheme.headlineLarge),
              const Spacer()
            ]),
            const SizedBox(
              height: 20,
            ),
            const SignUpForm(),
            const SizedBox(
              height: 20,
            )
                  ],
                ),
          )),
    );
  }
}
