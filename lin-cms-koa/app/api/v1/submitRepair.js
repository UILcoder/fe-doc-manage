import { LinRouter } from 'lin-mizar';
import { CreateOrUpdateSubmitRepairValidator } from '../../validators/submitRepair';
import { ContentServices } from '../../services/Content';

const repairApi = new LinRouter({
  prefix: '/doc/repair'
})
/* 增加提交列表 */
repairApi.post('/submit', async ctx => {
  const v = await new CreateOrUpdateSubmitRepairValidator().validate(ctx)
  await ContentServices.addSubmitRepair(v.get('body'))
  ctx.success({
    msg: "提交成功"
  })
})
/* 查询报修列表 */
repairApi.get('/search',async ctx => {
  const dataList = await ContentServices.getRepair()
  ctx.json({
    code: 0,
    msg: '成功',
    data: dataList
  })
})
module.exports = { repairApi }
