import 'package:flutter/material.dart';
import 'package:kaam_daam/global/constants.dart';
import 'package:kaam_daam/models/job_model.dart';
import 'package:kaam_daam/services/job_api.dart';

class JobInfo extends StatelessWidget {
  const JobInfo({super.key});

  @override
  Widget build(BuildContext context) {
    final arguments =
        ModalRoute.of(context)?.settings.arguments as Map<String, Object>;
    final Job jobData = arguments['data'] as Job;
    final String userType = arguments['userType'] as String;
    final String accessToken = arguments['accessToken'] as String;
    final String username = arguments['username'] as String;
    final bool isVerified = storage.getItem('isVerified');

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
                  onPressed: () async {
                    if (!isVerified) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('You are not verified'),
                          backgroundColor: Colors.red,
                        ),
                      );
                      return;
                    }

                    await applyJob(accessToken, username, jobData.jobid!);
                  },
                  tooltip: 'Apply',
                  isExtended: true,
                  child: const Text('Apply'),
                )
              : Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    FloatingActionButton(
                      onPressed: () {},
                      backgroundColor: Colors.green,
                      tooltip: 'Complete',
                      isExtended: true,
                      child: const Icon(Icons.check),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    FloatingActionButton(
                      onPressed: () {},
                      backgroundColor: Colors.red,
                      tooltip: 'Delete',
                      isExtended: true,
                      child: const Icon(Icons.delete),
                    ),
                  ],
                ),
          body: SingleChildScrollView(
            child: Column(
              children: [
                Card(
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
                )),
                userType == 'EMPLOYER'
                    ? Card(
                        child: ListTile(
                          onTap: () {
                            Navigator.pushNamed(context, '/appliedBy',
                                arguments: {
                                  "accessToken": accessToken,
                                  "id": jobData.jobid!
                                });
                          },
                          title: const Text("Applied By: "),
                          trailing: const Icon(Icons.arrow_forward_ios_rounded),
                        ),
                      )
                    : const SizedBox()
              ],
            ),
          )),
    );
  }
}
