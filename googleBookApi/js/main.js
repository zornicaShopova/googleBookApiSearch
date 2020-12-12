var item, tile, author, publishedData, bookLink, bookImg;
var outputList = document.getElementById("list-output");
var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
var apiKey = 'AIzaSyCAhvcMA2uV2q5Id9NN8Rx_WJyjMKF9NVc';
var placeHldr = '<img src="https://via.placeholder.com/150">';
var searchData;

// display book data from api
$(document).ready(function() {
    $.ajax({
        url: bookUrl + "" + ':keyes&key=' + apiKey,
        dataType: "json",
        success: function(data) {
            displayResults(data);
        },
        error: function() {
            alert("Something went wrong...!");
        }
    });

});
// ================= 

// search button 
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
                    $(".cardContainer").css("max-width", "100%");
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
// =================================== 

// LANGUEAGE OR YEAR button function
$("#year").click(function() {
    outputList.innerHTML = "";
    var year = $("#year").val();

    $.ajax({
        url: bookUrl + searchData + ':keyes&key=' + apiKey,
        dataType: "json",
        success: function(data) {
            if (year === "1993") {
                displayResults(data);
                console.log("the year is " + year);
                //it's getting the type not the specific date 
            }
        },
        error: function() {
            alert("Something went wrong...!");
        }
    });
    $("#year").val("");
});

$("#lang").click(function() {
    outputList.innerHTML = "";
    var lang = $("#lang").val();

    $.ajax({
        url: bookUrl + searchData + ':keyes&key=' + apiKey,
        dataType: "json",
        success: function(data) {
            if (lang == "en") {
                displayResults(data);
                console.log("the language is " + lang);
            } else {
                console.log("no such lang");
            }

        },
        error: function() {
            alert("Something went wrong...!");
        }
    });
    $("#lang").val("");
});
// ==========================

var genreID;

// CHECKBOXES 
$(".genre").click(function() {
    outputList.innerHTML = "";
    var genre1 = $("#fiction").val();
    var genre2 = $("#novel").val();
    var genre3 = $("#thriller").val();

    $.ajax({
        url: bookUrl + "" + ':keyes&key=' + apiKey,
        dataType: "json",
        success: function(data) {
            if (genre1 == "Juvenile Fiction") {
                displayResults(data);
                console.log("the genre is " + genre);
            } else if (genre2 == "Government publications") {
                displayResults(data);
                console.log("the genre is " + genre);
            } else if (genre3 == "Thriller") {
                displayResults(data);
                console.log("the genre is " + genre);
            } else {
                console.log("no such genre");
            }

        },
        error: function() {
            alert("Something went wrong...!");
        }
    });
    $(".genre").val("");
});
// ==================


function displayResults(data) {
    //take two element and display them in one row
    for (var i = 0; i <= data.items.length; i += 2) {
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



        outputList.innerHTML += '<div class ="row mt-md-4 d-flex justify-content-center">' +
            formatOutput(bookImg1, title1, author1, publishedDate1, bookLink1, pageCount1, categories1, language1) +
            formatOutput(bookImg2, title2, author2, publishedDate2, bookLink2, pageCount2, categories2, language2)
        '</div>';
        console.log(outputList);

    }
}


function formatOutput(bookImg, title, author, publishedDate, bookLink, pageCount, categories, language) {

    var htmlCard = `<div class="col-lg-6  cardContainer">
       <div class="card " >
         <div class="row no-gutters">
           <div class="col-md-4 pt-3" id="imgContainer">
             <img src="${bookImg}" class="card-img " alt="...">
           </div>
           <div class="col-md-8" id="bodyCardContainer">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">Author: ${author}</p>
               <p class="card-text">Published date: ${publishedDate}</p>
               <p class="card-text" id="pageCount">Page Count: ${pageCount}</p>
               <p class="card-text" id="categorie">Categorie: ${categories}</p>
               <p class="card-text" id="bookLanguage">Language: ${language}</p>
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