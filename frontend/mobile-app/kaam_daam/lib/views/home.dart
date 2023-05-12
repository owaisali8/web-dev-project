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
  late List<Job> jobs = [];
  String title = '';

  int currentPage = 1;
  int pageSize = 10;
  bool isLoading = false;

  late ScrollController _scrollController;

  void _scrollListener() async {
    if (_scrollController.offset >=
            _scrollController.position.maxScrollExtent &&
        !_scrollController.position.outOfRange) {
      _loadData();
    }
  }

  void _loadData() async {
    if (!isLoading) {
      setState(() {
        isLoading = true;
      });

      final newItems = await getJobsData(accessToken, currentPage, pageSize);
      setState(() {
        jobs.addAll(newItems);
        currentPage++;
        isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _scrollController.addListener(_scrollListener);
    myProfile = getProfileData(username, userType, accessToken);
    _loadData();
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
          ListView.builder(
            controller: _scrollController,
            itemCount: jobs.length + 1,
            itemBuilder: (context, index) {
              if (index < jobs.length) {
                return Card(
                    child: ListTile(
                  onTap: () {
                    Navigator.pushNamed(context, '/job/info', arguments: {
                      "accessToken": accessToken,
                      "data": jobs[index],
                      "userType": userType,
                      "username": username
                    });
                  },
                  horizontalTitleGap: -2,
                  title: Text(jobs[index].title!),
                  leading: Text(
                    '${jobs[index].jobid}',
                  ),
                  trailing: Text('${jobs[index].jobtype}'),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('${jobs[index].description}'),
                      Text('Posted On: ${jobs[index].dateposted}'),
                    ],
                  ),
                ));
              } else {
                if (isLoading) {
                  return const Padding(
                    padding: EdgeInsets.symmetric(vertical: 16.0),
                    child: Center(
                      child: CircularProgressIndicator(),
                    ),
                  );
                } else {
                  return const SizedBox();
                }
              }
            },
          ),
          ProfileCard(myProfile: myProfile, userType: userType)
        ][selectedPageIndex],
      ),
    );
  }
}
