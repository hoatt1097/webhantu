
 
$(document).ready(function () {

    var data = [];
    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    data =  allText.split(/\n|\r/g);
                }
            }
        }
        rawFile.send(null);
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }

    function getKanji(word) {
        return word.split(":")[0].trim().toUpperCase();
    }

    function getMean(word) {
        return word.split(":")[1].trim().toUpperCase();
    }

    readTextFile("data.txt")
    
    Millionaire = (function () {
        function Millionaire() {
            this._questionArray = data;
            this._number = 0;
            this._numberRight = 0;
            this._indexCurrent = this.random(5);
            this._answerArray = shuffle([this._indexCurrent, this.random(data.length), this.random(data.length), this.random(data.length)]);
            this._answer = "";
            this._color = '#3498db';
            _this = this;
        }

        Millionaire.prototype.startGame = function () {
            this._number = 0;
            this._numberRight = 0;
            this._indexCurrent = this.random(this._questionArray.length)
            $("#question-number").html(this._numberRight + " / " + this._number);
            $("#display-question").html(getKanji(this._questionArray[this._indexCurrent]));
            this._answerArray = shuffle([this._indexCurrent, this.random(this._questionArray.length), this.random(this._questionArray.length), this.random(this._questionArray.length)]);
            this.displayQuestion();
        };

        Millionaire.prototype.displayQuestion = function () {
            $("#boxA").css('background-color', '#3498db');
            $("#boxB").css('background-color', '#3498db');
            $("#boxC").css('background-color', '#3498db');
            $("#boxD").css('background-color', '#3498db');

            $("#boxA").html(getMean(this._questionArray[this._answerArray[0]]));
            $("#boxB").html(getMean(this._questionArray[this._answerArray[1]]));
            $("#boxC").html(getMean(this._questionArray[this._answerArray[2]]));
            $("#boxD").html(getMean(this._questionArray[this._answerArray[3]]));
        };

        Millionaire.prototype.selectBox = function (boxID) {
            var id = "#" + boxID;

            if (boxID == "boxA" || boxID == "boxB" || boxID == "boxC" || boxID == "boxD") {

                $("#boxA").css('background-color', '#3498db');
                $("#boxB").css('background-color', '#3498db');
                $("#boxC").css('background-color', '#3498db');
                $("#boxD").css('background-color', '#3498db');
                $(id).css('background-color', '#f1c40f');
                this._answer = $("#" + boxID).html();
            }
            this.checkResult();
        };

        Millionaire.prototype.checkResult = function () {
            if (this._answer.toUpperCase() === getMean(this._questionArray[this._indexCurrent])) {
                this._numberRight++
                console.log(this._numberRight)
                this.nextQuestion();
            } else {
                console.log(this._numberRight)
                this.nextQuestion();
            }
        };

        Millionaire.prototype.nextQuestion = function () {

            if(this._number === 50) {
                if(this._numberRight < 30) {
                    alert("Quá tệ \n " + this._numberRight + " / " + this._number)
                }
                if(this._numberRight > 30 && this._numberRight < 45) {
                    alert("Tốt nha: \n " + this._numberRight + " / " + this._number)
                }
                if(this._numberRight >= 45) {
                    alert("Xuất sắc \n " + this._numberRight + " / " + this._number)
                }
                alert("Start game");
                this.startGame();
            }
            else {
                this._number++;
                this._indexCurrent = this.random(this._questionArray.length)
                var number = this._number + 1;
                console.log(number)
                $("#question-number").html(this._numberRight + " / " + this._number);
                $("#display-question").html(getKanji(this._questionArray[this._indexCurrent]));
                this._answerArray = shuffle([this._indexCurrent, this.random(this._questionArray.length), this.random(this._questionArray.length), this.random(this._questionArray.length)]);
                this.displayQuestion();
            }
        };  

        Millionaire.prototype.random = function (max) {
            return Math.floor(Math.random() * max);
        };


        Millionaire.prototype.constructor = Millionaire;

        return Millionaire;


    })();


    $("#sellector").click(function (e) {
        var Millionaire = window.Millionaire;
        if (e.target.id !== "sellector") {
            _this.targetID = e.target.id;
            Millionaire.selectBox(_this.targetID);
        }
    });

    
    $("#restart-game").click(function (e) {
        e.preventDefault();
        var Millionaire = window.Millionaire;
        Millionaire.startGame();

    });

    var Millionaire = new Millionaire();
    window.Millionaire = Millionaire;
    Millionaire.startGame();
});