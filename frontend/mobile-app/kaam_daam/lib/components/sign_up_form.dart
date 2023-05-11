import 'package:flutter/material.dart';
import 'package:kaam_daam/validators/email_validator.dart';
import 'package:intl/intl.dart';
import 'package:kaam_daam/validators/password_validator.dart';

class SignUpForm extends StatefulWidget {
  const SignUpForm({super.key});

  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final _formKey = GlobalKey<FormState>();

  final name = TextEditingController();
  final email = TextEditingController();
  final username = TextEditingController();
  final password = TextEditingController();
  final phone = TextEditingController();
  final address = TextEditingController();
  final gender = TextEditingController(text: 'M');
  final dob = TextEditingController();
  final cnic = TextEditingController();
  final jobType = TextEditingController();
  var dropdownValue = 'Employer';

  @override
  Widget build(BuildContext context) {
    return Form(
        key: _formKey,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0),
              child: Row(
                children: [
                  const Text("Type: ", style: TextStyle(fontSize: 16)),
                  DropdownButton<String>(
                    // Step 3.
                    value: dropdownValue,
                    borderRadius: const BorderRadius.all(Radius.circular(12)),
                    // Step 4.
                    items: <String>['Employer', 'Employee']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value,
                        ),
                      );
                    }).toList(),
                    // Step 5.
                    onChanged: (String? newValue) {
                      setState(() {
                        dropdownValue = newValue!;
                      });
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 15,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0),
              child: TextFormField(
                keyboardType: TextInputType.name,
                controller: name,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(40))),
                    hintText: 'Jack',
                    labelText: 'Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
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
                keyboardType: TextInputType.emailAddress,
                controller: email,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(40))),
                    hintText: 'abc@xyz.com',
                    labelText: 'Email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter email';
                  }

                  if (!isValidEmail(email.text)) {
                    return 'Enter Email in Correct Format';
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

                  if (!isValidPassword(password.text)) {
                    return 'Enter Password in 8 Characters and 1 Number';
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
                keyboardType: TextInputType.phone,
                controller: phone,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(40))),
                    hintText: '03XXXXXXXXX',
                    labelText: 'Phone'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter phone';
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
                keyboardType: TextInputType.streetAddress,
                controller: address,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(40))),
                    hintText: 'Downing Street',
                    labelText: 'Address'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter address';
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
              child: Row(
                children: [
                  const Text(
                    "Gender: ",
                    style: TextStyle(fontSize: 16),
                  ),
                  DropdownButton<String>(
                    // Step 3.
                    value: gender.text,
                    borderRadius: const BorderRadius.all(Radius.circular(12)),
                    // Step 4.
                    items: <String>['M', 'F', 'X']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value,
                        ),
                      );
                    }).toList(),
                    // Step 5.
                    onChanged: (String? newValue) {
                      setState(() {
                        gender.text = newValue!;
                      });
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 15,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0),
              child: TextFormField(
                  keyboardType: TextInputType.none,
                  controller: dob, //editing controller of this TextField
                  decoration: const InputDecoration(
                    suffixIcon: Icon(Icons.calendar_today), //icon of text field
                    labelText: "Date of Birth",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(
                            Radius.circular(40))), //label text of field
                  ),
                  readOnly: true, // when true user cannot edit text
                  onTap: () async {
                    DateTime? pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(), //get today's date
                        firstDate: DateTime(
                            1950), //DateTime.now() - not to allow to choose before today.
                        lastDate: DateTime(2101));

                    if (pickedDate != null) {
                      String formattedDate = DateFormat('dd-MM-yyyy').format(
                          pickedDate); // format date in required form here we use yyyy-MM-dd that means time is removed

                      setState(() {
                        dob.text = formattedDate;
                      });
                    }
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter date';
                    }
                    return null;
                  }),
            ),
            const SizedBox(
              height: 15,
            ),
            Visibility(
              visible: dropdownValue == 'Employee',
                child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32.0),
                  child: TextFormField(                  
                    keyboardType: TextInputType.phone,
                    controller: cnic,
                    enabled: dropdownValue == 'Employee',
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(40))),
                        hintText: '42XXXXXXXXX',
                        labelText: 'CNIC'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter CNIC';
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
                    keyboardType: TextInputType.text,
                    controller: jobType,
                    enabled: dropdownValue == 'Employee',
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(40))),
                        hintText: 'ex: Chef',
                        labelText: 'Job Type'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter Job Type';
                      }
                      return null;
                    },
                  ),
                ),
                const SizedBox(
                  height: 15,
                )
              ],
            )),
            SizedBox(
                height: 50,
                width: 150,
                child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Please Wait')),
                        );

                        Navigator.pushReplacementNamed(context, '/login');

                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Text('Account Created. Please Log In.')),
                        );
                      }
                    },
                    child: const Text("Sign Up"))),
            const SizedBox(
              height: 20,
            ),
            TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/login');
                },
                child: const Text("Log In"))
          ],
        ));
  }
}
