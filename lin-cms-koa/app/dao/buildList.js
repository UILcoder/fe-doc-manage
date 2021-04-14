import { BuildList } from '../models/buildList';

class BuildListDao {
  /* 新增列表 */
  static async addBuild (v) {
    return await BuildList.create(v)
  }

  /* 查询列表 */
  static async getBuild () {
    return await BuildList.findAll()
  }

  /* 删除列表 */
  static async deleteBuild (id) {
    return await BuildList.destroy({ where: { id } });
  }
}

export { BuildListDao }
