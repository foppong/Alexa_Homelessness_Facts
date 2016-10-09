'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'homelessness facts';

/**
 * Array containing homelessness facts.
 */
var FACTS = [
    "On any given night, there are over 600,000 homeless people in the U.S., according to the US Department of Housing and Urban Development.",
    "Over 138,000 of the homeless in the U.S. are children under the age of 18. Thousands of these homeless children are unaccompanied.",
    "Over 57,000 veterans are homeless each night. Sixty percent of them are in shelters, the rest unsheltered. Nearly 5,000 are female.",
    "More than 90 percent of homeless women are victims of severe physical or sexual abuse, the main reason leading to homelessness.",
    "The lack of affordable housing is a primary cause of homelessness, according to the NLCHP.",
    "According to the NLCHP, one eighth of the nation’s supply of low-income housing has been permanently lost since 2001.",
    "Over 5 million homes have been foreclosed on since 2008; that’s one out of every 10 homes with a mortgage.",
    "There is enough public rental assistance to help about one out of every four extremely low-income households. Those who do not receive help are on multi-year waiting lists.",
    "One in five homeless people suffers from untreated severe mental illness. While about 6 percent of the general population suffers from severe mental illness.",
    "Cities are increasingly making homelessness a crime. A 2014 survey of 187 cities by the NLCHP found that 24 percent of cities make it a city-wide crime to beg in public.",
    "The National Law Center on Homelessness & Poverty currently estimates that each year at least 2.5 to 3.5 million Americans sleep in shelters, transitional housing, and public places not meant for human habitation.",
    "When compared to the total population and those living in poverty, those who are homeless are more likely to be adult, male, African American, not elderly, unaccompanied, and disabled."
];

// Need to ADD more facts
// Sources: Huffington Post, National Law Center on Homelessness and Poverty

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a homelessness fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};