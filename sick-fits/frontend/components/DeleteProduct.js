import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!){
            deleteProduct(id: $id) {
                id
                name
            }
    }
`

function update(cache, payload){
    console.log(payload)
    console.log('Running update functiona after delete')
    cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct( {id, children} ){
    const [deleteProduct, {loading, error}] = useMutation(
    DELETE_PRODUCT_MUTATION, {
        variables: { id },
        update
    })
    return(
        <button disabled={loading} type="button" onClick={(e) =>
                {
                    if(confirm("Are you sure you want to delete this item?")){
                        console.log('DELETE')
                        deleteProduct(id).catch(error => alert(error.message))
                    }
                }
            }>
            {children}
        </button>
    )
}