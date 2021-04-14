import { LinRouter } from 'lin-mizar';
import { ContentServices } from '../../services/Content';
import { CreateOrUpdateBuildNameValidator } from '../../validators/buildName';

const buildNameApi = new LinRouter({
  prefix: '/doc/buildName'
})

buildNameApi.post('/add', async ctx => {
  const v = await new CreateOrUpdateBuildNameValidator().validate(ctx)
  await ContentServices.addBuildName(v.get('body'))
  ctx.success({
    msg: "楼宇添加成功"
  })
})
/* 查询楼宇列表 */
buildNameApi.get('/search', async ctx => {
  const dataList = await ContentServices.getBuildName()
  ctx.json({
    code: 0,
    msg: '成功',
    data: dataList
  })
})
module.exports = { buildNameApi }
