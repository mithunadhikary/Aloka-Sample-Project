const app = document.getElementById('root')

const header = document.createElement('div')
header.setAttribute('class', 'header')
app.appendChild(header)

const company_h1 = document.createElement('h1')
header.appendChild(company_h1)
company_h1.innerHTML = 'Beans Love Beers'

const header_ul = document.createElement('ul')
header.appendChild(header_ul)
header_ul.innerHTML = '<li><a class="active" href="#">Home</li><li><a href="#">Favourites</li>'

const searchBar = document.createElement('div')
searchBar.setAttribute('class', 'search')
app.appendChild(searchBar)

searchBar.innerHTML = '<form><input class="input-text" type="text" name="searchText" placeholder="Search for beer.."><input class="submit" type="submit" name="submit" value="Search"></form>'

const detailsData = document.createElement('div')
detailsData.setAttribute('class','details-data')
detailsData.setAttribute('id','details-data')
app.appendChild(detailsData)


var request = new XMLHttpRequest()
request.open('GET', 'https://api.punkapi.com/v2/beers?page=1&per_page=6', true)

request.onload = function() {
  show_data(this.response);
}

function show_data(response){

  var data = JSON.parse(response)
  if(request.status = 200){

    data.forEach(beer => {
      render_data(beer); 
    })

    const paginationBar = document.createElement('div')
    paginationBar.setAttribute('class', 'pagination')
    app.appendChild(paginationBar)
   
    paginationHtml = '<ul>';
    for (i = 1; i < 10; i++) {
      paginationHtml +='<li><a onclick="paginationId('+i+')" href="#">'+i+'</a></li>'
    }
    paginationHtml +='</ul>'
    paginationBar.innerHTML = paginationHtml

  }else{

    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Dear, it's not working!`
    app.appendChild(errorMessage)

  }

}

function render_data(beer){

      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const cardDeatils = document.createElement('div')
      cardDeatils.setAttribute('class', 'card-details')

      const image = document.createElement('img')
      image.setAttribute('src',beer.image_url)

      const favouritesTag = document.createElement('div')
      favouritesTag.setAttribute('class', 'favourites')

      const favouritesImg = document.createElement('img')
      favouritesImg.setAttribute('src','file:///C:/Users/12178/Desktop/punkapi/images/star.png')

      const h2 = document.createElement('h2')
      h2.textContent = beer.name

      const p = document.createElement('p')
      beer.description = beer.description.substring(0, 100)
      p.textContent = `${beer.description}...`

      
      detailsData.appendChild(card)
      card.appendChild(favouritesTag)
      favouritesTag.appendChild(favouritesImg)
      card.appendChild(image)
      card.appendChild(cardDeatils)
      cardDeatils.appendChild(h2)
      cardDeatils.appendChild(p)

}

request.send()

function paginationId(pageId) { 
   getNewData(pageId);
}

function getNewData(pageId){
  const fetchPromise = fetch("https://api.punkapi.com/v2/beers?page="+pageId+"&per_page=6");
  fetchPromise.then(response => {
    return response.json();
  }).then(people => {
    document.getElementById('details-data').innerHTML = ""
    people.forEach(beer => {
      render_data(beer)

    });
  });
}

// setTimeout(function(){ 
 
//  const fetchPromise = fetch("https://api.punkapi.com/v2/beers?page=2&per_page=6");
//   fetchPromise.then(response => {
//     return response.json();
//   }).then(people => {
//     document.getElementById('details-data').innerHTML = ""
//     people.forEach(beer => {
//       render_data(beer)

//     });
//   });


// }, 3000);