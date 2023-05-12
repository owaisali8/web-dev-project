import 'package:flutter/material.dart';
import 'package:kaam_daam/global/dark_theme.dart';
import 'package:kaam_daam/services/profile_api.dart';
import 'package:provider/provider.dart';

import '../global/constants.dart';

class Settings extends StatelessWidget {
  const Settings({super.key});

  @override
  Widget build(BuildContext context) {
    final String accessToken = storage.getItem('accessToken');
    final String userType = storage.getItem('userType');
    final String username = storage.getItem('username');
    return SafeArea(
        child: Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Column(children: [
        const SwitchListTileExample(title: 'Dark Mode'),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          child: Divider(),
        ),
        ListTile(
          title: const Text("Account Deletion"),
          trailing: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red[100],
                  foregroundColor: Colors.red.shade900),
              onPressed: () async {
                final response =
                    await deleteProfile(username, userType, accessToken);
                if (response.statusCode != 200) {
                  // ignore: use_build_context_synchronously
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(response.body),
                      backgroundColor: Colors.red,
                    ),
                  );
                  return;
                }
                
                  // ignore: use_build_context_synchronously
                ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Account deleted'),
                      backgroundColor: Colors.green,
                    ),
                  );

                storage.clear();
                // ignore: use_build_context_synchronously
                Navigator.pop(context);
                // ignore: use_build_context_synchronously
                Navigator.pushReplacementNamed(context, '/login');
              },
              icon: const Icon(Icons.delete),
              label: const Text('Delete My Account')),
        )
      ]),
    ));
  }
}

class SwitchListTileExample extends StatefulWidget {
  const SwitchListTileExample({
    super.key,
    required this.title,
  });
  final String title;

  @override
  State<SwitchListTileExample> createState() => _SwitchListTileExampleState();
}

class _SwitchListTileExampleState extends State<SwitchListTileExample> {
  bool _lights = storage.getItem("isDarkMode") ?? false;
  @override
  Widget build(BuildContext context) {
    return Consumer<DarkThemeNotifier>(
      builder: (context, theme, child) {
        return SwitchListTile(
          title: Text(widget.title),
          value: _lights,
          activeColor: Colors.indigo,
          onChanged: (bool value) {
            setState(() {
              _lights = value;
              theme.setDarkMode(value);
            });
          },
        );
      },
    );
  }
}
