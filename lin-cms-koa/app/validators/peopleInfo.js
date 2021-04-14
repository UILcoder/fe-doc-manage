import { LinValidator, Rule } from 'lin-mizar';

class CreateOrUpdatePeopleInfoValidator extends LinValidator {
  constructor() {
    super();
    this.name = new Rule('isNotEmpty', '必须传入姓名');
    this.sex = new Rule('isNotEmpty', '必须传入性别');
    this.studentId = new Rule('isNotEmpty', '必须传入学号');
    this.academy = new Rule('isNotEmpty', '必须传入学院');
    this.class = new Rule('isNotEmpty', '必须传入班级');
    this.telphone = new Rule('isNotEmpty', '必须传入联系电话');
    this.buildName = new Rule('isNotEmpty', '必须传入楼宇');
    this.docId = new Rule('isNotEmpty', '必须传入宿舍号');
    this.password = new Rule('isNotEmpty', '必须传入密码')
  }
}

class PeopleInfoValidator extends CreateOrUpdatePeopleInfoValidator {
  constructor() {
    super();
    this.studentId = [
      new Rule('isNotEmpty', '必须传入搜索关键字'),
      new Rule('isInt')
    ]
  }
}
class PeopleInfoValidator extends SearchOnePeopleInfoValidator {
  constructor() {
    super();
    this.p = new Rule('isNotEmpty')
    this.q = new Rule('isNotEmpty')
  }
}

export { CreateOrUpdatePeopleInfoValidator, PeopleInfoValidator, SearchOnePeopleInfoValidator };
