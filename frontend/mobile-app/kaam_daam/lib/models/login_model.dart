class LoginModel {
    String? accessToken;
    String? refreshToken;
    String? usertype;

    LoginModel({this.accessToken, this.refreshToken, this.usertype}); 

    LoginModel.fromJson(Map<String, dynamic> json) {
        accessToken = json['accessToken'];
        refreshToken = json['refreshToken'];
        usertype = json['usertype'];
    }

    Map<String, dynamic> toJson() {
        final Map<String, dynamic> data = <String, dynamic>{};
        data['accessToken'] = accessToken;
        data['refreshToken'] = refreshToken;
        data['usertype'] = usertype;
        return data;
    }
}

