import { LinValidator, Rule } from 'lin-mizar';

/* 新增宿舍列表校验 */
class CreateOrUpdateBuildNameValidator extends LinValidator {
  constructor () {
    super();
    this.value = new Rule('isNotEmpty', '必须传入楼宇名');
  }
}

export { CreateOrUpdateBuildNameValidator };
