const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const mysql = new (require(`${__class_dir}/mariadb.class.js`))(config.db);
const bcrypt = require('bcrypt');
const Joi = require('joi');

class _user {
    add(data) {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).required()
        }).options({
            abortEarly: false
        });

        const validation = schema.validate(data);
        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(data.password, saltRounds);

        const sql = {
            query: `INSERT INTO users (username, password) VALUES (?, ?)`,
            params: [data.username, hashedPassword]
        };

        return mysql.query(sql.query, sql.params)
            .then(data => {
                return {
                    status: true,
                    data
                };
            })
            .catch(error => {
                if (debug) {
                    console.error('Menambah user Error: ', error);
                }

                return {
                    status: false,
                    error
                };
            });

    }
    getAll() {
        const sql = {
            query: `SELECT * FROM users`
        };

        return mysql
            .query(sql.query)
            .then(data => {
                return {
                    status: true,
                    data
                };
            })
            .catch(error => {
                if (debug) {
                    console.error('Menampilkan users Error: ', error);
                }

                return {
                    status: false,
                    error
                };
            });
    }

    async update(id, data) {
        const schema = Joi.object({
            username: Joi.string(),
            password: Joi.string().min(6)
        }).options({
            abortEarly: false
        });

        const validation = schema.validate(data);
        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }

        if (data.password) {
            const saltRounds = 10;
            data.password = await bcrypt.hash(data.password, saltRounds);
        }

        const sql = {
            query: `UPDATE users SET username = ?, password = ? WHERE id = ?`,
            params: [data.username, data.password, id]
        };

        try {
            const result = await mysql.query(sql.query, sql.params);
            return {
                status: true,
                data: result
            };
        } catch (error) {
            if (debug) {
                console.error('update user Error:', error);
            }
            return {
                status: false,
                error
            };
        }
    }
    delete(id) {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required()
        }).options({
            abortEarly: false
        });

        const validation = schema.validate({ id });
        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }

        const sql = {
            query: `DELETE FROM users WHERE id = ?`,
            params: [id]
        };

        try {
            const result = mysql.query(sql.query, sql.params);
            return {
                status: true,
                data: result
            };
        } catch (error) {
            if (debug) {
                console.error('delete user Error:', error);
            }
            return {
                status: false,
                error
            };
        }
    }

    async createTodo(userId, data) {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string()
        }).options({
            abortEarly: false
        });

        const validation = schema.validate(data);
        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }

        const sql = {
            query: `INSERT INTO todo_user (user_id, title, description) VALUES (?, ?, ?)`,
            params: [userId, data.title, data.description]
        };

        try {
            const result = await mysql.query(sql.query, sql.params);

            return {
                status: true,
                data: result
            };
        } catch (error) {
            if (debug) {
                console.error('create Todo Error:', error);
            }
            return {
                status: false,
                error
            };
        }
    }

    async getUserTodos(userId) {
        const sql = {
            query: `SELECT * FROM todo_user WHERE user_id = ?`,
            params: [userId]
        };

        try {
            const result = await mysql.query(sql.query, sql.params);

            return {
                status: true,
                data: result
            };
        } catch (error) {
            if (debug) {
                console.error('get User Todos Error:', error);
            }
            return {
                status: false,
                error
            };
        }
    }

    async updateTodo(todoId, data) {
        const schema = Joi.object({
            title: Joi.string(),
            description: Joi.string()
        }).options({
            abortEarly: false
        });

        const validation = schema.validate(data);
        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            };
        }

        const sql = {
            query: `UPDATE todo_user SET title = ?, description = ? WHERE id = ?`,
            params: [data.title, data.description, todoId]
        };

        try {
            const result = await mysql.query(sql.query, sql.params);

            return {
                status: true,
                data: result
            };
        } catch (error) {
            if (debug) {
                console.error('update Todo Error:', error);
            }
            return {
                status: false,
                error
            };
        }
    }

    async deleteTodo(todoId) {
        const sql = {
            query: `DELETE FROM todo_user WHERE id = ?`,
            params: [todoId]
        };

        try {
            const result = await mysql.query(sql.query, sql.params);

            return {
                status: true,
                data: result
            };
        } catch (error) {
            if (debug) {
                console.error('delete Todo Error:', error);
            }
            return {
                status: false,
                error
            };
        }
    }

}

module.exports = new _user();
