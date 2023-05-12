import 'package:http/http.dart' as http;
import 'package:kaam_daam/global/constants.dart';

Future<http.Response> getJobs(String accessToken) async {
  return await http.get(
    Uri.parse('$serverURL/jobs/'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
  );
}
