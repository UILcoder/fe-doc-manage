import { PeopleInfo } from '../models/peopleInfo';
import { NotFound } from 'lin-mizar';

class PeopleInfoDao {
  static async addPeopleInfo(v) {
    return await PeopleInfo.create(v)
  }

  /* 查询学生列表 */
  static async getPeopleInfo() {
    return await PeopleInfo.findAll()
  }

  /* 修改学生列表 */
  static async editPeopleInfo(id, v) {
    const people = await PeopleInfo.findByPk(Number(id))
    if (!people) {
      throw new NotFound({ msg: '异常' })
    }
    return await PeopleInfo.update({ ...v });
  }

  /* 查询某个学生信息 */
  static async searchOnePeopleInfo(p, q) {
    const data = await Book.findOne({
      where: {
        telphone: {
          [Sequelize.Op.like]: `%${q}%`
        },
        password: {
          [Sequelize.Op.like]: `%${p}%`
        }
      }
    });
    return data;
  }
}

export { PeopleInfoDao }
