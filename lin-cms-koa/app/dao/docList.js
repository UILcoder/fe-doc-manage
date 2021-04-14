import { DocList } from '../models/docList';

class DocListDao {
  static async addDoc (v) {
    return await DocList.create(v)
  }

  /* 查询宿舍列表 */
  static async getDoc () {
    return await DocList.findAll()
  }
}

export { DocListDao }
