import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../libs/db';

class DocList extends Model {
  toJSON () {
    const origin = {
      buildName: this.buildName,
      leader: this.leader,
      docId: this.docId,
      docLeader: this.docLeader,
      docMembers: this.docMembers
    };
    return origin;
  }
}

DocList.init(
  {
    buildName: {
      type: Sequelize.STRING(50)
    },
    leader: {
      type: Sequelize.STRING(50)
    },
    docId: {
      type: Sequelize.INTEGER
    },
    docLeader: {
      type: Sequelize.STRING(1000)
    },
    docMembers: {
      type: Sequelize.STRING(50),
      allowNull: false,
      get () {
        return this.getDataValue('docMembers').split(';')
      },
      set (val) {
        this.setDataValue('docMembers', val.join(';'));
      }
    }
  },
  merge(
    {
      tableName: 'docList',
      modelName: 'docList',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { DocList };
