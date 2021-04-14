import { LinValidator, Rule } from 'lin-mizar';

class DocListValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}
/* 新增宿舍列表校验 */
class CreateOrUpdateDocListValidator extends LinValidator {
  constructor () {
    super();
    this.buildName = new Rule('isNotEmpty', '必须传入楼宇名');
    this.leader = new Rule('isNotEmpty', '必须传入负责人');
    this.docId = new Rule('isNotEmpty', '必须传入宿舍号');
    this.docLeader = new Rule('isNotEmpty', '必须传入宿舍长');
    this.docMembers = new Rule('isNotEmpty', '必须传入宿舍成员');
  }
}

export { CreateOrUpdateDocListValidator, DocListValidator };
