import 'package:flutter/material.dart';
import 'package:kaam_daam/data/job_data.dart';
import 'package:kaam_daam/services/job_api.dart';
import 'package:url_launcher/url_launcher.dart';

class AppliedBy extends StatelessWidget {
  const AppliedBy({super.key});

  @override
  Widget build(BuildContext context) {
    final arguments =
        ModalRoute.of(context)?.settings.arguments as Map<String, Object>;
    final int id = arguments['id'] as int;
    final String accessToken = arguments['accessToken'] as String;
    final bool completed = arguments['completed'] as bool;

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
                  onTap: completed
                      ? () {
                          final rating = TextEditingController(text: '0');
                          showModalBottomSheet(
                              isScrollControlled: true,
                              context: context,
                              builder: ((context) {
                                return Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Card(
                                      margin: const EdgeInsets.all(16),
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            const Text("Select Rating: "),
                                            RatingDropDown(rating: rating),
                                          ],
                                        ),
                                      ),
                                    ),
                                    TextButton(
                                        onPressed: () async {
                                          final response = await updateRating(
                                              accessToken,
                                              data![index].username!,
                                              rating.text);

                                          if (response.statusCode == 200) {
                                            // ignore: use_build_context_synchronously
                                            Navigator.pop(context);
                                            return;
                                          } else {
                                            // ignore: use_build_context_synchronously
                                            ScaffoldMessenger.of(context)
                                                .showSnackBar(
                                              SnackBar(
                                                content: Text(response.body),
                                                backgroundColor: Colors.red,
                                              ),
                                            );
                                          }
                                        },
                                        child: const Text("RATE")),
                                    const SizedBox(
                                      height: 20,
                                    )
                                  ],
                                );
                              }));
                        }
                      : null,
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

class RatingDropDown extends StatefulWidget {
  const RatingDropDown({super.key, required this.rating});
  final TextEditingController rating;

  @override
  State<RatingDropDown> createState() => _RatingDropDownState();
}

class _RatingDropDownState extends State<RatingDropDown> {
  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      // Step 3.
      value: widget.rating.text,
      borderRadius: const BorderRadius.all(Radius.circular(12)),
      // Step 4.
      items: <String>['0', '1', '2', '3', '4', '5']
          .map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(
            value,
          ),
        );
      }).toList(),
      // Step 5.
      onChanged: (String? newValue) {
        setState(() {
          widget.rating.text = newValue!;
        });
      },
    );
  }
}
