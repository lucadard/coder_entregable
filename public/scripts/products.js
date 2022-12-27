async function deleteProduct(id) {
  const query = `
  mutation{
    removeProduct(id: "${id}")
    { id }
  }`
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

async function addProductToCart(id_prod, id_user) {
  const query = `
  mutation{
    addProductToCart(amount: 1, 
      product_id: "${id_prod}", 
      user_id: "${id_user}")
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
  location.assign('/cart')
  return data
}
