import 'package:flutter/material.dart';
import 'package:kaam_daam/global/constants.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int selectedPageIndex = 0;
  final accessToken = storage.getItem('accessToken');
  final userType = storage.getItem('userType');
  String title = '';

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
        floatingActionButton: userType == 'Employer'
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
          Card(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Padding(
                  padding: EdgeInsets.only(top: 8.0),
                  child:
                      CircleAvatar(radius: 25, child: Icon(Icons.person_rounded)),
                ),
                const ListTile(title: Text('Profile'), subtitle: Text("Hello")),
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
          )
        ][selectedPageIndex],
      ),
    );
  }
}
