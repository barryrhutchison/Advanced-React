import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";
import Head from "next/head";
import styled from 'styled-components';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`query
    {
        Product(where: {id: "60200d978937ab0e4885d58b"}) {
            name
            price
            description
            id
            photo {
                altText
                image {
                    publicUrlTransformed
                }
            }
       }
      }
`
export default function SingleProduct ({id}) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
    if(loading)return <p>Loading..</p>
    if(error) return <DisplayError error={error}/>
    const {Product} = data;
    return <ProductStyles>
                <div className="details">
                    <Head><title>Sick Fits | {Product.name}</title></Head>
                    <img src={Product.photo.image.publicUrlTransformed} alt={Product.photo.altText}/>
                    <h2>{Product.name}</h2>
                    <p>{Product.description}</p>
                </div>
           </ProductStyles>
}