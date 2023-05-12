import 'dart:convert';
import 'package:kaam_daam/models/job_model.dart';
import 'package:kaam_daam/services/job_api.dart';

Future<List<Job>> getJobsData(String accessToken) async {
  final response = await getJobs(accessToken);
  if (response.statusCode == 200) {
    final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
    return parsed.map<Job>((json) => Job.fromJson(json)).toList();
  } else if (response.statusCode == 404) {
    throw Exception('Incorrect Error');
  } else {
    throw Exception("Error");
  }
}
