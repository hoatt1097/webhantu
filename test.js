Array.prototype.clone = function () {
    return this.slice(0);
};


$(document).ready(function () {

    Millionaire = (function () {
        function Millionaire() {
            this._questionArray = [];
            this._questionContent = [];
            this._answerArray = [];
            this._selectArray = [];
            this._color = '#3498db';
            _this = this;
        }

        Millionaire.prototype.startGame = function () {
            this._boardPage = 0;
        };

        Millionaire.prototype.selectBox = function (boxID) {
            var id = "#" + boxID;

            if (boxID == "boxA" || boxID == "boxB" || boxID == "boxC" || boxID == "boxD") {

                $("#boxA").css('background-color', '#3498db');
                $("#boxB").css('background-color', '#3498db');
                $("#boxC").css('background-color', '#3498db');
                $("#boxD").css('background-color', '#3498db');

                $(id).css('background-color', '#f1c40f');
                this.show($('#submit-answer'));
                this._selectArray[this._boardPage] = boxID;
            }

        };

        Millionaire.prototype.checkResult = function (number) {
            if (this._answerArray[number] === this._selectArray[number]) {
                return true;
            } else {
                return false
            }
        };

        Millionaire.prototype.nextOrStop = function () {
            var page = this._boardPage;
            if (this.checkResult(this._boardPage)) {
                console.log(page);
                console.log(_this._answerArray.length);
                $("#alert").attr("class", "alert alert-success");
                $("#alert").html("Congratulation! Your Answer is alright!");
                _this._color = '#f1c40f';
                if (page + 1 == _this._answerArray.length) {
                    $("#alert").attr("class", "alert alert-success");
                    $("#alert").html("Congratulation! You passed all the " + _this._answerArray.length + " questions of this Game");
                    this.show($('#restart-game'));
                    this.hide($('#next-question'));

                }

            } else {
                var message = "";
                $("#alert").attr("class", "alert alert-danger");
                if (page >= 10) {
                    message = "Your reward is for question 10"
                } else if (page >= 5) {
                    message = "Your reward is for question 5"
                } else {
                    message = "You have no reward"
                }


                $("#alert").html(message);

            }

        };

        Millionaire.prototype.show = function (elementDom) {
            this._elementDom = elementDom;
            this._elementDom.css('display', 'block');
        };

        Millionaire.prototype.random = function (min, max) {
            this._use5050 = true;
            return Math.floor(Math.random() * (max - min + 1)) + min;

        };


        Millionaire.prototype.constructor = Millionaire;

        return Millionaire;


    })();


    $("#sellector").click(function (e) {
        alert("abc")
        var Millionaire = window.Millionaire;
        if (e.target.id !== "characterBox" && e.target.id !== "sellector") {
            _this.targetID = e.target.id;
            Millionaire.selectBox(_this.targetID);
        }
    });

    


    $("#restart-game").click(function (e) {
        e.preventDefault();
        var Millionaire = window.Millionaire;
        Millionaire.restartGame();

    });

    var Millionaire = new Millionaire();
    window.Millionaire = Millionaire;
});