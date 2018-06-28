import {IUser, UserRole, createUserStore} from './userStore';


describe('user store', () => {

    const userStore = createUserStore();

    const testData: IUser[] = [
        { name: 'test1', email: 'test1@one.com', roles: [UserRole.CLIENT] },
        { name: 'test2', email: 'test2@two.com', roles: [UserRole.ADVISER] },
        { name: 'test3', email: 'test3@three.com', roles: [UserRole.ADVISER,UserRole.CLIENT] }
    ];

    const initialCount = userStore.findAll().length

    it('should create test users', () => {
        const newUsers = userStore.insert(testData)
        expect(newUsers).toMatchObject(testData);
        const sameUser = userStore.findOne({ id: newUsers[0].id })
        expect(newUsers[0]).toMatchObject(sameUser);
    });

    it('should update the user role', () => {
        const testUser = userStore.findOne({ email: testData[0].email })
        expect(testUser.roles).toEqual([UserRole.CLIENT])
        testUser.roles.push(UserRole.ADVISER)
        const updatedUser = userStore.update(testUser)
        expect(updatedUser.roles).toEqual([UserRole.CLIENT, UserRole.ADVISER])
    });

    it('should delete the user', () => {
        testData.map(user => {
            const testUser = userStore.findOne({ email: user.email })
            userStore.remove(testUser)
        })
    });

    const finalCount = userStore.findAll().length
    expect(initialCount).toEqual(finalCount)
});
