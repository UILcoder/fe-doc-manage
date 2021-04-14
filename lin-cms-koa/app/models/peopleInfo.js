import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../libs/db';

class PeopleInfo extends Model {
  toJSON() {
    const origin = {
      name: this.name,
      sex: this.sex,
      studentId: this.studentId,
      academy: this.academy,
      class: this.class,
      telphone: this.telphone,
      buildName: this.buildName,
      docId: this.docId,
      password: this.password
    };
    return origin;
  }
}

PeopleInfo.init(
  {
    name: {
      type: Sequelize.STRING(50)
    },
    sex: {
      type: Sequelize.STRING(50)
    },
    studentId: {
      type: Sequelize.INTEGER
    },
    academy: {
      type: Sequelize.STRING(1000)
    },
    class: {
      type: Sequelize.STRING(100)
    },
    telphone: {
      type: Sequelize.INTEGER
    },
    buildName: {
      type: Sequelize.STRING(100)
    },
    docId: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.INTEGER
    }
  },
  merge(
    {
      tableName: 'peopleInfo',
      modelName: 'peopleInfo',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { PeopleInfo };
