var div1 = create('div', '', 'main container', 'main1', '')
const url = new URL(window.location.href);
var query = localStorage.getItem('query')
var searchvalue = ""
var btn = document.getElementById('button')
btn.addEventListener('click', function(){
    searchuser(`"${searchvalue}"`)
    localStorage.setItem('query',searchvalue);
})  

const inputField = document.getElementById('input');

if(query){
    searchvalue = query;
    inputField.value = query
    searchuser(query);
    btn.removeAttribute("disabled");
} else {
    searchvalue = inputField.value
}

inputField.addEventListener("input", () => {
    searchvalue = inputField.value.trim()
    if (inputField.value.trim() !== "") {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", true);
    }
});

inputField.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && searchvalue.trim()) {
        localStorage.setItem('query',searchvalue);
        searchuser(`"${searchvalue}"`)
    }
});


var searchcontainer = create('div', '', 'searchcontainer', 'searchcontainer', '')
var displaycontainer = create('div', '', 'displaycontainer', 'displaycontainer', '')

function searchuser(key){

    if(displaycontainer) document.getElementById('displaycontainer').innerHTML = ""
    if(searchcontainer) document.getElementById('searchcontainer').innerHTML = ""

    if(key!==''){
    fetch(`https://api.github.com/search/users?q=${key}&client_id=${window.config.CLIENT_ID}&client_secret=${window.config.CLIENT_SECRET}`)
    .then((res)=>{
        return res.json()
    }).then((data)=>{
        let search = create('div','','row','result-row','')
        data.items.map((ele)=>{
            let searchcard = create('div','','usercol col-sm-12 col-md-6 col-lg-4',`col-${ele.id}`,'')
            let img=create('img', '', 'Avatar Tag', `img-${ele.id}`, `display("${ele.login}")`)
            img.setAttribute('src', ele.avatar_url)
            let name=create('h2', ele.login, 'name', `name-${ele.id}`, `display("${ele.login}")`)
            searchcard.append(img,name)
            search.append(searchcard)
        })
        searchcontainer.append(search)
    }).catch((e) => {
        console.error(e);
    })
}
}


function display(value) {

    document.getElementById('searchcontainer').innerHTML = ""
    document.getElementById('displaycontainer').innerHTML = ""

    fetch(`https://api.github.com/users/${value}?client_id=${window.config.CLIENT_ID}&client_secret=${window.config.CLIENT_SECRET}`)
    .then((response) => {
        return response.json()
    }).then((result) => {
        var divrow = create('div', '', 'row', 'divrow', '')
        var div2 = create('div', '', 'col-md-5 col-sm-12', 'div2', '')
        var img = create('img', '', 'Avatar', 'img', '')
        img.setAttribute('src', result.avatar_url)
        var repo = create('div', 'Repositories <i class="fa fa-angle-double-right" aria-hidden="true"></i>', 'down-icon', 'repo', '')
        var div3 = create('div', '', 'col-md-7 col-sm-12', 'div3', '')
        var span1 = create('span', '', 'span1', 'span1', '')
        div3.append(span1)
        var name = create('h3', `${result.name || ''}<br>(${result.login})`, 'name', 'name', '')
        var follower = create('h4', `Followers : ${result.followers} <i class="fa fa-angle-double-right" aria-hidden="true"></i>`, 'down-icon', 'follower', '')
        var following = create('h4', `Following : ${result.following} <i class="fa fa-angle-double-right" aria-hidden="true"></i>`, 'down-icon', 'following', '')

        var url = create('h5', `<a href=${result.html_url} target="_blank">View site..</a>`, 'url', 'url', '')
        div3.append(url)
        if (result.location) {
            var loc = create('h5', `<i class="fa fa-map-marker" aria-hidden="true"></i> ${result.location}`, 'loc', 'loc', '')
            div3.append(loc)
        }
        if (result.blog) {
            var blog = create('h5', `<a href=${
                result.blog
            } target="_blank"><i class="fa fa-link" aria-hidden="true"></i> ${result.blog}</a>`, 'blog', 'blog', '')
            div3.append(blog)
        }
        if (result.twitter_username ) {
            var twitter = create('h5', `<a href='https://twitter.com/${result.twitter_username}' target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i> ${
                result.twitter_username
            }</a>`, 'twitter', 'twitter', '')
            div3.append(twitter)
        }


        span1.append(follower, following)
        div2.append(img, name, repo)
        divrow.append(div2, div3)
        displaycontainer.append(divrow)

        document.getElementById('follower').addEventListener('click', showPeople(`${
            result.followers_url
        }?per_page=100`, 'Followers'))

        document.getElementById('following').addEventListener('click', showPeople(`${
            result.url
        }/following?per_page=100`, 'Followings'))

        document.getElementById('repo').addEventListener('click', show(`${
            result.repos_url
        }?per_page=100` ))


        var divf2 = create('div', '', 'divf2', 'divf2', '')

        function showPeople(api, text){
            return function () {
                document.getElementById('divf2').innerHTML = ""
                fetch(api).then((get) => {
                    return get.json()
                }).then((res) => {
                    var title = create('div', text, '','div1text',)
                    var divf1 = create('div', '', 'row', '', '')
                    res.map((ele)=>{
                        let searchcard = create('div','','usercol col-sm-12 col-md-6 col-lg-4',`col-${ele.id}`,'')
                        let img=create('img', '', 'Avatar Tag', `img-${ele.id}`, `display("${ele.login}")`)
                        img.setAttribute('src', ele.avatar_url)
                        let name=create('h2', ele.login, 'name', `name-${ele.id}`, `display("${ele.login}")`)
                        searchcard.append(img,name)
                        divf1.append(searchcard)
                    })
                    divf2.append(title, divf1)
                }).catch((e) => {
                    console.error(e);
                })
            }
        }

        function show(api) {
            return function () {
                document.getElementById('divf2').innerHTML = ""
                fetch(api).then((get) => {
                    return get.json()
                }).then((res) => {
                    var divf1 = create('div', `Repositories<br>Total No. of public repos :${result.public_repos}`, 'container div1', 'div1text', '')
                    res.forEach(ele => {
                        i = 0;
                        var row = create('div', '', 'row', 'row1', '')
                        var col1 = create('div', '', 'col-md-4 col-sm-12', 'col1', '')
                        if (ele.avatar_url) {
                            var img = create('img', '', 'imgf Tag', `img${i}`, '')
                            img.setAttribute('src', ele.avatar_url)
                            img.setAttribute('onclick', `display("${ele.login}")`)
                            col1.append(img)
                        }
                        if (ele.name) {
                            var name = create('h2', `<a href=${
                                ele.html_url
                            } target="_blank">${
                                ele.name
                            }</a><br>`, 'reponame', '', '')
                            col1.append(name)
                        }
                        if (ele.description) {
                            var des = create('p', `${
                                ele.description
                            }`, 'des', '', '')
                            col1.append(des)
                        }

                        var col2 = create('div', '', 'col-md-8 col-sm-12', 'col2', '')
                        if (ele.login) {
                            var span1 = create('div', `${
                                ele.login
                            }`, 'spanf', `span${i}`, '')
                            col2.append(span1)
                            var span2 = create('div', `<a href=${
                                ele.html_url
                            } target="_blank">View site.. </a>`, 'spanf2', `spanf${i}`, '')
                            col2.append(span2)
                        }
                        if (ele.created_at) {
                            var date = create('p', 'created at <br>' + `${
                                ele.created_at
                            }`.split('').slice(0, 10).join('').split('-').reverse().join('-'), 'date', 'date', '')
                            col2.append(date)
                        }
                        row.append(col1, col2)
                        divf1.append(row)
                        i ++
                    });
                    divf2.append(divf1)
                }).catch((e) => {
                    console.error(e);
                })
            }
        }

        displaycontainer.append(divf2)
        searchvalue = ""

    }).catch((e) => {
        console.error(e);
    })
}

div1.append(searchcontainer,displaycontainer)
document.getElementsByClassName('column-2')[0].append(div1)

function create(tagname, text = '', classname = '', id = '', click = '') {
    let tag = document.createElement(tagname);
    tag.setAttribute('class', classname);
    tag.setAttribute('id', id);
    tag.setAttribute('onclick', click);
    tag.innerHTML = text;
    return tag;
}