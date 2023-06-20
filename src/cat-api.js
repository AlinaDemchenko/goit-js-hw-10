const key = "api_key=live_0auEPiPCRbANysEnQHC5ilZ8qXPEBf3Lbf3YA3ICKDZZpEuZs2gKZJn5Y0YifgmE"

function fetchBreeds(){
   return fetch(`https://api.thecatapi.com/v1/breeds?${key}`).then(resp => {
        if (!resp.ok) {
            throw new Error()}
return resp.json()
    })}

function fetchCatByBreed(breedId){
    return fetch(`https://api.thecatapi.com/v1/images/search?${key}&breed_ids=${breedId}`).then(resp => {
        if (!resp.ok) {
            throw new Error()}
return resp.json()
    })
}

export {fetchBreeds, fetchCatByBreed}