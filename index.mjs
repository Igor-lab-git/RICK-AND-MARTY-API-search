
const grid = document.querySelector('#grid');
const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const currentPage = document.querySelector('#currentPage');
const predPage = document.querySelector('#predPage');

let page = 2
let totalPage = 0

class User {
    constructor(id, image, name, gender, location
    ) {
        this.id = id
        this.image = image
        this.name = name
        this.gender = gender
        this.location = location

    }
    render() {
        const card = document.createElement('div');
        card.classList.add('user');
            card.innerHTML = `
            <h3>${this.name}</h3>
            <img class="img" src="${this.image}" alt="${this.id}">
            <p>${this.gender}</p>
            <p>${this.location.name}</p>
        `
        grid.append(card)
    }

}

const addReqUsers = async (page) => {
    try {
        const response = await  fetch(`https://rickandmortyapi.com/api/character/?page=1${page}`, {
            method: 'GET'
        }).then(res => res.json().then(res => res))
        //console.log(response.info)
        response.results.map(user => new User(user.id, user.image, user.name, user.gender, user.location).render())

        currentPage.textContent = page;
        totalPage = response.info.pages
        predPage.textContent = totalPage

    } catch (e) {
        alert(e)
    }
}



const clearGrid = () => {
    while (grid.children[1]) {
        grid.replaceChildren()
    }
}
minusBtn.addEventListener('click', async () => {
    if(page <= 1) return
    else page -=1;

    clearGrid();
   await addReqUsers(page)
})

plusBtn.addEventListener('click', async () => {
    if(page >= totalPage) return
    else page +=1;

    clearGrid();
    await addReqUsers(page)
})








