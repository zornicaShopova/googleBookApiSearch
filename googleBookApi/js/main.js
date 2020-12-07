var item, tile, author, publishedData, bookLink, bookImg;
var outputList = document.getElementById("list-output");
var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
var apiKey = 'AIzaSyCAhvcMA2uV2q5Id9NN8Rx_WJyjMKF9NVc';
var placeHldr = '<img src="https://via.placeholder.com/150">';
var searchData;

$("#search").click(function() {
    outputList.innerHTML = "";
    searchData = $("#search-box").val();

    if (searchData === "" || searchData === null) {
        displayError();
    } else {
        $.ajax({

            url: bookUrl + searchData + ':keyes&key=' + apiKey,
            dataType: "json",
            success: function(data) {
                console.log(data);
                if (data.totalItems === 0) {
                    alert("The result doesn't exist!");
                } else {
                    displayResults(data);
                }
            },
            error: function() {
                alert("Something went wrong...!");
            }
        });
    }
    $("#search-box").val("");
});

function displayResults(data) {
    //take two element and display them in one row
    for (var i = 0; i < data.items.length; i += 2) {
        item = data.items[i];

        title1 = item.volumeInfo.title;
        author1 = item.volumeInfo.authors;
        publishedDate1 = item.volumeInfo.publishedDate;
        bookLink1 = item.volumeInfo.previewLink;
        bookIsbn1 = item.volumeInfo.industryIdentifiers[0].identifier;
        pageCount1 = item.volumeInfo.pageCount;
        categories1 = item.volumeInfo.categories;
        language1 = item.volumeInfo.language;
        bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

        item2 = data.items[i + 1];
        title2 = item2.volumeInfo.title;
        author2 = item2.volumeInfo.authors;
        publishedDate2 = item2.volumeInfo.publishedDate;
        bookLink2 = item2.volumeInfo.previewLink;
        pageCount2 = item2.volumeInfo.pageCount;
        categories2 = item2.volumeInfo.categories;
        bookIsbn2 = item2.volumeInfo.industryIdentifiers[0].identifier;
        language2 = item2.volumeInfo.language;
        bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;



        outputList.innerHTML += '<div class ="row mt-4">' +
            formatOutput(bookImg1, title1, author1, publishedDate1, bookLink1, pageCount1, categories1, language1) +
            formatOutput(bookImg2, title2, author2, publishedDate2, bookLink2, pageCount2, categories2, language2)
        '</div>';
        console.log(outputList);

    }
}

function formatOutput(bookImg, title, author, publishedDate, bookLink, pageCount, categories, language) {

    var htmlCard = `<div class="col-lg-6">
       <div class="card" style="">
         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${bookImg}" class="card-img" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">Author: ${author}</p>
               <p class="card-text">Publisher: ${publishedDate}</p>
               <p class="card-text">Page Count: ${pageCount}</p>
               <p class="card-text">Categorie: ${categories}</p>
               <p class="card-text">Language: ${language}</p>
               <a target="_blank" href="${bookLink}" class="btn btn-secondary">Read More</a>
             </div> 
           </div>
         </div>
       </div>
     </div>`
    return htmlCard;

}

function displayError() {
    alert("Search bar can't be empty! Please write something!");
}



// Resized the card-body with the slider  
// var slider = document.getElementById("myRange");
// var attrValue = slider.getAttributeNode("value").value;
// if (attrValue = 100) {
//     $('htmlCard').animate({ 'max-width': '100%' });
// }