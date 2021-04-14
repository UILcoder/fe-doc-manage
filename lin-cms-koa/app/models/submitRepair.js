import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../libs/db';

class submitRepair extends Model {
  toJSON () {
    const origin = {
      buildName: this.buildName,
      name: this.name,
      dateTime: this.dateTime,
      docId: this.docId,
      telphone: this.telphone,
      detail: this.detail
    };
    return origin;
  }
}

submitRepair.init(
  {
    buildName: {
      type: Sequelize.STRING(50)
    },
    name: {
      type: Sequelize.STRING(50)
    },
    dateTime: {
      type: Sequelize.STRING(50)
    },
    docId: {
      type: Sequelize.INTEGER
    },
    telphone: {
      type: Sequelize.INTEGER
    },
    detail: {
      type: Sequelize.STRING(1000)
    }
  },
  merge(
    {
      tableName: 'submitRepair',
      modelName: 'submitRepair',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { submitRepair };
