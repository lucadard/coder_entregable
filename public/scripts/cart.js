//CARRITO
async function deleteProductFromCart(prod_id, user_id, removeAll = true) {
  const query = `
  mutation{
    removeOneProductFromCart(
      user_id:"${user_id}", 
      product_id:"${prod_id}", 
      removeAll:${removeAll}) 
      { id }
  }
  `
  const res = await fetch(`/graphql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  const data = await res.json()
  location.reload()
  return data
}

async function emptyCart(user_id) {
  const query = `
  mutation{
  removeAllProductsFromCart(user_id:"${user_id}"){ id }
  } 
  `
  const res = await fetch(`/graphql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  const data = await res.json()
  location.reload()
  return data
}
