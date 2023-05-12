import 'package:flutter/material.dart';
import 'package:kaam_daam/data/login_data.dart';
import 'package:kaam_daam/global/constants.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();

  final username = TextEditingController();
  final password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
        key: _formKey,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0),
              child: TextFormField(
                keyboardType: TextInputType.text,
                controller: username,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(40))),
                    hintText: 'user',
                    labelText: 'Username'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter username';
                  }

                  return null;
                },
              ),
            ),
            const SizedBox(
              height: 15,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0),
              child: TextFormField(
                keyboardType: TextInputType.visiblePassword,
                controller: password,
                obscureText: true,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(40))),
                    hintText: '*******',
                    labelText: 'Password'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter password';
                  }
                  return null;
                },
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            SizedBox(
                height: 50,
                width: 150,
                child: ElevatedButton(
                    onPressed: () async {
                      if (!_formKey.currentState!.validate()) {
                        return;
                      }

                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Logging In'),
                          duration: Duration(seconds: 1),
                        ),
                      );
                      try {
                        final data = await login(username.text, password.text);
                        storage.setItem('accessToken', data.accessToken);
                        storage.setItem('refreshToken', data.refreshToken);
                        storage.setItem('userType', data.usertype);
                        storage.setItem('username', username.text);

                        if (!mounted) return;
                        Navigator.pushReplacementNamed(context, '/home');
                      } on Exception catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(e.toString().substring(10)),
                            backgroundColor: Colors.red,
                          ),
                        );
                      }
                    },
                    child: const Text("Login"))),
            const SizedBox(
              height: 20,
            ),
            TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/sign-up');
                },
                child: const Text("Sign Up"))
          ],
        ));
  }
}
