$(function(){

    const socket = io();

    //Obtaining DOM Elements from the interface
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    //Obtaining DOM Elements from the nicknameForm
    const nickForm = $('#nickForm');
    const nickname = $('#nickname');
    const nickError = $('#nickError');

    const username = $('#usernames');

    nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', nickname.val(), (data) => {
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                nickError.html(`
                    <div class="alert alert-danger">
                        That username already exist.
                    </div>
                `);
            }
            nickname.val('');
        });
    });

    //Events
    messageForm.submit(e =>{
        e.preventDefault();
        socket.emit('send message', messageBox.val());
        messageBox.val('');
    });

    socket.on('new message', function(data){
        chat.append(data + '<br>');
    });

    socket.on('usernames', data => {
        let html = '';
        for(let i = 0; i < data.length; i++){
            html = '<p><i class="fas fa-user-alt"></i>'+data[i]+'</p>';
            console.log(data[i]);
        }
        username.append(html);
    });

});

