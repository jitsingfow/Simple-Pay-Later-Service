var users = [];
var merchants = [];
var interestRate = 0;
var allTransactions = [];
var userCreditLimit = [];
var discountsByMerchant = [];


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
                creditLimit: creditLimit,
                availableCreditLimit : creditLimit
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
    },

    setInterest: function (rateOfInterest) {
        interestRate = rateOfInterest;
        return interestRate;
    },

    userTxn: function (userName, merchantName, amount) {
        var indexOfUser = users.findIndex(function (user) {
            return user.userName === userName;
        });

        var indexOfMerchant = merchants.findIndex(function (merchant) {
            return merchant.merchantName === merchantName;
        });

        if (indexOfMerchant === -1) {
            return {
                status: false,
                msg: 'rejected!',
                reason: 'mercent doesnot exist'
            }
        }
        if (indexOfUser === -1) {
            return {
                status: false,
                msg: 'rejected!',
                reason: 'user doesnot exist'
            }
        }

        if (amount > users[indexOfUser].availableCreditLimit) {
            //When the transaction amount is greater then credit limt of the user Reject transaction

            allTransactions.push({
                id: allTransactions.length+1,
                fromUser: userName,
                toMerchant: merchantName,
                txnAmount: amount,
                txnStatus: 'rejected',
                remarks: 'credit limit'
            });

            return { status: false, msg: 'rejected!', reason: 'credit limit' };
        }
        else {
            //When the transaction amount is less then or equal to credit limt of the user approve transaction
            //Update credit limit of user
            //if credit limit becomes zero, add user to UserCreditLimit
            //add transaction to allTransactions
            //update discount of marchant
            var newAvailableCreditLimit = users[indexOfUser].availableCreditLimit - amount;
            users[indexOfUser].availableCreditLimit = newAvailableCreditLimit;

            if (newAvailableCreditLimit === 0) {
                userCreditLimit.push(userName);
            }

            allTransactions.push({
                id: allTransactions.length+1,
                fromUser: userName,
                toMerchant: merchantName,
                txnAmount: amount,
                txnStatus: 'sucess',
                remarks: ''
            });
            
            var indexOfMerchantDiscount = discountsByMerchant.findIndex(function (element) {
                return element.merchant === merchantName;
            });
            
            if(indexOfMerchantDiscount === -1){
                discountsByMerchant.push({
                    merchant : merchantName,
                    discount: _calcDiscountOfMerchant(amount, merchants[indexOfMerchant].discount)
                });
            }
            else{
                discountsByMerchant[indexOfMerchantDiscount].discount = discountsByMerchant[indexOfMerchantDiscount].discount +  _calcDiscountOfMerchant(amount, merchants[indexOfMerchant].discount)
            }
            return { status: true, msg: 'success!' }
        }
    },

    reportUserCreditLimit: function () {
        return userCreditLimit;
    },

    reportUserDues: function (userName) {
        var indexOfUser = users.findIndex(function (user) {
            return user.userName === userName;
        });

        return users[indexOfUser].creditLimit - users[indexOfUser].availableCreditLimit;
    },

    reportMerchantDiscount: function (merchantName) {
        var indexOfMerchantDiscount = discountsByMerchant.findIndex(function (element) {
            return element.merchant === merchantName;
        });

        return discountsByMerchant[indexOfMerchantDiscount].discount;
    }

}


function _calcDiscountOfMerchant(amount, discount){
    return amount - (amount - (amount*discount/100));
}