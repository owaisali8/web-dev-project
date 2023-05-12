import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:kaam_daam/global/constants.dart';

Future<http.Response> signUpEmployerAPI(
    String username,
    String password,
    String name,
    String phone,
    String email,
    String address,
    String dob,
    String gender) async {
  return await http.post(
    Uri.parse('$serverURL/employer/'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'username': username,
      'password': password,
      'name': name,
      'phone': phone,
      'email': email,
      'address': address,
      'dob': dob,
      'gender': gender
    }),
  );
}

Future<http.Response> signUpEmployeeAPI(
    String username,
    String password,
    String name,
    String phone,
    String email,
    String address,
    String dob,
    String gender,
    String cnic,
    String jobType) async {
  return await http.post(
    Uri.parse('$serverURL/employee/'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'username': username,
      'password': password,
      'name': name,
      'phone': phone,
      'email': email,
      'address': address,
      'dob': dob,
      'gender': gender,
      'cnic_no': cnic,
      'job_type': jobType
    }),
  );
}
