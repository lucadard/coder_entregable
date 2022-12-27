const productForm = document.getElementById('productForm')
const errorMsg = document.getElementById('errorMsg')

productForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const form = {}
  const inputArray = [...productForm.querySelectorAll('input')]
  inputArray.map((input) => {
    form[input.name] = input.value
  })
  sendProduct(form, ({ error, data }) => {
    console.log(data)
    if (error) {
      productForm.reset()
      errorMsg.classList.add('show')
    }
    else location.assign('/')
  })
})

async function sendProduct(product, callback) {
  const query = `
  mutation {
    createProduct(data: {
      code:"${product.code}"
      name:"${product.name}"
      description:"${product.description || 'no description'}"
      photo_url:"${product.photo_url || 'no_photo'}"
      price:${product.price}
      stock:${product.stock} })
    { id name description }
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
  return callback(data)
}
