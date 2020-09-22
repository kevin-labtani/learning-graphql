# Learning GraphQL

This is the repo for the fullstack app I coded while learning graphql along frontendmasters videos.

## Definition

A spec that describes a declarative query language that your clients can use to ask an API for the exact data they want. This is achieved by creating a strongly typed Schema for your API, ultimate flexibility in how your API can resolve data, and client queries validated against your Schema.

## Server Side

- Type Definitions
- Resolvers
- Query Definitions
- Mutation Definitions
- Composition
- Schema

## Client Side

- Query
- Mutations
- Fragments

### Schemas

Creating a Schema:

- Using Schema Definition Language (SDL)
- Programmatically Creating a Schema using language constructs

Using SDL, the basic parts:

- Types - a construct defining a shape with fields
- Fields - keys on a Type that have a name and a value type
- Scalars - primitive value type built into GraphQL
- Query - type that defines how clients can access data
- Mutation - type that defines how clients can modify or create data

### Query Types

Definition:

A Type on a Schema that defines operations clients can perform to access data that resembles the shape of the other Types in the Schema.

Creating Queries:

- Create Query Type in the Schema using SDL
- Add fields to the Query Type
- Create Resolvers that for the fields

### Resolvers

Definition:

Functions that are responsible for returning values for fields that exist on Types in a Schema. Resolvers execution is dependent on the incoming client Query.

Creating Resolvers:

- Resolver names must match the exact field name on your Schema’s Types
- Resolvers must return the value type declared for the matching field
- Resolvers can be async
- Can retrieve data from any source
