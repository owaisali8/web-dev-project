import 'package:http/http.dart' as http;
import 'package:kaam_daam/global/constants.dart';

Future<http.Response> getJobs(String accessToken, int currentPage, int pageSize) async {
  return await http.get(
    Uri.parse('$serverURL/jobs/paged?page=$currentPage&limit=$pageSize'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
  );
}
