/*Represents a Dice Game using between 3 - 6 Dice.
* Dice value is randomly generated and then points
* are awarded depending on the values of the dice
*/

// Global Variables
var numDice;
var diceValuesArr = [];
var rndNumber = 0;
var rndScore = 0;
var scoreBlnc = 0;

// SETUP
this.setup = function () {
    numDice = document.getElementById("diceNum").value;
	
	// Checks if the input is between 3 and 6
    if (3 <= numDice && numDice <= 6) {
        // Disables "Roll" button after clicked on
		document.getElementById("setupBtn").disabled = true;
        
		// Shows play section if the number of dice is correct
		document.getElementById("play").style.display = "block";
        
        rndNumber = 0;
        rndScore = 0;
        scoreBlnc = 0;
    } else {
        alert("Number of dices must be in between 3 and 6!");
    }
}

// PLAY
this.play = function () {
	
	// Disables "Another Round" and "End Game" button after being clicked
	document.getElementById("anotherRnd").disabled = true;
	document.getElementById("endGame").disabled = true;
	document.getElementById("dicePics").innerHTML = "";
	
    // Resets dice values for each round
    diceValuesArr = [];
    rndNumber++;
	
	/*Generates random number between 1 and 6
	* then adds each value to the array. Switch statement
	* shows the specific value generated and calls Show Image Function
	*/
    for (var i = 0 ; i < numDice ; i++) {
		var diceValue = Math.floor(Math.random()*6+1);
        diceValuesArr.push(diceValue);
		
		switch(diceValue) {
			case 1: 
				showImage("dice1.png");
				break;
			case 2: 
				showImage("dice2.png");
				break;
			case 3: 
				showImage("dice3.png");
				break;
			case 4: 
				showImage("dice4.png");
				break;
			case 5: 
				showImage("dice5.png");
				break;
			case 6: 
				showImage("dice6.png");
				break;
		}
    }
    
    // Checks which algorithm to use in order to compute the number of points

	// If all dice values are the same
	if (nSameValue()) {
		rndScore = 60 + getSumOfDiceValues();
		scoreBlnc+= rndScore;
	// If all dice values are the same - 1		
    } else if (oneLessNSameValue()) {
		rndScore = 40 + getSumOfDiceValues();
		scoreBlnc+= rndScore;
    // If the dice values are a run  
    } else if (aRun()) {
		rndScore = 20 + getSumOfDiceValues();
		scoreBlnc+= rndScore;
    // If the dice values are all different  
    } else if (allDifferentValues()) {
		rndScore = getSumOfDiceValues();
		scoreBlnc+= rndScore;
    // Any other outcome
    } else {            
        rndScore+=0;
        scoreBlnc+=0; 
    }
	
	// Update the view for the user after each round
	document.getElementById("rndNumber").innerHTML = rndNumber;
	document.getElementById("rndScore").innerHTML = rndScore;
	document.getElementById("scoreBlnce").innerHTML = scoreBlnc;
	
	// Enables Another Round and EndGame buttoms after each round is finished
	document.getElementById("anotherRnd").disabled = false;
	document.getElementById("endGame").disabled = false;
}

// Shows dice image inside div with id "dicePics" with URL
this.showImage = function(imageUrl) {
	var img = document.createElement("IMG");
	img.src = "images/" + imageUrl;
	document.getElementById("dicePics").appendChild(img);
}

/*Algorithm to check if all values are the same 
* The code for the following Array same value function has 
* been taken from Martin 
* https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
* User contributions licensed under cc by-sa 3.0
* https://creativecommons.org/licenses/by-sa/3.0/
*/ 
this.nSameValue = function() {
    
	return !!diceValuesArr.reduce(function(a, b){ return (a === b) ? a : NaN; });;
}

/*Algorithm to check whether N-1 values are equal 
* Create occurance Array and set all 6 elements to 0
* Switch statement is used to increment a particular index of
* the numOfOccuranceArray depending on the dice value for each dice rolled
* If the .length of diceValuesArr - 1 is equal to a particular index 
* of the Occurance array this would indicate that N-1 of the values were the same
* in the diceValuesArr, else we return false
*/
this.oneLessNSameValue = function() {

	// Create num of occurance array
	var numOfOccuranceArray = [];
	
	// Change length of array to 6 initialised with 0's.
	for (i = 0; i < 6 ; i++) {
		numOfOccuranceArray[i] = 0;
	}
	
	for (i = 0; i < diceValuesArr.length; i++) {
		switch(diceValuesArr[i]) {
			case 1:
				numOfOccuranceArray[0]++;
				break;
			case 2:
				numOfOccuranceArray[1]++;
				break;
			case 3:
				numOfOccuranceArray[2]++;
				break;
			case 4:
				numOfOccuranceArray[3]++;
				break;
			case 5:
				numOfOccuranceArray[4]++;
				break;
			case 6:
				numOfOccuranceArray[5]++;
				break;				
		}	
	}
	
	for (i = 0; i < 6; i++) {
		if ((diceValuesArr.length - 1) == numOfOccuranceArray[i])
			return true;
	}
	return false;
}

/*Algorithm to check if there is a Run in values 
* Sorts values of array in ascending order
* Checks each pair of elements in the array to check 
* if there is a difference of one.
*/
this.aRun = function() {
   
	diceValuesArr.sort();
	
	for (i = 0; i < diceValuesArr.length - 1; i++) {
		if (diceValuesArr[i] != diceValuesArr[i + 1] - 1) 
			return false;
	}
	return true;
}

/*Algorithm to check if all values are different 
* After sorting the array into ascending order
* if the value at element 0 is greater or equal to the next element
* then we return false as the values cannot all be different
* however if the value at element 0 is less than the next element and so on
* then we return true as all values must be different
*/
this.allDifferentValues = function() {
    diceValuesArr.sort();
	
	for (i = 0; i < diceValuesArr.length - 1; i++) {
		if (diceValuesArr[i] >= diceValuesArr[i + 1])
			return false;
	}
	return true;
}

/*Function to find the sum of dice values
* The code for the following Array function was written using
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/
this.getSumOfDiceValues = function() {
    var tmp = 0;
    
    diceValuesArr.forEach(function(element) {
        tmp += element; 
    });
    
    return tmp;
}

// END GAME
this.endGame = function() {
	
	// Shows End Game section 
	document.getElementById("end").style.display = "block";
	
	// Hides Play section
	document.getElementById("play").style.display = "none";
	
	// Shows the total results to the user
	document.getElementById("totalRndNum").innerHTML = rndNumber;
	document.getElementById("totalBlnce").innerHTML = scoreBlnc;
	document.getElementById("averageScre").innerHTML = scoreBlnc / rndNumber;
} 
