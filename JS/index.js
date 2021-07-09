$(document).ready(()=>{

    // server url details
    let server_url = "http://127.0.0.1:8000"
    let server = {
        "login" : `${server_url}/login`,
        "signup" : `${server_url}/signup`
    }

    function form_data_null_check(data){
        if(data === "" || data === undefined){
            return null
        }
        else{
            return data
        }
    }

    // login
    function login(){

        $("#login_submit").on("click",(e)=>{
            let email = $("#login_email").val()
            let password = $("#login_password").val()
            
            if(email.indexOf("@") > -1 &&
            form_data_null_check(email) != null &&
            form_data_null_check(password) != null){
                

                let ajax = $.ajax(server["login"],{
                    method: "post",
                    dataType: "json",
                    data: {
                        "email" : email,
                        "password" : password
                    }
                })

                ajax.done((msg)=>{
                    if(msg.success != undefined){
                        $("#login_alert").html(
                            `
                            <div class="alert alert-success" role="alert">
                            ${msg.success}
                            </div>
                            `
                        )
                    }
                    else if(msg.error != undefined){
                        $("#login_alert").html(
                            `
                            <div class="alert alert-danger" role="alert">
                            ${msg.error}
                            </div>
                            `
                        )
                    }
                })

                ajax.fail((msg)=>{
                    $("#login_alert").html(
                        `
                        <div class="alert alert-danger" role="alert">
                        Something Went Wrong Try Again Later :(
                        </div>
                        `
                    )
                })

            }
            else{
                $("#login_alert").html(
                    `
                    <div class="alert alert-warning" role="alert">
                    Insert correct email and password :(
                    </div>
                    `
                )
            }
        })

        $("#login_close").on("click",(e)=>{
            $(".alert").remove()
        })
    }

    // sign up
    function signup(){

        $("#sign_up_submit").on("click",()=>{
            let email = form_data_null_check($("#signup_email").val())
            let username =form_data_null_check($("#signup_username").val())
            let pass1 =form_data_null_check($("#signup_password1").val())
            let pass2 =form_data_null_check($("#signup_password2").val())

            if(((email && username && pass1 && pass2) != null) && 
            email.indexOf("@") > -1){
                if(pass1 === pass2){
                    $('.body').load('../HTML/userdetails.html',()=>{
                        $("#login_back").on("click",()=>{
                            window.location.href = 'index.html'
                        })
                        $("#login_update").on("click",()=>{
                            let phonenumber =form_data_null_check($("#signup_phonenumber").val())
                            let location = form_data_null_check($("#signup_location").val())
                            let company_name = form_data_null_check($("#signup_companyname").val())
                            let brand = form_data_null_check($("#signup_brand").val())
                            let client_type = form_data_null_check($("#signup_clienttype").val())
                            let avg_revenue = form_data_null_check($("#signup_avgrevenue").val())
                            if((phonenumber && location && company_name && brand && client_type && avg_revenue) != null){
                                let ajax = $.ajax(server['signup'],{
                                    method: 'post',
                                    dataType: 'json',
                                    data: {
                                        "email" : email,
                                        "username" : username,
                                        "pass1" : pass1,
                                        "pass2" : pass2,
                                        "phone_number" : phonenumber,
                                        "location" : location,
                                        "company_name" : company_name,
                                        "brand" : brand,
                                        "client_type" : client_type,
                                        "avg_revenue" : avg_revenue
                                    }
                                })
                                ajax.done((msg)=>{
                                    $(".body").load('../HTML/details.html',()=>{
                                        $("#details_back").on("click",()=>{
                                            window.location.href = 'index.html'
                                        })
                                        if(msg.success != undefined){
                                            data = JSON.parse(msg.details)
                                            $.each(data,(index,value)=>{
                                                $("#user_details").append(
                                                    `
                                                    <div class="row"  style="justify-content: center;">
                                                    <h2>
                                                    ${index} : ${value}
                                                    </h2>
                                                </div>
                                                    `
                                                )
                                            })
                                        }
                                        else{
                                            console.log(msg.error)
                                        }
                                    })
                                })
                                ajax.fail((msg)=>{
                                    console.log("something went wrong")
                                })
                            }
                            else{
                                console.log("null values are not allowed")
                            }
                            
                        })
                    })
                }
                else{
                    $("#sign_up_alert").html(
                        `
                        <div class="alert alert-warning" role="alert">
                        Password must match
                        </div>
                        `
                    )
                }
            }
            else{
                $("#sign_up_alert").html(
                    `
                    <div class="alert alert-warning" role="alert">
                    email,username,password can't be empty or incorrect email
                    </div>
                    `
                )
            }
        })

        $("#sign_up_close").on("click",(e)=>{
            $(".alert").remove()
        })
    }

    login()
    signup()
})