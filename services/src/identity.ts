import { v1 as uuid } from 'uuid'


// Generates test suite friendly UUID formated strings using namespace and number sequence
// allows for long lived UUID values from sequenced seed data
// e.g. instead of 13439db0-86ae-11e8-bcef-ef01b88a8680
// we might get    11111111-1111-1111-1111-namespace111
export default (namespace:string, sampling:number = -1) => {
    let identifier = 0
    return () => {
        if(sampling === -1 || identifier < sampling) {
            ++identifier
            return `00000000-0000-0000-0000-${namespace}` + identifier.toString().padStart(12 - namespace.length, '0')
        }
        return uuid()
    }
}
