import { BuildName } from '../models/buildName';

class BuildNameDao {
  /* 查询列表 */
  static async getBuild () {
    return await BuildName.findAll()
  }
  /* 新增楼宇 */
  static async addBuild (v) {
    return await BuildName.create(v)
  }
}

export { BuildNameDao }
