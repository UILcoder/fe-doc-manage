import { PeopleInfoDao } from '../dao/peopleInfo';
import { BuildListDao } from '../dao/buildList';
import { DocListDao } from '../dao/docList';
import { submitRepairDao } from '../dao/submitRepair';
import { BuildNameDao } from '../dao/buildName';

class ContentServices {
  /* 新增个人信息 */
  static async addContent(v) {
    await PeopleInfoDao.addPeopleInfo(v);
  }

  /* 新增楼宇列表 */
  static async addBuilist(v) {
    await BuildListDao.addBuild(v);
  }

  /* 新增宿舍列表 */
  static async addDocList(v) {
    await DocListDao.addDoc(v);
  }

  /* 提交损坏报修 */
  static async addSubmitRepair(v) {
    await submitRepairDao.addSubmit(v);
  }

  /* 查询build列表 */
  static async getBuildList() {
    const build = await BuildListDao.getBuild();
    return getData(build);
  }

  /* 查询宿舍列表 */
  static async getDocList() {
    const doc = await DocListDao.getDoc();
    return getData(doc);
  }

  /* 查询学生列表 */
  static async getPeopleInfo() {
    const peopleInfo = await PeopleInfoDao.getPeopleInfo();
    return getData(peopleInfo);
  }

  /* 查询楼宇列表 */
  static async getBuildName() {
    const buildName = await BuildNameDao.getBuild();
    return getData(buildName);
  }

  /* 查询报修列表 */
  static async getRepair() {
    const repair = await submitRepairDao.getRepair();
    return getData(repair);
  }

  /* 新增楼宇 */
  static async addBuildName(v) {
    await BuildNameDao.addBuild(v);
  }

  /* 修改学生列表 */
  static async editPeopleInfo(id, v) {
    await PeopleInfoDao.editPeopleInfo(id, v);
  }

  /* 删除楼宇列表 */
  static async deleteBuild(id) {
    await BuildListDao.deleteBuild(id);
  }

  /* 查询个人信息 */
  static async searchPeopleInfo(p, q) {
    await PeopleInfoDao.searchOnePeopleInfo(p, q)
  }
}

function getData(list) {
  const res = [];
  res.push.apply(res, list);
  return res;
}
export { ContentServices };
