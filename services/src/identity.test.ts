import sequence from './identity'


describe('sequence generator', () => {

    it('should always create test friendly UUID formatted identifiers', () => {

        const sequencer = sequence('TEST')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000001')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000002')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000003')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000004')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000005')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000006')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000007')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000008')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000009')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000010')

    });

    it('should create limited test friendly UUID formatted identifiers', () => {

        const sequencer = sequence('TEST', 3)
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000001')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000002')
        expect(sequencer()).toEqual('00000000-0000-0000-0000-TEST00000003')
        expect(sequencer()).not.toEqual('00000000-0000-0000-0000-TEST00000004')

    });

    it('should not create test friendly UUID formatted identifiers', () => {

        const sequencer = sequence('TEST', 0)
        expect(sequencer()).not.toEqual('00000000-0000-0000-0000-TEST00000001')

    });

});
