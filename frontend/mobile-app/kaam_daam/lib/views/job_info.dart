import 'package:flutter/material.dart';
import 'package:kaam_daam/models/job_model.dart';

class JobInfo extends StatelessWidget {
  const JobInfo({super.key});

  @override
  Widget build(BuildContext context) {
    final arguments =
        ModalRoute.of(context)?.settings.arguments as Map<String, Object>;
    final Job jobData = arguments['data'] as Job;
    final String userType = arguments['userType'] as String;
    return SafeArea(
      child: Scaffold(
          appBar: AppBar(
            title: const Text('Job Info'),
            leading: IconButton(
              icon: const Icon(Icons.arrow_back_rounded),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ),
          floatingActionButton: userType == 'EMPLOYEE'
              ? FloatingActionButton(
                  onPressed: () {},
                  tooltip: 'Apply',
                  isExtended: true,
                  child: const Text('Apply'),
                )
              : FloatingActionButton(
                  onPressed: () {},
                  backgroundColor: Colors.red,
                  tooltip: 'Delete',
                  isExtended: true,
                  child: const Icon(Icons.delete),
                ),
          body: Card(
              child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                horizontalTitleGap: -2,
                title: Text(jobData.title!),
                leading: Text(
                  '${jobData.jobid}',
                ),
                trailing: Text('${jobData.jobtype}'),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('${jobData.description}'),
                    Text('Posted On: ${jobData.dateposted}'),
                  ],
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              ListTile(
                  title: const Text('Salary: '),
                  trailing: Text('${jobData.salary}')),
              ListTile(
                title: const Text("Completed: "),
                trailing: jobData.completed!
                    ? const Icon(Icons.check)
                    : const Icon(Icons.cancel),
              )
            ],
          ))),
    );
  }
}
