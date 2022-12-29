const APIURL =' https://api.github.com/users/'

// getUser('bradtraversy')
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
async function getUser(username){
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    try{
    const {data} = await axios(APIURL + username)
        // console.log(data)
        createUserCard(data)
        getrepos(username)
    }catch(err){
        // console.log(err)
        if(err.response.status == 404){
        createErrorCard('No profile with this username')
    }
    }
}

async function getrepos(username){
    try{
        const {data} = await axios(APIURL + username + '/repos?sort=created');
            // console.log(data[6].html_url)
            addReposTOCard(data)
        }catch(err){
            // console.log(err)
         createErrorCard('Problem fetching repo')
      
        }
}

function createUserCard(user){
const cardHTML =`    <div class="card">
<img src="${user.avatar_url}" alt="${user.name}" class="avatar">
<div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
    <ul>
        <li>${user.followers}<strong>Followers</strong></li>
        <li>${user.following}<strong>Following</strong></li>
        <li>${user.public_repos}<strong>Repo</strong></li>
    </ul>
    <div id="repos"> </div>
</div>
</div>`
main.innerHTML =cardHTML
}


function createErrorCard(msg){
const cardHTML= `
<div class="card">
<h1>${msg}</h1>
</div>
`
main.innerHTML = cardHTML
}

function addReposTOCard(repos){
    const reposEI =document.getElementById('repos') 
    repos.slice(0,5)
    .forEach(repo => {
        const repoEI = document.createElement('a')
        repoEI.classList.add('repo')
        repoEI.href = repo.html_url
        repoEI.target = '_blank'
        repoEI.innerText =  repo.name
        reposEI.appendChild(repoEI)
    });
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const user = search.value;
    if(user){
        getUser(user)
        search.value='';
    }
})