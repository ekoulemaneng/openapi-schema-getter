# Openapi Schema Retriever

Typescript package to get an OpenApi-specification-compliant dereferenced object from an object or an json, yaml or yml file path string. For 3.1.x and 3.0.x OpenAPI versions.

## Installation
```typescript
npm install openapi-schema-retriever 
```
or
```typescript
yarn add openapi-schema-retriever
```

## Usage
```typescript
import schemaRetriever from 'openapi-schema-retriever'

let schema

const main = async () => {

    /* First, by specBuilder, get, check and parse the openapi specification that can be an object or an file path string.
     * If the specification input is a file path string, a second argument standing for the current working directory is mandatory.
     * We recommend to use '__dirname' as second argument.
     * The file must be either a json, a yaml or a yml file. 
     * specBuilder returns an object in accordance with OpenAPI scpecification.
    */
    schema = await schemaRetriever('./openapi.yaml', __dirname)
}

main()
```

## License
This package is licensed under the [MIT License](https://opensource.org/licenses/mit).

## Contact
If you have any questions or issues, please contact the package maintainer at ekoulemaneng@gmail.com.
