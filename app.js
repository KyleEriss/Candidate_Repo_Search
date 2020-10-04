function getRepo() {
    let userInput = document.getElementById("repoList").value;
    let dynamicUrl = `https://api.github.com/users/${userInput}/repos`
    
    //fetch URL
    fetch(dynamicUrl)
    .then(handleErrors)
    .then(response => console.log("ok") )
    .catch(error => alert("Sorry, GitHub not found. Please check spelling."));
        
        // Resume program if file found
    fetch(dynamicUrl)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Something went wrong. Try again later."));
}



    /*.then(response => {
        if (response.ok) {
            return respnse.json();
        }
        thro new Erro(response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });*/


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


function displayResults(responseJson) {
    for (let i = 0; i < responseJson.length; i++){
        console.log(responseJson[i].html_url);
        console.log(responseJson[i].name); 
        $('.results-list').append(`<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3></li>`);
    }
    $(".results").removeClass("hidden");
  };



function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        if (document.getElementById("repoList").value === 0) {
            return alert("Please enter GitHub handle");
        }
        $(".results-list").empty();
        getRepo();
    });
}


$(watchForm)