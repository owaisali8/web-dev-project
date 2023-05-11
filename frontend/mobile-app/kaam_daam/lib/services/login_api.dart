import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:kaam_daam/global/constants.dart';

Future<http.Response> loginAPI(String username, String password) async {
   return await http.post(
    Uri.parse('$serverURL/login'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(
        <String, String>{'username': username, 'password': password}),
  );

  
}
