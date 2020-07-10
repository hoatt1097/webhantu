
$(document).ready(function () {
    $('#dtVerticalScrollExample').DataTable({
        "scrollY": "400px",
        "searching": false,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
    });

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

    function getHantu(word) {
        return word.split(":")[2] ? " : " + word.split(":")[2].trim().toUpperCase() : "";
    }
    
    Millionaire = (function () {
        function Millionaire() {
            this._data = [];
            this._questionArray = [];
            this._number = 0;
            this._numberRight = 0;
            this._indexCurrent = this.random(5);
            this._answerArray = [];
            this._answer = "";
            this._fileData = "hantudon.txt"
            this._color = '#3498db';
            _this = this;
        }

        Millionaire.prototype.startGame = function () {
            this.readFile(this._fileData);
            this._data = [...this._questionArray];
            this._number = 0;
            this._numberRight = 0;
            this._indexCurrent = this.random(this._questionArray.length)
            $("#question-number").html(this._numberRight + " / " + this._number);
            $("#display-question").html(getKanji(this._questionArray[this._indexCurrent]));
            $(".text-mean").html(getKanji(this._questionArray[this._indexCurrent]) + " : " + getMean(this._questionArray[this._indexCurrent]) + getHantu(this._questionArray[this._indexCurrent]));
            this.showTableMean();
            this._answerArray = this.createArrayAnswer();
            this.displayQuestion();
        };

        Millionaire.prototype.readFile = function (file) {
            var result = [];
            $.ajax({
                url: file,
                dataType: 'text',
                async: false,
                success: function(data) {
                    result = data.split('\n');
                } 
            });
            this._questionArray = result;
        };


        Millionaire.prototype.displayQuestion = function () {
            // $("#boxA").css('background-color', '#3498db');
            // $("#boxB").css('background-color', '#3498db');
            // $("#boxC").css('background-color', '#3498db');
            // $("#boxD").css('background-color', '#3498db');

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
                // $(id).css('background-color', '#f1c40f');
                this._answer = $("#" + boxID).html();
            }
            this.checkResult();
        };

        Millionaire.prototype.checkResult = function () {
            if (this._answer.toUpperCase() === getMean(this._questionArray[this._indexCurrent])) {
                this._numberRight++
                this.nextQuestion();
            } else {
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
                if(this._questionArray.length > 4)
                {
                    this._questionArray.splice(this._indexCurrent, 1);
                }
                if(this._questionArray.length == 4){
                    this.readFile(this._fileData);
                }
                this._number++;
                this._indexCurrent = this.random(this._questionArray.length)
                var number = this._number + 1;
                $("#question-number").html(this._numberRight + " / " + this._number);
                $("#display-question").html(getKanji(this._questionArray[this._indexCurrent]));
                $(".text-mean").html(getKanji(this._questionArray[this._indexCurrent]) + " : " + getMean(this._questionArray[this._indexCurrent]) + getHantu(this._questionArray[this._indexCurrent]));
                this._answerArray = this.createArrayAnswer();
                this.displayQuestion();
            }
        }; 

        Millionaire.prototype.createArrayAnswer = function () {
            this._answerArray = [this._indexCurrent]
            while(this._answerArray.length < 4) {
                var a = this.random(this._questionArray.length)
                if( !this._answerArray.includes(a)){
                    this._answerArray.push(a);
                }
            }
            return shuffle(this._answerArray);
        };
        
        Millionaire.prototype.showTableMean = function () {
            $(".vocabulary-content").children().remove();
            for(var i = 0; i < this._data.length; i++) {
                $(".vocabulary-content").append("<tr class='word-" + i +"'></tr>")
                arrayWord = this._data[i].split(":");
                for(var j = 0; j < arrayWord.length; j ++){
                    $(".word-" + i).append('<td>' + arrayWord[j].toUpperCase() + '</td>');
                }
                if(arrayWord.length == 2){
                    $(".word-" + i).append('<td></td>');
                }
            }
        };
        

        Millionaire.prototype.changeData = function (value,lessonName) {
            this._fileData = value;
            $(".lesson-name").html(lessonName);
            this.startGame();
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

    $(".lesson").click(function (e) {
        var Millionaire = window.Millionaire;
        Millionaire.changeData(this.value, $(this).html());
    });


    
    $("#restart-game").click(function (e) {
        e.preventDefault();
        var Millionaire = window.Millionaire;
        Millionaire.startGame();

    });

    $(".btn-mean").click(function() {
        $(".text-mean").fadeToggle(function(){
            if ($(this).is(':visible')) {
                $(".btn-mean").html(">>> Mean");                
            } else {
                $(".btn-mean").html("<b><<< Mean</b>");                
            } 
        });
    });

    var Millionaire = new Millionaire();
    window.Millionaire = Millionaire;
    Millionaire.startGame();
});