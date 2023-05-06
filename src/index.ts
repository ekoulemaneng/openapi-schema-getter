import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { OpenAPIv30x, OpenAPIv31x } from 'openapi-objects-types'

const SpecificationNotProvided = new Error('specification object or file (json, yaml or yaml) is not provided')
const SpecificationFormatNotValid = new Error('specification must be an object or a path to a specification file')
const SpecificationFileNotValid = new Error('specification file must be a json, yaml or yaml file')
const DirnameNotProvided = new Error('dirname string is not provided')
const DirnameNotValid = new Error('dirname must be a string')

/**
 * Function that gets an input, parse it and build schema
 * @param spec Specification as an object or path to a specification file
 * @param dirname It must be 'dirname' and mandatory if spec is a path file
 * @returns OpenAPI schema object
 */
const specGetter = async (spec: OpenAPIv30x.OpenAPI | OpenAPIv31x.OpenAPI | string, dirname?: string) => {
    if (!spec) throw SpecificationNotProvided
    let schema: OpenAPIv31x.OpenAPI | OpenAPIv30x.OpenAPI
    if (!['string', 'object'].includes(typeof spec)) throw SpecificationFormatNotValid
    else if (typeof spec === 'object') schema = spec
    else {
        if (!dirname) throw DirnameNotProvided
        if (typeof dirname !== 'string') throw DirnameNotValid
        const filePath = path.resolve(dirname, spec)
        const data = await fs.promises.readFile(filePath, 'utf8')
        const ext = path.extname(filePath).toLowerCase()
        if (['.yaml', '.yml'].includes(ext)) schema = yaml.parse(data)
        else if (ext === '.json') schema = JSON.parse(data)
        else throw SpecificationFileNotValid
    }
    return schema
}

export = specGetter