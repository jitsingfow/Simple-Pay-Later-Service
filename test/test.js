const expect = require('chai').expect;

const payLater = require('../utils/PayLater');
const app = require('../app');


describe('Add user', function(){
    it('Should add a user ', function(){
        var user = payLater.addUser('user1', 'u1@users.com', 300);
        expect(user).to.equal({status : true, msg: 'User created', user: {userName: 'user1', creditLimit: 300}});         
    });
    it('Should not add a user - user already exit', function(){
        var user = payLater.addUser('user1', 'u1@users.com', 300);
        expect(user).to.equal({status : false, msg: 'User already exist'});                  
    });
    it('Should add a user ', function(){
        var user = payLater.addUser('user2', 'u2@users.com', 400);
        expect(user).to.equal({status : true, msg: 'User created', user: {userName: 'user2', creditLimit: 400}});         
    });
    it('Should add a user ', function(){
        var user = payLater.addUser('user3', 'u1@users.com', 500);
        expect(user).to.equal({status : true, msg: 'User created', user: {userName: 'user3', creditLimit: 500}});         
    });
});

describe('Add Merchant', function(){
    it('Should add a merchant ', function(){
        var merchant = payLater.addMerchant('m1', 'm1@merchants.com', 0.5);         
        expect(merchant).to.equal({status : true, msg: 'Merchant created', merchant: {merchantName : 'm1', discount: 0.5}});         
    });
    it('Should not add a merchant - merchant already exist', function(){
        var merchant = payLater.addMerchant('m1', 'm1@merchants.com', 0.5);         
        expect(merchant).to.equal({status : false, msg: 'Merchant already'});         
    });
    it('Should add a merchant ', function(){
        var merchant = payLater.addMerchant('m2', 'm2@merchants.com', 1.5);         
        expect(merchant).to.equal({status : true, msg: 'Merchant created', merchant: {merchantName : 'm2', discount: 1.5}});         
    });
    it('Should add a merchant ', function(){
        var merchant = payLater.addMerchant('m3', 'm3@merchants.com', 1.25);         
        expect(merchant).to.equal({status : true, msg: 'Merchant created', merchant: {merchantName : 'm3', discount: 1.5}});         
    });
});

describe('Set Interest', function(){
    it('Should set interest rate ', function(){
        var interestRate = payLater.setInterest(1.25);
        expect(interestRate).to.equal(1.25);         
    });
});

describe('Transaction by user to merchant', function(){
    it('Transaction should fail from user2 to m1 with less credit limit', function(){
        var transaction = payLater.userTxn('user2', 'm1', 500);
        expect(transaction).to.equal({status : false, msg: 'rejected!', reason: 'credit limit'});                  
    });
    it('Transaction from user1 to m2 with credit limit should be succesfull', function(){
        var transaction = payLater.userTxn('user1', 'm2', 300);
        expect(transaction).to.equal({status : true, msg: 'success!'});                  
    });
    it('Transaction should fail from user1 to m3 with less credit limit', function(){
        var transaction = payLater.userTxn('user1', 'm3', 10);
        expect(transaction).to.equal({status : false, msg: 'rejected!', reason: 'credit limit'});                  
    });
    it('Transaction should fail from user1 to m1 where user doesnot exist', function(){
        var transaction = payLater.userTxn('user15', 'm1', 500);
        expect(transaction).to.equal({status : false, msg: 'rejected!', reason: 'user doesnot exist'});                  
    });
    it('Transaction should fail from user1 to m15 where mercent m15 doesnot exist', function(){
        var transaction = payLater.userTxn('user1', 'm15', 500);
        expect(transaction).to.equal({status : false, msg: 'rejected!', reason: 'mercent doesnot exist'});                  
    });
});

describe('Report users at credit limit', function(){
    it('Should list the user who have reached max credit limit ', function(){
        var users = payLater.reportUserCreditLimit();
        expect(users).to.equal([user1]);         
    });
});

describe('Transaction by user to merchant', function(){
    it('Transaction from user3 to m3 with credit limit should be succesfull', function(){
        var transaction = payLater.userTxn('user3', 'm3', 200);
        expect(transaction).to.equal({status : true, msg: 'success!'});                  
    });
    it('Transaction from user3 to m3 with credit limit should be succesfull', function(){
        var transaction = payLater.userTxn('user3', 'm3', 300);
        expect(transaction).to.equal({status : true, msg: 'success!'});                  
    });
});

describe('Report dues of a user', function(){
    it('Should return dues of user1 ', function(){
        var dues = payLater.reportUserDues('user1');
        expect(dues).to.equal(300);         
    });
});

describe('Report users at credit limit', function(){
    it('Should list the user who have reached max credit limit ', function(){
        var users = payLater.reportUserCreditLimit();
        expect(users).to.equal([user1]);         
    });
});

describe('Report discount Merchant', function(){
    it('Should return the discount of merchant m3', function(){
        var merchantDiscount = payLater.reportMerchantDiscount('m3');   
        expect(merchantDiscount).to.equal(6.25);      
    });
});

describe('Payback by user', function(){
    it('Should return the remaining due amount', function(){
        var result = payLater.paybackUser('user3', 400);         
        expect(result).to.equal({user: 'user3', dues : 100});
    });
});

describe('Report total dues', function(){
    it('Should return all users with dues along with due amount', function(){
        var usersAndDues = payLater.reportTotalDues();
        expect(usersAndDues).to.equal({dues:[{user: 'user1', dues: 300}, {user: 'user3', dues: 100}], total : 400});         
    });
});

describe('Update merchant discount ', function(){
    it('Should update discount by merchant', function(){
        var updatedDiscount = payLater.updateMerchantDiscount('m3', 2.0);         
        expect(updatedDiscount).to.equal({merchant: 'user3', discount : 2.0});
    });
});