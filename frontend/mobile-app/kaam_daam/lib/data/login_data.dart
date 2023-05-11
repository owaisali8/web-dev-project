import 'dart:convert';
import 'package:kaam_daam/models/login_model.dart';
import 'package:kaam_daam/services/login_api.dart';

Future<LoginModel> login(String username, String password) async {
  final response = await loginAPI(username, password);

  if(response.statusCode == 200) {
    return  LoginModel.fromJson(jsonDecode(response.body));
  } else if (response.statusCode == 404) {
    throw Exception('Incorrect Username or Password');
  } else {
    throw Exception("Error");
  }
}