import { LinRouter } from 'lin-mizar';
import { CreateOrUpdateDocListValidator } from '../../validators/doclist';
import { ContentServices } from '../../services/Content';

const docApi = new LinRouter({
  prefix: '/doc/docList'
})
/* 增加楼宇列表 */
docApi.post('/add', async ctx => {
  const v = await new CreateOrUpdateDocListValidator().validate(ctx)
  await ContentServices.addDocList(v.get('body'))
  ctx.success({
    msg: "新增宿舍成功"
  })
})

/* 查询宿舍列表 */
docApi.get('/search', async ctx => {
  const dataList = await ContentServices.getDocList()
  ctx.json({
    code: 0,
    msg: '成功',
    data: dataList
  })
})

module.exports = { docApi }
