import 'package:flutter/material.dart';
import 'package:kaam_daam/data/job_data.dart';
import 'package:url_launcher/url_launcher.dart';

class AppliedBy extends StatelessWidget {
  const AppliedBy({super.key});

  @override
  Widget build(BuildContext context) {
    final arguments =
        ModalRoute.of(context)?.settings.arguments as Map<String, Object>;
    final int id = arguments['id'] as int;
    final String accessToken = arguments['accessToken'] as String;

    return SafeArea(
        child: Scaffold(
      appBar: AppBar(
        title: const Text("Applied By"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: FutureBuilder(
        future: getJobAppliedByData(accessToken, id),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final data = snapshot.data;
            return ListView.builder(
              itemCount: data?.length,
              itemBuilder: (context, index) {
                return Card(
                    child: ListTile(
                  onTap: () {},
                  trailing: IconButton(
                    icon: const Icon(Icons.call),
                    onPressed: () {
                      launchUrl(Uri.parse("tel:${data?[index].phone}"));
                    },
                  ),
                  title: Text(data![index].name!),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Username: ${data[index].username!}"),
                      Text("Rating: ${data[index].rating!}"),
                      Text("Phone: ${data[index].phone!}"),
                      Text("CNIC: ${data[index].cnicno!}"),
                    ],
                  ),
                ));
              },
            );
          } else if (snapshot.hasError) {
            return const Center(
              child: Text("Error"),
            );
          } else {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
        },
      ),
    ));
  }
}
