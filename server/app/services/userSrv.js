'use strict'

class UserSrv {

  constructor(repository) {
    this.repository = repository;
  }

  async create(model) {
    try {
      const columns = Object.keys(model);
      const data = columns.map(key => typeof model[key] == 'string' ? `"${model[key]}"` : model[key]);

      const query = `INSERT INTO user (${columns.join(',')})` +
        ` VALUES (` + data.join(',') + `)`;
      console.log(query);
      const [response] = await this.repository.execute(query);

      return response.insertId;
    } catch (err) {
      return err;
    }
  }

  async update(model, id) {
    try {
      const columns = Object.keys(model);
      const data = columns.map(key => `${key}=` + (typeof model[key] == 'string' ? `"${model[key]}"` : model[key]));

      const query = `UPDATE user` +
        ` set ` + data.join(',') + ` WHERE id=${id}`;
      const [response] = await this.repository.execute(query);

      return response.info;
    } catch (err) {
      return err;
    }
  }

  async delete(id) {
    try {
      const _query = `DELETE FROM user WHERE id=${id}`;
      const [response] = await this.repository.execute(_query);

      return response.affectedRows;
    } catch (err) {
      console.log(err);

      return err;
    }
  }

  async showById(id) {
    try {
      const [_models] = await this.repository.execute('SELECT * FROM user where id=' + id);

      return _models.length ? _models[0] : {};
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserSrv;
