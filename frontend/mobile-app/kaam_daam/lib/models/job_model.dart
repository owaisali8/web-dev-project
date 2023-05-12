class Job {
  int? jobid;
  String? title;
  String? description;
  String? jobtype;
  String? dateposted;
  String? salary;
  bool? completed;
  int? employerid;

  Job(
      {this.jobid,
      this.title,
      this.description,
      this.jobtype,
      this.dateposted,
      this.salary,
      this.completed,
      this.employerid});

  Job.fromJson(Map<String, dynamic> json) {
    jobid = json['job_id'];
    title = json['title'];
    description = json['description'];
    jobtype = json['job_type'];
    dateposted = json['date_posted'];
    salary = json['salary'];
    completed = json['completed'];
    employerid = json['employer_id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['job_id'] = jobid;
    data['title'] = title;
    data['description'] = description;
    data['job_type'] = jobtype;
    data['date_posted'] = dateposted;
    data['salary'] = salary;
    data['completed'] = completed;
    data['employer_id'] = employerid;
    return data;
  }
}
