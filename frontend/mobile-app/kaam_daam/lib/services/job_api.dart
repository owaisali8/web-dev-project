import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:kaam_daam/global/constants.dart';

Future<http.Response> getJobs(
    String accessToken, int currentPage, int pageSize) async {
  return await http.get(
    Uri.parse('$serverURL/jobs/paged?page=$currentPage&limit=$pageSize'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
  );
}

Future<http.Response> applyJob(
    String accessToken, String username, int jobid) async {
  return await http.post(
    Uri.parse('$serverURL/jobs/applyForJob'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
    body:
        jsonEncode(<String, String>{'username': username, 'job_id': '$jobid'}),
  );
}

Future<http.Response> newJob(String accessToken, String username, String title,
    String description, String jobType, String salary) async {
  return await http.post(
    Uri.parse('$serverURL/jobs/'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
    body: jsonEncode(<String, String>{
      'username': username,
      'title': title,
      'description': description,
      'job_type': jobType,
      'salary': salary
    }),
  );
}

Future<http.Response> getJobAppliedBy(String accessToken, int id) async {
  return await http.get(
    Uri.parse('$serverURL/jobs/id/$id/appliedBy'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
  );
}

Future<http.Response> updateRating(
    String accessToken, String username, String rating) async {
  return await http.patch(Uri.parse('$serverURL/employee/updateRating'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $accessToken',
      },
      body:
          jsonEncode(<String, String>{'username': username, 'rating': rating}));
}

Future<http.Response> updateJob(String accessToken, int id, String title,
    String description, String jobType, String salary, bool completed) async {
  return await http.patch(Uri.parse('$serverURL/jobs/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $accessToken',
      },
      body: jsonEncode(<String, String>{
        'title': title,
        'description': description,
        'job_type': jobType,
        'salary': salary,
        "completed": '$completed'
      }));
}

Future<http.Response> deleteJob(String accessToken, int id) async {
  return await http.delete(
    Uri.parse('$serverURL/jobs/$id'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $accessToken',
    },
  );
}
