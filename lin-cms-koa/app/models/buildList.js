import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../libs/db';

class BuildList extends Model {
  toJSON () {
    const origin = {
      buildName: this.buildName,
      leader: this.leader,
      sex: this.sex,
      address: this.address,
      telphone: this.telphone
    };
    return origin;
  }
}

BuildList.init(
  {
    buildName: {
      type: Sequelize.STRING(50)
    },
    leader: {
      type: Sequelize.STRING(50)
    },
    sex: {
      type: Sequelize.STRING(50)
    },
    address: {
      type: Sequelize.STRING(1000)
    },
    telphone: {
      type: Sequelize.INTEGER
    }
  },
  merge(
    {
      tableName: 'buildList',
      modelName: 'buildList',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { BuildList };
