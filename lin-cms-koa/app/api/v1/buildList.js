import { LinRouter } from 'lin-mizar';
import { CreateOrUpdateBuildListValidator, DeleteBuildListValidator } from '../../validators/buildLIst';
import { ContentServices } from '../../services/Content';

const buildApi = new LinRouter({
  prefix: '/doc/buildList'
})
/* 增加楼宇列表 */
buildApi.post('/add', async ctx => {
  const v = await new CreateOrUpdateBuildListValidator().validate(ctx)
  await ContentServices.addBuilist(v.get('body'))
  ctx.success({
    msg: "新增楼宇成功"
  })
})

/* 查询楼宇列表 */
buildApi.get('/search', async ctx => {
  const dataList = await ContentServices.getBuildList()
  ctx.json({
    code: 0,
    msg: '成功',
    data: dataList
  })
})

/* 删除列表 */
buildApi.delete('/:id', async ctx => {
  const v = await new DeleteBuildListValidator().validate(ctx)
  return ctx.json(v)
  const id = v.get('path.id')
  await ContentServices.deleteBuild(id)
  ctx.success({
    msg: '删除成功'
  })
})
module.exports = { buildApi }
