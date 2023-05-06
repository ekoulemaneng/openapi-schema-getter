import assert from 'assert'
import specGetter from '../src'
import * as schemas from './specs/objects'

context('With specification as object or file path', () => {
    describe('specGetter', () => {
        describe('throws an error when', () => {
            it('specification argument is not provided', async () => {
                // Setup
                const expected = new Error('specification object or file (json, yaml or yaml) is not provided')
                // Exercise and verify
                await assert.rejects(async () => await specGetter(), expected)
            })
            it('specification argument is neither a string nor an object', async () => {
                // Setup
                const schema = [true, 10][Math.floor(Math.random() * 2)]
                const expected = new Error('specification must be an object or a path to a specification file')
                // Exercise and verify
                await assert.rejects(async () => await specGetter(schema), expected)
            })
            it('dirname argument is not a string', async () => {
                // Setup
                const schema = './specs/json/openapi1.json'
                const dirname = [true, 1, {}, []][Math.floor(Math.random() * 4)]
                const expected = new Error('dirname must be a string')
                // Exercise and verify
                await assert.rejects(async () => await specGetter(schema, dirname), expected)
            })
            it('specification argument file is not a json, yaml or yml file', async () => {
                // Setup
                const schema = './specs/bad.txt'
                const expected = new Error('specification file must be a json, yaml or yaml file')
                // Exercise and verify
                await assert.rejects(async () => await specGetter(schema, __dirname), expected)
            })
        })
        describe('returns', () => {
            for(let i = 1; i <= 7; i++) {
                describe('an object', () => {
                    context(`for specification ${i}`, () => {
                        const dirname = __dirname
                        it('if the specification is an object', async () => {
                            // Setup
                            const schema = schemas[`schema${i}`]
                            const expected = 'object'
                            // Exercise
                            const actual = typeof await specGetter(schema)
                            // Verify
                            assert.strictEqual(actual, expected)
                        })
                        it('if the specification is a json file', async () => {
                            // Setup
                            const schema = `./specs/json/openapi${i}.json`
                            const expected = 'object'
                            // Exercise
                            const actual = typeof await specGetter(schema, dirname)
                            // Verify
                            assert.strictEqual(actual, expected)
                        })
                        it('if the specification is a yaml file', async () => {
                            // Setup
                            const schema = `./specs/yaml/openapi${i}.yaml`
                            const expected = 'object'
                            // Exercise
                            const actual = typeof await specGetter(schema, dirname)
                            // Verify
                            assert.strictEqual(actual, expected)
                        })
                    })
                })
            }
        })
    })
})