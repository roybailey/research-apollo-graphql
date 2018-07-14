import {AccountType, createAccountStore, IAccountCreation} from './accountStore';
import initialAccountData from './accountStore.data'


describe('account store', () => {

    const accountStore = createAccountStore();

    const testData: IAccountCreation[] = initialAccountData;

    const initialCount = accountStore.findAll({}).length

    it('should create test Accounts', () => {
        const newAccounts = accountStore.createAccounts(testData)
        expect(newAccounts).toMatchObject(testData);
        const sameUser = accountStore.findOne({ id: newAccounts[0].id })
        expect(newAccounts[0]).toMatchObject(sameUser);
    });

    it('should update the account balance', () => {
        const testUser = accountStore.findOne({ userId: testData[0].userId})
        const updatedUser = accountStore.updateBalance(testUser.userId, testUser.number, testUser.bankCode, 10.75)
        expect(updatedUser.balance).toEqual(10.75)
    });

    const finalCount = accountStore.findAll({}).length
    expect(initialCount).toEqual(finalCount)
});
