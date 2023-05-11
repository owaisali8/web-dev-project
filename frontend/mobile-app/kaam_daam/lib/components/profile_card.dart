import 'package:flutter/material.dart';
import 'package:kaam_daam/global/constants.dart';
import 'package:kaam_daam/models/profile_model.dart';

class ProfileCard extends StatelessWidget {
  const ProfileCard({
    Key? key,
    required this.myProfile,
    required this.userType,
  }) : super(key: key);

  final Future<Profile> myProfile;
  final String userType;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: myProfile,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          final bool verified = snapshot.data?.verified ?? false;
          return Card(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Padding(
                  padding: EdgeInsets.only(top: 8.0),
                  child: CircleAvatar(
                      radius: 25, child: Icon(Icons.person_rounded)),
                ),
                ListTile(
                    title: Text(snapshot.data!.name!),
                    trailing: Text(userType),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('ID: ${snapshot.data!.id}'),
                        Text('Username: ${snapshot.data!.username}'),
                        Text('Phone: ${snapshot.data!.phone}'),
                        Text('Email: ${snapshot.data!.email}'),
                        Text('Adress: ${snapshot.data!.address}'),
                        Text('DOB: ${snapshot.data!.dob}'),
                        Text('Gender: ${snapshot.data!.gender}'),
                        Text('Join Date: ${snapshot.data!.joindate}'),
                        Visibility(
                            visible: userType == 'EMPLOYEE',
                            child: Column(
                              crossAxisAlignment:
                                  CrossAxisAlignment.start,
                              children: [
                                Text('CNIC: ${snapshot.data!.cnicno}'),
                                Text(
                                    'Job Type: ${snapshot.data!.jobtype}'),
                                Text('Rating: ${snapshot.data!.rating}'),
                                Row(
                                  children: [
                                    const Text('Verified: '),
                                    verified
                                        ? const Icon(Icons.check)
                                        : const Icon(Icons.close)
                                  ],
                                ),
                              ],
                            )),
                      ],
                    )),
                ListTile(
                  onTap: () {
                    Navigator.pushNamed(context, '/settings');
                  },
                  horizontalTitleGap: 1,
                  leading: const Icon(Icons.settings),
                  title: const Text('Settings'),
                ),
                ListTile(
                  onTap: () {
                    storage.clear();
                    Navigator.pushReplacementNamed(context, '/login');
                  },
                  horizontalTitleGap: 1,
                  leading: const Icon(Icons.logout_rounded),
                  title: const Text('Log Out'),
                )
              ],
            ),
          );
        } else if (snapshot.hasError) {
          return Center(child: Text('${snapshot.error}'));
        } else {
          return const Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}
