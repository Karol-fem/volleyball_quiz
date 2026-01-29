'use strict'

let answs = [0,0,0,0];
let quiz = document.querySelector('#volleyball-quiz');
let quests = quiz.querySelectorAll('.question');
let curQuest = 0;
let result = document.querySelector('#result');
let toKnow = document.querySelector('#show-result'); 
let test = document.querySelector(".test");

toKnow.style.display = "none";
toKnow.addEventListener('click', function(event){
    event.preventDefault();
for (let j=0; j< quests.length; j++){
    
    let btns = quests[j].querySelectorAll('.radio');
    for (let i=0; i< btns.length; i++){

        if (btns[i].checked){
            if (btns[i].value == "A") answs[0]++;
            else if (btns[i].value == "B") answs[1]++;
            else if (btns[i].value == "C") answs[2]++;
            else answs[3] ++;
        }
    }
    test.style.display = "none", quiz.style.display = "none"; 
}

let sorted_answs =[];
for (let i=0; i<4; i++){
 sorted_answs[i] = answs[i];
}
sorted_answs.sort();
console.log(sorted_answs[0], sorted_answs[1], sorted_answs[2], sorted_answs[3])
if (sorted_answs[3] == answs[0] ) {
                result.innerHTML = '<img src="imgs/captain.jpg"><div class="descript"><h2>Капитан</h2><p>Лидер в волейбольной команде должен обладать определёнными личностными качествами, которые помогают ему выполнять свою роль — быть не только капитаном команды, но и вдохновителем, организатором и мотиватором. Вы коммуникабельный, ответственный, дисциплинированный и дальновидный игрок.</p></div>';
            }
            else if (sorted_answs[3] == answs[1]) {
                result.innerHTML = '<img src="imgs/libero.jpg"><div class="descript"><h2>Либеро</h2><p>Для игрока важны как физические, так и психологические качества. Либеро — специальный игрок, выполняющий только защитные функции. Его главная задача — удерживать мяч в игре после атак соперника, обеспечивая команде возможность построить контратаку. Вы обладаете интуицией, умением положительно влиять на психологический климат окружающих, всегда поможете друзьям в трудную минуту.</p> </div>';
            }
            else if (sorted_answs[3] == answs[2]) {
               result.innerHTML = "<img src=\"imgs/setter.jpg\"><div class='descript'><h2>Связка</h2><p>Вы - мозг команды.Связующий должен видеть слабые и сильные стороны в игоровой ситуации. Внимание к ближним, эмпатия, непредсказуемость и дедукция - это про Вас.</p></div>";
            }
            else result.innerHTML = "<img src='imgs/attack.jpg'><div class=\"descript\"><h2>Атакующий</h2><p>Бомбер, ориентированный на результат Вы - быстрый, ловкий и уравновешенный игрок. В сложных ситуациях нападающий способен сохранять хладнокровность и добиваться результата несмотря на хаос вокруг.</p></div>";
})


function hideQuest( questIndx){ quests[questIndx].style.display = "none";}
function showQuest (questIndx){quests[questIndx].style.display = "";}


for(let i=0; i<quests.length; i++) hideQuest(i);
showQuest(curQuest);

 let nextQuest = document.querySelector(".next");
 let backQuest = document.querySelector(".back");

 backQuest.style.display = "none";

nextQuest.addEventListener("click", function e(){
    e.preventDefault;
    hideQuest(curQuest);
    if (curQuest < quests.length-1){
        curQuest++;
        showQuest(curQuest);}
    else nextQuest.style.display = "none", toKnow.style.display = "";
    if (curQuest > 0) backQuest.style.display = "";
})

backQuest.addEventListener("click", function e(){
    e.preventDefault;
    hideQuest(curQuest);
    curQuest--;
    showQuest(curQuest);
    if (curQuest <1) backQuest.style.display = "none";
    if (curQuest < quests.length-1) nextQuest.style.display = "", toKnow.style.display = "none";
})


//Форма 
let begin = document.querySelector("#begin");
let boxes = document.querySelectorAll(".container");
let form = document.querySelector("#registerForm");
let myApi = "http://web4.informatics.ru:82/api/d14207c81053907bf5ba298f7c141d0f"
boxes[1].style.display = "none";

begin.addEventListener("click", function(){
    boxes[0].style.display = "none";
    boxes[1].style.display = "";

    let data = new FormData(form);
    let name = data.get("name");
    let age = data.get("age");
    let wishes = data.get("wishes");
    let dataJSON = JSON.stringify(data);
    fetch(myApi,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }, body: dataJSON
    })

    .then(function(response){
        if(response.ok){
            console.log("Данные успешно отправлены")
        }
    })
    .catch(function(error){
        console.log("Ошибка соединения!");
    })
})
