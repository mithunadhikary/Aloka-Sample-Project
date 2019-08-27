const app = document.getElementById('root')

const header = document.createElement('div')
header.setAttribute('class', 'header')
app.appendChild(header)

const company_h1 = document.createElement('h1')
header.appendChild(company_h1)
company_h1.innerHTML = 'Beans Love Beers'

const header_ul = document.createElement('ul')
header.appendChild(header_ul)
var home = 'home'
var home2 = 'home2'
header_ul.innerHTML = '<li><a class="active" onclick="page_show('+home+')" href="#">Home</li><li><a onclick="page_show('+home2+')" href="#">Favourites</li>'

const searchBar = document.createElement('div')
searchBar.setAttribute('class', 'search')
app.appendChild(searchBar)

searchBar.innerHTML = '<form><input class="input-text" type="text" name="searchText" placeholder="Search for beer.."><input class="submit" type="submit" name="submit" value="Search"></form>'

const detailsData = document.createElement('div')
detailsData.setAttribute('class','details-data')
detailsData.setAttribute('id','details-data')
app.appendChild(detailsData)

global_page = 'home'

var detailsDataId = document.getElementById("details-data");
detailsDataId.classList.add(global_page);


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
      favouritesTag.setAttribute('id', 'favourites-'+beer.id)      
     // favouritesTag.setAttribute('onclick',`${fav_data(beer.id)}`)
      favouritesTag.setAttribute('onclick','fav_data('+beer.id+')')

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

function page_show(page){
  document.getElementById('details-data').innerHTML = ""
  detailsDataId.classList.remove('home');
  detailsDataId.classList.remove('home2');
  if(page == home){
    global_page = home
    getNewData('1')
  }else{
    global_page = home2
    favourites_page_data(news_array)
  } 

  detailsDataId.classList.add(global_page);
}

function favourites_page_data(news_array){

  const fetchPromise = fetch("https://api.punkapi.com/v2/beers?ids="+news_array);
    fetchPromise.then(response => {
      return response.json();
    }).then(people => {
      document.getElementById('details-data').innerHTML = ""
      people.forEach(beer => {
        render_data(beer)

      });
    });

}

var getNewData= pageId => {
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

fav_array = [];
news_array = [];
const fav_data= id => {

  var element = document.getElementById("favourites-"+id);
  element.classList.add("active");

  var index = fav_array.indexOf(id);
  if (index > -1) {
    fav_array.splice(index, 1);
  }else{
    fav_array.push(id)
  }
    
  news_array = fav_array.join("|") 
  if(global_page == home2){  
      favourites_page_data(news_array)
  } 
};

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