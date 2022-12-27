const productUpdateForm = document.getElementById('productUpdateForm')
const errorMsg = document.getElementById('errorMsg')
const id = location.search.slice(4)

productUpdateForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const form = {}
  const inputArray = [...productUpdateForm.querySelectorAll('input')]
  inputArray.map((input) => {
    form[input.name] = input.value
  })
  updateProduct(id, form, ({ error, data }) => {
    if (error) {
      productUpdateForm.reset()
      errorMsg.classList.add('show')
    } 
    else location.reload()
  })
})

async function updateProduct(id, data, callback) {
  const query = `
  mutation{
    updateProduct(id:"${id}", data: { 
      code:"${data.code}"
      name:"${data.name}"
      description:"${data.description || 'no description'}"
      photo_url:"${data.photo_url || 'no_photo'}"
      price:${data.price}
      stock:${data.stock} }){ id }
  }
  `
  const post = await fetch(`/graphql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  const res = await post.json()
  return callback(res)
}
