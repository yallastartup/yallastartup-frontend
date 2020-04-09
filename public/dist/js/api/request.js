//var apiUrl='http://web-sokar-api.herokuapp.com';
// var apiUrl='http://localhost:3005/1.0/';

//var webUrl='http://web-sokar-api.herokuapp.com';
// var webUrl='http://localhost:1337/';

function deleteTableRow(url,id,redirectPage)
{
  
    var   ApiUrlDelete= apiUrl+url+'?token='+getUserTokenCookie().user_token;

    fetch(ApiUrlDelete,
        {
            body: JSON.stringify({
                Id: id,
            }),
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        }).then((Response)=>{
        Response.json().then((data)=>{
           
            if(data.error)
            {
                console.log(data.error)
            }
            if(data.data.msg)
            {
                document.getElementById("AllErrors").innerHTML='';
                document.getElementById("AllErrors").style.display = "block";
                document.getElementById("AllErrors").innerHTML+="<li>"+ data.data.msg + "</li>" ;
            }
            else
            {
                window.location.href = webUrl+redirectPage;
            }

        })

    })
}

function addTableRow(apiName,body,redirectPage)
{
    var requestUrl=apiUrl+apiName+'?token='+getUserTokenCookie().user_token;
    fetch(requestUrl,
    {
    method: 'POST',
    body: body,
    headers: {"Content-Type": "application/json",   enctype: 'multipart/form-data'},

    }).then((Response)=> {
        Response.json().then((data) => {

            if (data.error) {
                document.getElementById("AllErrors").innerHTML='';
                document.getElementById("AllErrors").style.display = "block";
                document.getElementById("AllErrors").innerHTML+="<li>"+ data.error.message + "</li>" ;
            } else {
                window.location.href = webUrl + redirectPage;

            }

        })
    })
}

    function addTableRowWithImage(apiName,body,redirectPage)
    {
        console.log("body",body.get("first_name"))
          $.ajax({
                 contentType: false,
                 data: body ,
                 enctype: 'multipart/form-data',
                 processData: false,
                 success: result =>  window.location.href = webUrl + redirectPage,
                 error:data=>{
                     
                    document.getElementById("AllErrors").innerHTML='';
                    document.getElementById("AllErrors").style.display = "block";
                    document.getElementById("AllErrors").innerHTML+="<li>"+data.responseJSON.error.message + "</li>" ;
                 },
                 type: 'POST',
                 url: apiUrl+apiName+'?token='+getUserTokenCookie().user_token
             })

   }   

function editTableRow(apiName,body,id,redirectPage)
{
    var  requestUrl=apiUrl+apiName+'?token='+getUserTokenCookie().user_token;
    fetch(requestUrl,
    {
    method: 'POST',
    body: body,
    headers: {"Content-Type": "application/json"}
    }).then((Response)=>{
            Response.json().then((data)=>{
              
                if(data.error)
                {
                document.getElementById("AllErrors").innerHTML='';
                document.getElementById("AllErrors").style.display = "block";
                document.getElementById("AllErrors").innerHTML+="<li>"+ data.error.message + "</li>" ;

                }
                else
                {

                    window.location.href = webUrl+redirectPage;

                }

            })

    })
}

function editTableRowWithImage(apiName,body,redirectPage)
{
    $.ajax({
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        data:body,
        success: result =>  window.location.href = webUrl + redirectPage,
        error:data=>{
            
           document.getElementById("AllErrors").innerHTML='';
           document.getElementById("AllErrors").style.display = "block";
           document.getElementById("AllErrors").innerHTML+="<li>"+ data.responseJSON.error.message+ "</li>" ;
        },
        type: 'POST',
        url: apiUrl+apiName+'?token='+getUserTokenCookie().user_token
    })
}


function sendData(obj)
{
    var my_id_value = $(obj).data('id');
    $(".modal-body #hiddenId").val(my_id_value);
    $("#myModal").modal("show");
}

async function getData(Apiname) {
       try
       {
         const resp = await fetch(apiUrl+Apiname+'?token='+getUserTokenCookie().user_token)
         const data =  resp.json()
         return data
       } 
       catch (err) 
       {
            console.log(err)
       }
}

function getUserTokenCookie(){
    var list = {},
        rc = document.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return  data={user_token:list.userToken,userRole:list.userRole,url:apiUrl};
}

function userSessionInfo(){
    // var list = {},
    //     rc = document.cookie;

    // rc && rc.split(';').forEach(function( cookie ) {
    //     var parts = cookie.split('=');
    //     list[parts.shift().trim()] = decodeURI(parts.join('='));
    // });
    // return   list.userinfo;
     return   localStorage.getItem('userinfo');
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

function manageSideMenu()
{
   var role= getUserTokenCookie().userRole;
   
   if(role=="super")
   {   
       $("#dashboardmenu").css("display", "block");
       $("#usersmenu").css("display", "block");
       $("#ingredientsmenu").css("display", "block");
       $("#suggestedmenu").css("display", "block");
       $("#requestmenu").css("display", "block");
       $("#articlemenu").css("display", "block");
       $("#messagemenu").css("display", "block");
       $("#dealsmenu").css("display", "block");
       $("#reportsmenu").css("display", "block");
       $("#settingsmenu").css("display", "block");
   }
  
   else if(role=="doctor")
   {
    $("#articlemenu").css("display", "block");
    $("#reportsmenu").css("display", "block");
    $("#usersmenu").css("display", "block");
    $("#admin").css("display", "none");
   }
   else if(role=="admin")
   {
    $("#articlemenu").css("display", "block");
    $("#ingredientsmenu").css("display", "block");
    $("#suggestedmenu").css("display", "block");
   }
   else if(role=="diabetic")
   {
    $("#articlemenu").css("display", "block");
   }
   else if(role=="nutrition")
   {
    $("#articlemenu").css("display", "block");
   }
}

