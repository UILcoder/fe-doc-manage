import { submitRepair } from '../models/submitRepair';

class submitRepairDao {
  static async addSubmit (v) {
    return await submitRepair.create(v)
  }

  static async getRepair () {
    return await submitRepair.findAll()
  }
}

export { submitRepairDao }
