import 'package:flutter/material.dart';
import 'package:kaam_daam/components/profile_card.dart';
import 'package:kaam_daam/data/profile_data.dart';
import 'package:kaam_daam/global/constants.dart';
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
  String title = '';

  @override
  void initState() {
    super.initState();
    myProfile = getProfileData(username, userType, accessToken);
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
          const Card(child: ListTile(title: Text('Job 1'))),
          ProfileCard(myProfile: myProfile, userType: userType)
        ][selectedPageIndex],
      ),
    );
  }
}
