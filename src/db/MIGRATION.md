SCHEMA BASED MIGRATION

Approach 1: initial thought is using versioning.comparing DB version with our version number stored in localstorage. it was just slow and we kept forgetting.

Approach 2: 
> We will store the task schema in local storage. 
> when we change, we will compare with the local storage schema.
> If its not matching, we will run the migration

Cons: 
> Since we are using local storage, it will not work for cross-device sync ( assuming idb is actual backend )

Approach 3: 
> we are storing the schema as metadata in the idb ( in a separate table called settings )
> when we change the task schema here, we will compare the metadata of the idb and we will run migration if it doesnt match
