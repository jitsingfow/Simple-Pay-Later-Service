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
    },

    addMerchant: function (merchantName, merchantEmail, discount) {
        var returnObj = {};

        var foundMerchant = merchants.find(function (merchant) {
            return merchant.merchantName === merchantName;
        });

        if (foundMerchant === undefined) {
            merchants.push({
                merchantName: merchantName,
                emailId: merchantEmail,
                discount: discount
            });

            returnObj = {
                status: true,
                msg: 'Merchant created',
                merchant: {
                    merchantName: merchantName,
                    discount: discount
                }
            }
            return returnObj;
        } else {
            returnObj = {
                status: false,
                msg: 'Merchant already'
            };
            return returnObj;
        }
    }
}