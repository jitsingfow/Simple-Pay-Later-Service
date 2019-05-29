var users = [];
var merchants = [];
var interestRate = 0;
var allTransactions = [];
var UserCreditLimit = [];

module.exports = {
    addUser: function (userName, emailId, creditLimit) {
        var returnObj = {};

        var foundUser = users.find(function (user) {
            return user.userName === userName;
        });

        if (foundUser === undefined) {
            users.push({
                userName: userName,
                emailId: emailId,
                creditLimit: creditLimit
            });

            returnObj = {
                status: true,
                msg: 'User created',
                user: {
                    userName: userName,
                    creditLimit: creditLimit
                }
            }
            return returnObj;
        } else {
            returnObj = {
                status: false,
                msg: 'User already exist'
            };
            return returnObj;
        }
    }
}