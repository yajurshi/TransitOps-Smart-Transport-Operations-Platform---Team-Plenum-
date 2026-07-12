const { run, get, all } = require('../config/database');

const getAllExpenses = async (limit, offset, category) => {
    let query = 'SELECT * FROM expenses WHERE 1=1';
    const params = [];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    const countQuery = 'SELECT COUNT(*) as total FROM expenses' + (category ? ' WHERE category = ?' : '');
    const countParams = category ? [category] : [];
    const countRow = await get(countQuery, countParams);
    const total = countRow.total;

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const expenses = await all(query, params);

    return { expenses, total };
};

const getExpenseById = async (id) => {
    return await get('SELECT * FROM expenses WHERE id = ?', [id]);
};

const createExpense = async (data) => {
    const result = await run(`
        INSERT INTO expenses (category, amount, description, date)
        VALUES (?, ?, ?, ?)
    `, [data.category, data.amount, data.description, data.date]);
    return result.lastID;
};

const deleteExpense = async (id) => {
    await run('DELETE FROM expenses WHERE id = ?', [id]);
};

module.exports = { getAllExpenses, getExpenseById, createExpense, deleteExpense };
