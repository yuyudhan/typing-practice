// script.js

$(document).ready(function() {
    // Character Pools
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()-_=+[]{}|;:",.<>?/`~\\\' ';

    // Counters
    let correctCount = 0;
    let wrongCount = 0;

    // Typing Time Records
    let typingTimesLetters = [];
    let typingTimesNumbers = [];
    let typingTimesSpecial = [];

    // Frequencies
    let freqCharacters = parseInt($('#freq-characters').val()) || 0;
    let freqNumbers = parseInt($('#freq-numbers').val()) || 0;
    let freqSpecial = parseInt($('#freq-special').val()) || 0;

    // Update frequency display values
    function updateFrequencyDisplay() {
        $('#freq-characters-value').text(freqCharacters);
        $('#freq-numbers-value').text(freqNumbers);
        $('#freq-special-value').text(freqSpecial);
    }

    updateFrequencyDisplay();

    // Event listeners for sliders
    $('#freq-characters').on('input', function() {
        freqCharacters = parseInt($(this).val()) || 0;
        $('#freq-characters-value').text(freqCharacters);
    });

    $('#freq-numbers').on('input', function() {
        freqNumbers = parseInt($(this).val()) || 0;
        $('#freq-numbers-value').text(freqNumbers);
    });

    $('#freq-special').on('input', function() {
        freqSpecial = parseInt($(this).val()) || 0;
        $('#freq-special-value').text(freqSpecial);
    });

    // Current Character and Timing
    let currentChar = '';
    let charDisplayTime = 0;

    // Function to update counters display
    function updateCounters() {
        $('#correct-count').text(correctCount);
        $('#wrong-count').text(wrongCount);
        // Calculate and update median typing times
        $('#median-letters').text(calculateMedian(typingTimesLetters));
        $('#median-numbers').text(calculateMedian(typingTimesNumbers));
        $('#median-special').text(calculateMedian(typingTimesSpecial));
    }

    // Function to calculate median
    function calculateMedian(arr) {
        if (arr.length === 0) return 'N/A';
        const sorted = arr.slice().sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
        } else {
            return sorted[mid];
        }
    }

    // Function to select next character based on frequencies
    function getNextCharacter() {
        const total = freqCharacters + freqNumbers + freqSpecial;
        if (total === 0) {
            // Default to characters if total frequency is zero
            return characters.charAt(Math.floor(Math.random() * characters.length));
        }
        const rand = Math.random() * total;
        if (rand < freqCharacters) {
            return characters.charAt(Math.floor(Math.random() * characters.length));
        } else if (rand < freqCharacters + freqNumbers) {
            return numbers.charAt(Math.floor(Math.random() * numbers.length));
        } else {
            return specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
        }
    }

    // Function to display next character and its instruction with animations
    function displayNextCharacter() {
        // Animate current character out
        $('#current-character').addClass('animate-out');

        // After animation duration, change the character
        setTimeout(function() {
            currentChar = getNextCharacter();
            $('#current-character')
                .removeClass('animate-out text-green-600 text-red-600')
                .text(currentChar)
                .addClass('animate-in');

            // Fetch instruction for the current character
            const instruction = keyInstructions[currentChar] || 'No instruction available';
            $('#instruction-text').text(instruction);

            // Record the display time
            charDisplayTime = Date.now();
        }, 300); // Match the CSS transition duration

        // Remove the animate-in class after animation
        setTimeout(function() {
            $('#current-character').removeClass('animate-in');
        }, 600);
    }

    // Initial display
    displayNextCharacter();

    // Handle input via the input box
    $('#char-input').on('input', function() {
        const userInput = $(this).val();
        if (userInput.length === 0) return;

        // Only consider the first character
        const inputChar = userInput.charAt(0);

        if (inputChar === currentChar) {
            // Correct input
            correctCount++;
            // Calculate typing time
            const typingTime = Date.now() - charDisplayTime;
            categorizeTypingTime(currentChar, typingTime);
            updateCounters();
            $('#current-character').addClass('text-green-600');

            // Animate to next character
            displayNextCharacter();
        } else {
            // Wrong input
            wrongCount++;
            updateCounters();
            $('#current-character').addClass('text-red-600');
        }

        // Clear the input box
        $(this).val('');
    });

    // Categorize typing time based on character type
    function categorizeTypingTime(char, time) {
        if (/[a-zA-Z]/.test(char)) {
            typingTimesLetters.push(time);
        } else if (/[0-9]/.test(char)) {
            typingTimesNumbers.push(time);
        } else if (char === ' ') {
            // Optionally categorize spacebar separately or with special characters
            typingTimesSpecial.push(time);
        } else {
            typingTimesSpecial.push(time);
        }
    }

    // Handle frequency update button
    $('#update-frequencies').on('click', function() {
        displayNextCharacter();
    });

    // Allow pressing Enter to update frequencies
    $('#freq-characters, #freq-numbers, #freq-special').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            $('#update-frequencies').click();
        }
    });

    // Optional: Click anywhere on the page to focus the input box
    $(document).on('click', function() {
        $('#char-input').focus();
    });
});

