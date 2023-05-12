import 'package:flutter/material.dart';
import 'package:kaam_daam/global/constants.dart';
import 'package:kaam_daam/services/job_api.dart';

class JobNew extends StatefulWidget {
  const JobNew({super.key});

  @override
  State<JobNew> createState() => _JobNewState();
}

class _JobNewState extends State<JobNew> {
  final _formKey = GlobalKey<FormState>();

  final String username = storage.getItem('username');
  final String accessToken = storage.getItem('accessToken');
  final title = TextEditingController();
  final description = TextEditingController();
  final jobType = TextEditingController();
  final salary = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      appBar: AppBar(
        title: const Text('New Job'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: SingleChildScrollView(
        child: Form(
            key: _formKey,
            child: Column(
              children: [
                const SizedBox(height: 30,),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32.0),
                  child: TextFormField(
                    keyboardType: TextInputType.text,
                    controller: title,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(40))),
                        hintText: '',
                        labelText: 'Title'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter title';
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
                    controller: description,
                    obscureText: false,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(40))),
                        hintText: '',
                        labelText: 'Description'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter description';
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
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(40))),
                        hintText: 'ex: Cooking',
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
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32.0),
                  child: TextFormField(
                    keyboardType: TextInputType.number,
                    controller: salary,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(40))),
                        hintText: '',
                        labelText: 'Salary'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter Salary';
                      }
      
                      if (double.tryParse(value) == null) {
                        return "Please enter a valid number";
                      }
      
                      return null;
                    },
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                const SizedBox(
                  height: 30,
                ),
                SizedBox(
                    height: 50,
                    width: 150,
                    child: ElevatedButton(
                        onPressed: () async {
                          if(!_formKey.currentState!.validate()){
                            return;
                          }
                          final response = await newJob(
                              accessToken,
                              username,
                              title.text,
                              description.text,
                              jobType.text,
                              salary.text);
                          if (response.statusCode != 201) {
                            if (!mounted) return;
                            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                              content: Text(response.body),
                              backgroundColor: Colors.red,
                            ));
                            return;
                          }
                          if (!mounted) return;
                          ScaffoldMessenger.of(context)
                              .showSnackBar(const SnackBar(
                            content: Text("Job Created"),
                            backgroundColor: Colors.green,
                          ));
                          Navigator.pop(context);
                        },
                        child: const Text("Add Job"))),
              ],
            )),
      ),
    ));
  }
}
