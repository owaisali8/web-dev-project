import 'package:flutter/material.dart';
import 'package:kaam_daam/components/profile_card.dart';
import 'package:kaam_daam/data/job_data.dart';
import 'package:kaam_daam/data/profile_data.dart';
import 'package:kaam_daam/global/constants.dart';
import 'package:kaam_daam/models/job_model.dart';
import 'package:kaam_daam/models/profile_model.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int selectedPageIndex = 0;
  final String accessToken = storage.getItem('accessToken');
  final String userType = storage.getItem('userType');
  final String username = storage.getItem('username');

  late Future<Profile> myProfile;
  late Future<List<Job>> jobs;
  String title = '';

  @override
  void initState() {
    super.initState();
    myProfile = getProfileData(username, userType, accessToken);
    jobs = getJobsData(accessToken);
  }

  @override
  Widget build(BuildContext context) {
    switch (selectedPageIndex) {
      case 0:
        title = 'Jobs';
        break;
      case 1:
        title = 'Profile';
        break;
      default:
        title = 'Jobs';
        break;
    }

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text(title),
          centerTitle: true,
        ),
        floatingActionButton: userType == 'EMPLOYER'
            ? FloatingActionButton(
                onPressed: () {},
                tooltip: 'New Job',
                child: const Icon(Icons.add),
              )
            : null,
        bottomNavigationBar: NavigationBar(
          selectedIndex: selectedPageIndex,
          onDestinationSelected: (int index) {
            setState(() {
              selectedPageIndex = index;
            });
          },
          destinations: const <NavigationDestination>[
            NavigationDestination(
              selectedIcon: Icon(Icons.work_rounded),
              icon: Icon(Icons.work_outline_rounded),
              label: 'Jobs',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.person),
              icon: Icon(Icons.person_outline),
              label: 'Profile',
            ),
          ],
        ),
        body: [
          FutureBuilder(
            future: jobs,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                final data = snapshot.data!;
                return ListView.builder(
                  itemCount: data.length,
                  itemBuilder: (context, index) {
                    return Card(
                        child: ListTile(
                      onTap: () {},
                      horizontalTitleGap: -2,
                      title: Text(data[index].title!),
                      leading: Text(
                        '${data[index].jobid}',
                      ),
                      trailing: Text('${data[index].jobtype}'),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('${data[index].description}'),
                          Text('Posted On: ${data[index].dateposted}'),
                        ],
                      ),
                    ));
                  },
                );
              } else if (snapshot.hasError) {
                return Center(child: Text('${snapshot.error}'));
              } else {
                return const Center(child: CircularProgressIndicator());
              }
            },
          ),
          ProfileCard(myProfile: myProfile, userType: userType)
        ][selectedPageIndex],
      ),
    );
  }
}
