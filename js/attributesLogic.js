let UserAccessToken = document.querySelector("#_token")
let UserId = document.querySelector("#_userId")
let DivResponse = document.querySelector("#_response")

document.addEventListener("DOMContentLoaded", () => {
    UserAccessToken = document.querySelector("#_token")
    UserId = document.querySelector("#_userId")
    DivResponse = document.querySelector("#_response")
});

document.querySelector("#_checkAllAttributesForCategory").addEventListener("click", (e) => {
    e.preventDefault()
    let txtcategories = document.querySelector("#_categorysAtttibuttes").value
    let categories = txtcategories.split("\n")
    console.log("==============================")
    console.log(categories)
    console.log("==============================")
    checkAllAtributtes(categories, categories.length, 0, UserAccessToken.value)
})


async function checkAllAtributtes(mlusCategory, tope, pos, token) {
    if(pos >= tope){
        return;
    }
    let body = {}
    if(token != ''){
        body = {
            "method": 'GET',
            "headers": {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + token
            }
        }
        let res = await fetch("https://api.mercadolibre.com/categories/"+ mlusCategory[pos] +"/attributes", body)
        let data = await res.json()
        DivResponse.innerHTML += "<p style='color: white; background-color: #196F3D;'>" + mlusCategory[pos] + "</p>"
        DivResponse.innerHTML += "<ul>"
        data.forEach(element => {
            if(!element["tags"]["hidden"]){
                switch(element["value_type"]){
                    case "string":
                        DivResponse.innerHTML += "<li>" + element["id"] + " - " + element["name"] +" - Texto</li><hr>" 
                        break;
                    case "list":
                        DivResponse.innerHTML += "<li>" + element["id"] + " - " + element["name"] + " - Lista"
                        DivResponse.innerHTML += "<ul>"
                        element["values"].forEach(val => {
                            DivResponse.innerHTML  += "<li>"+ val["name"] +"</li>"
                        })
                        DivResponse.innerHTML += "</ul>"
                        DivResponse.innerHTML  += "</li><hr>"
                        break;
                    case "number_unit":
                        DivResponse.innerHTML += "<li>" + element["id"] + " - " + element["name"] + " - Numero + Unidad de medida"
                        DivResponse.innerHTML  += "<ul>"
                        element["allowed_units"].forEach(unit => {
                            DivResponse.innerHTML  += "<li>"+ unit["name"] +"</li>"
                        }) 
                        DivResponse.innerHTML  += "</ul>"
                        DivResponse.innerHTML += "</li><hr>" 
                        break;
                    case "number":
                        DivResponse.innerHTML += "<li>" + element["id"] + " - " + element["name"] +" - Solo numeros</li><hr>" 
                        break;
                    case "boolean":
                        DivResponse.innerHTML += "<li>" + element["id"] + " - " + element["name"] +" - Si o No</li><hr>" 
                        break;
                }
            }    
        }) 
        DivResponse.innerHTML += "</ul>"
    }
    return await checkAllAtributtes(mlusCategory, tope, pos+1, token);
}

document.querySelector("#_checkRequiredAttributesForCategory").addEventListener("click", (e) => {
    e.preventDefault()
    let txtcategories = document.querySelector("#_categorysAtttibuttes").value
    let categories = txtcategories.split("\n")
    console.log("==============================")
    console.log(categories)
    console.log("==============================")
    checkRequiredAtributtes(categories, categories.length, 0, UserAccessToken.value)
})

async function checkRequiredAtributtes(mlusCategory, tope, pos, token) {
    if(pos >= tope){
        return;
    }
    let body = {}
    if(token != ''){
        body = {
            "method": 'GET',
            "headers": {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + token
            }
        }
        let res = await fetch("https://api.mercadolibre.com/categories/"+ mlusCategory[pos] +"/attributes", body)
        let data = await res.json()
        DivResponse.innerHTML += "<p>" + mlusCategory[pos] + "</p>"
        DivResponse.innerHTML += "<ul>"
        data.forEach(element => {     
            if(element["hierarchy"] == "PARENT_PK" || element["tags"]["required"] || element["tags"]["catalog_required"]){
                DivResponse.innerHTML += "<li>" + element["id"] + " - " + element["name"] + "</li>"     
            }   
        }) 
        DivResponse.innerHTML += "</ul>"
    }
    return await checkRequiredAtributtes(mlusCategory, tope, pos+1, token);
}

document.querySelector("#_printAttributes").addEventListener("click", (e) => {
    e.preventDefault()
    PrintElem("_response")
})

function PrintElem(elem){
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('<style>p{color: white; background-color: #196F3D;}</style></head><body >');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}