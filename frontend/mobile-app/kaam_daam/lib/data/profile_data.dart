import 'dart:convert';
import 'package:kaam_daam/models/profile_model.dart';
import 'package:kaam_daam/services/profile_api.dart';

Future<Profile> getProfileData(
    String username, String userType, String accessToken) async {
  final response = await getProfile(username, userType, accessToken);

  if (response.statusCode == 200) {
    return Profile.fromJson(jsonDecode(response.body));
  } else if (response.statusCode == 404) {
    throw Exception('Incorrect Username or Password');
  } else {
    throw Exception("Error");
  }
}
