var socket = io('192.168.0.58:3000');
socket.on('connect', function(){
    console.log("connected!");
});
socket.on('currentStatus', function(data){
    console.log(data);
    if(data != null){
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            AddRoomData(element);
        }
    }
});
socket.on('data', function(data){
    AddRoomData(data);
});
socket.on('disconnect', function(){

});
function AddRoomData(data) {
    var roomMenuObj = $("#roomList #" + data.RoomName);
    if(roomMenuObj.length <= 0){
        $("#roomList").append("<button type=\"button\" class=\"list-group-item list-group-item-action active\" id=\""+ data.RoomName +"\">"+ data.RoomName +"</button>");
        $("#logs").append(`<table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">date</th>
            <th scope="col">log</th>
          </tr>
        </thead>
        <tbody id="${data.RoomName}">
          
        </tbody>
      </table>`);
    }
    for (let i = 0; i < data.log.length; i++) {
        const log = data.log[i];
        $("#logs #"+data.RoomName).prepend(`<tr>
        <td>${log.dateTime}</td>
        <td>${log.log}</td>
    </tr>`);
    }
    
}