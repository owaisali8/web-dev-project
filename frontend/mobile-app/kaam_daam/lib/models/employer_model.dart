class Employer {
  String? username;
  String? password;
  String? name;
  String? phone;
  String? email;
  String? address;
  String? dob;
  String? gender;

  Employer(
      {this.username,
      this.password,
      this.name,
      this.phone,
      this.email,
      this.address,
      this.dob,
      this.gender});

  Employer.fromJson(Map<String, dynamic> json) {
    username = json['username'];
    password = json['password'];
    name = json['name'];
    phone = json['phone'];
    email = json['email'];
    address = json['address'];
    dob = json['dob'];
    gender = json['gender'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['username'] = username;
    data['password'] = password;
    data['name'] = name;
    data['phone'] = phone;
    data['email'] = email;
    data['address'] = address;
    data['dob'] = dob;
    data['gender'] = gender;
    return data;
  }
}
