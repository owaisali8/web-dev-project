class Profile {
    int? id;
    String? username;
    String? name;
    String? phone;
    String? email;
    String? address;
    String? dob;
    String? gender;
    String? cnicno;
    String? jobtype;
    String? joindate;
    bool? verified;
    String? rating;

    Profile({this.id, this.username, this.name, this.phone, this.email, this.address, this.dob, this.gender, this.cnicno, this.jobtype, this.joindate, this.verified, this.rating}); 

    Profile.fromJson(Map<String, dynamic> json) {
        id = json['employee_id'] ?? json['employer_id'];
        username = json['username'];
        name = json['name'];
        phone = json['phone'];
        email = json['email'];
        address = json['address'];
        dob = json['dob'];
        gender = json['gender'];
        cnicno = json['cnic_no'];
        jobtype = json['job_type'];
        joindate = json['join_date'];
        verified = json['verified'];
        rating = json['rating'];
    }

    Map<String, dynamic> toJson() {
        final Map<String, dynamic> data = <String, dynamic>{};
        data['employee_id'] = id;
        data['username'] = username;
        data['name'] = name;
        data['phone'] = phone;
        data['email'] = email;
        data['address'] = address;
        data['dob'] = dob;
        data['gender'] = gender;
        data['cnic_no'] = cnicno;
        data['job_type'] = jobtype;
        data['join_date'] = joindate;
        data['verified'] = verified;
        data['rating'] = rating;
        return data;
    }
}

