// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase ,ref , push ,set, onValue,onChildAdded,get,onChildRemoved} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtHK0YcG-_2eK7rEFSwUf55Jyy0TrRHlY",
  authDomain: "quiz-app-db-53e2d.firebaseapp.com",
  projectId: "quiz-app-db-53e2d",
  storageBucket: "quiz-app-db-53e2d.appspot.com",
  messagingSenderId: "905298311529",
  appId: "1:905298311529:web:6fd510c8edce99152625f8",
  measurementId: "G-RX0E6TKN0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

let ttl = 0;
var score = 0;
var currentquiz = 0;
var que = document.getElementById('eq');
var o1 = document.getElementById('o1');
var o2 = document.getElementById('o2');
var o3 = document.getElementById('o3');
var o4 = document.getElementById('o4');
var co = document.getElementById('co');

window.sendq = function () {
    var obj = {
        question: que.value,
        option1:o1 .value,
        option2:o2.value,
        option3:o3.value,
        option4:o4.value,
        correct:co.value
        
    };
    const keyRef = ref(database, 'QUIZ')
    obj.id=push(keyRef).key;
    const refrences = ref(database, `QUIZ/${obj.id}/`);



    set(refrences,obj)
        console.log(obj.id)
        console.log(obj)


}
var list = []
function renderData(){
  var parent = document.getElementById('parent');
  
  parent.innerHTML = "";
  for( var i = 0; i<list.length; i++){
    parent.innerHTML += `<h2 id="ql" >${list[i].question}</h2>
    <ul id="${i}"> 
   <li>   
   <button id="lsts" onclick="checker(this)">
   ${list[i].option1}
   </button>
   <button id="lsts" onclick="checker(this)" >  
   ${list[i].option2}
   </button>
   </li>
   
   <li>  
   <button id="lsts" onclick="checker(this)">  
   ${list[i].option3}
   </button>
   <button id="lsts" onclick="checker(this)"> 
   ${list[i].option4}
   </button>
   </li>
   </ul>`;
  }
}
  
  window.getdata = function () {
    var srt = document.getElementById('srt').style.display="none"
    onValue(ref(database, '/QUIZ/'), (snapshot) => {
      console.log(snapshot.val())
    });
    
    
    const taskRef =ref(database,'QUIZ/');
    onChildAdded(taskRef, function(data){
      list.push(data.val());
      console.log(data.val());
      renderData();
    });
    
  }
  
  var de = document.getElementById("lsts");




  
  window.checker=function(hoja){
        // const answer =document.getElementById('answer')
        var pp =  hoja.parentElement.parentElement.getAttribute("id")
       var de =  list[pp].correct
        // console.log(list[pp].correct)
        if(hoja.innerHTML.trim()===de){
            // console.log("ok")
               ++score;
            console.log(score)
          }
        else {
          ++currentquiz;
          console.log(currentquiz)
              // --score;
              //   // console.log("fail")
        }
              

      
        if(score+currentquiz==5){
          alert("your total score is "+score+"/5")
          alert("your fail in "+currentquiz+"/5")
          
        }
        if(score==5){
          alert("your total score is "+score+"/5")
          alert("your fail in "+currentquiz+"/5")
          
        }
        if(currentquiz==5){
          alert("your total score is "+score+"/5")
          alert("your fail in "+currentquiz+"/5")
          
        }
};``
window.getscore=function(){
  // alert("your score is"+score+"/5")
  // alert("you were fail in"+currentquiz);
}





