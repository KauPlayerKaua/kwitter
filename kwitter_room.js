const firebaseConfig = {
  apiKey: "AIzaSyCU-JRjVSC08ISjM7NaHkKx79CB7vnAol4",
  authDomain: "kwitter-e11eb.firebaseapp.com",
  databaseURL: "https://kwitter-e11eb-default-rtdb.firebaseio.com/",
  projectId: "kwitter-e11eb",
  storageBucket: "kwitter-e11eb.appspot.com",
  messagingSenderId: "310428298989",
  appId: "1:310428298989:web:243e0b2e499bd7fd5226e4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML =  "Bem-vindo(a) " + user_name + "!";

function addRoom() {

  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionar sala"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}
// Para obter os dados do banco de dados e exibi-los na página de salas do Kwitter
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
