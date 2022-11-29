async function deleteProduct(id) {
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  location.reload()
  return data
}

async function addProductToCart(id, userId) {
  if (userId === '') return location.assign('/auth/login')
  const res = await fetch(`/api/carts/${userId}/products/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  location.assign('/cart')
  return data
}
