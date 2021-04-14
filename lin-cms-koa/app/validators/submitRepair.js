import { LinValidator, Rule } from 'lin-mizar';

class submitRepairValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}
/* 新增楼宇列表校验 */
class CreateOrUpdateSubmitRepairValidator extends LinValidator {
  constructor () {
    super();
    this.name = new Rule('isNotEmpty', '必须传入报修人');
    this.dateTime = new Rule('isNotEmpty', '必须传入报修时间');
    this.buildName = new Rule('isNotEmpty', '必须传入楼宇号');
    this.docId = new Rule('isNotEmpty', '必须传入宿舍号');
    this.telphone = new Rule('isNotEmpty', '必须传入手机号');
    this.detail = new Rule('isNotEmpty', '必须传入问题描述');

  }
}

export { CreateOrUpdateSubmitRepairValidator, submitRepairValidator };
