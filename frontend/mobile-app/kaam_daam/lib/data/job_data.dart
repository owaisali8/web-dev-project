import 'dart:convert';
import 'package:kaam_daam/models/job_model.dart';
import 'package:kaam_daam/models/profile_model.dart';
import 'package:kaam_daam/services/job_api.dart';

Future<List<Job>> getJobsData(String accessToken, int currentPage, int pageSize) async {
  final response = await getJobs(accessToken, currentPage, pageSize);
  if (response.statusCode == 200) {
    final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
    return parsed.map<Job>((json) => Job.fromJson(json)).toList();
  } else if (response.statusCode == 404) {
    throw Exception('Incorrect Error');
  } else {
    throw Exception("Error");
  }
}

Future<List<Profile>> getJobAppliedByData(String accessToken, int id) async {
  final response = await getJobAppliedBy(accessToken, id);
  if (response.statusCode == 200) {
    final parsed = jsonDecode(response.body).cast<Map<String, dynamic>>();
    return parsed.map<Profile>((json) => Profile.fromJson(json)).toList();
  } else if (response.statusCode == 404) {
    throw Exception('Incorrect Error');
  } else {
    throw Exception("Error");
  }
}

