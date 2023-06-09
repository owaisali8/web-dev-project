import 'package:http/http.dart' as http;
import 'package:kaam_daam/global/constants.dart';

Future<http.Response> getProfile(
    String username, String userType, String accessToken) async {
  return await http.get(
    Uri.parse('$serverURL/$userType/$username'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
  );
}

Future<http.Response> deleteProfile(
    String username, String userType, String accessToken) async {
  return await http.delete(
    Uri.parse('$serverURL/$userType/$username'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
  );
}
