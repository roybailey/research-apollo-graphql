import { IAccountCreation, AccountType } from './accountStore'

// userId === User.name here and replaced with correct userId GUID at load time

const initialAccountData:IAccountCreation[] = [
    { userId: 'Anna', accountType: AccountType.CASH, number: '10000001', bankCode: '01-01-01' },
    { userId: 'Burt', accountType: AccountType.CASH, number: '20000002', bankCode: '02-02-02' },
    { userId: 'Burt', accountType: AccountType.INVESTMENT, number: '20000004', bankCode: '02-02-04' },
    { userId: 'Carl', accountType: AccountType.INVESTMENT, number: '30000003', bankCode: '03-03-03' },
]

export default initialAccountData

