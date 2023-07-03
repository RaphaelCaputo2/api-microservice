const rabbitmq = require('../helpers/rabbitmq');

exports.createUser = async (req, res) => {
    const user = req.body;
    await rabbitmq.sendToQueue('createUser', JSON.stringify(user));
    res.status(200).send({ message: 'User creation request sent.' });
};

exports.getUser = async (req, res) => {
    const userId = req.params.id;
    await rabbitmq.sendToQueue('getUser', JSON.stringify({ id: userId }));
    res.status(200).send({ message: 'User retrieval request sent.' });
};

exports.updateUser = async (req, res) => {
    const user = req.body;
    user.id = req.params.id;
    await rabbitmq.sendToQueue('updateUser', JSON.stringify(user));
    res.status(200).send({ message: 'User update request sent.' });
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    await rabbitmq.sendToQueue('deleteUser', JSON.stringify({ id: userId }));
    res.status(200).send({ message: 'User deletion request sent.' });
};