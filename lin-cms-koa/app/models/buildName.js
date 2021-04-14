import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../libs/db';

class BuildName extends Model {
  toJSON () {
    const origin = {
      value: this.value
    };
    return origin;
  }
}

BuildName.init(
  {
    value: {
      type: Sequelize.STRING(1000)
    }
  },
  merge(
    {
      tableName: 'buildName',
      modelName: 'buildName',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { BuildName };
