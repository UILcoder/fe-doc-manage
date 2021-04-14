import { LinRouter } from 'lin-mizar';
import { CreateOrUpdatePeopleInfoValidator, PeopleInfoValidator, SearchOnePeopleInfoValidator } from '../../validators/peopleInfo';
import { ContentServices } from '../../services/Content';
import { PeopleInfoDao } from '../../dao/peopleInfo';

const peopleApi = new LinRouter({
  prefix: '/doc/peopleInfo'
})

peopleApi.post('/save', async ctx => {
  const v = await new CreateOrUpdatePeopleInfoValidator().validate(ctx)
  await ContentServices.addContent(v.get('body'))
  ctx.success({
    msg: "个人信息添加成功"
  })
})

/* 查询学生列表 */
peopleApi.get('/search', async ctx => {
  const dataList = await ContentServices.getPeopleInfo()
  const obj = { code: 0, msg: '成功' }
  obj.data = dataList
  ctx.json(obj)
})

/* 修改学生列表 */
peopleApi.put('/:studentId', async ctx => {
  const v = await new PeopleInfoValidator().validate(ctx)
  const studentId = v.get('path.studentId')
  const params = v.get('body')
  await ContentServices.editPeopleInfo(studentId, params)
  ctx.success({
    msg: "修改成功"
  })
})
peopleApi.get('/search/one', async ctx => {
  const v = await new SearchOnePeopleInfoValidator().validate(ctx);
  const data = await ContentServices.searchPeopleInfo(v.get('query.q'), v.get('query.p'));
  ctx.json({
    code: 0,
    msg: '成功',
    data
  });
});

module.exports = { peopleApi }
