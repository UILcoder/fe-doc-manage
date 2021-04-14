import { LinValidator, Rule } from 'lin-mizar';

class BuildListValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}
/* 新增楼宇列表校验 */
class CreateOrUpdateBuildListValidator extends LinValidator {
  constructor () {
    super();
    this.buildName = new Rule('isNotEmpty', '必须传入楼宇名');
    this.leader = new Rule('isNotEmpty', '必须传入负责人');
    this.sex = new Rule('isNotEmpty', '必须传入性别');
    this.address = new Rule('isNotEmpty', '必须传入地址');
    this.telphone = new Rule('isNotEmpty', '必须传入手机号');
  }
}

class DeleteBuildListValidator extends LinValidator {
  constructor () {
    super();
    this.id = new Rule('isNotEmpty', '必须传入id')
  }
}
export { CreateOrUpdateBuildListValidator, BuildListValidator, DeleteBuildListValidator };
