module.exports = {};
const questions = [
    {id: 1, question: 'How do you feel about undergoing a background check?'}, 
    {id: 2, question: 'How important is living alone and on your own independently?'},
    {id: 3, question: 'How important is it for someone to have their own means of reliable transportation? This can include living near public transit and using it on your own.'}, 
    {id: 4, question: 'How fulfilled are you in your career?'}, 
    {id: 5, question: 'How tolerant are you of people that have very different beliefs than you?'}, 
    {id: 6, question: 'How likely will you be to seek help when having mental instability?'}, 
    {id: 7, question: 'How likely are you to relocate in the foreseeable future? Work related potential moves included.'}, 
    {id: 8, question: 'Animals - Do you have or tolerate pets in your home?'}, 
    {id: 9, question: 'What is your level of respect towards waitstaff, janitors, security guards, public workers, etc. (anyone "below you")?'}, 
    {id: 10, question: 'How accepting are you when someone sets boundaries with you?'}, 
];
module.exports.getQuestions = () => {
    return questions;
};

//friend is a list of objects with a name and score.
const friends = [

];
module.exports.getAvailableFriends = () => {
    return friends;
};

module.exports.getFriendForScore = (scores) => {
    let lowestDifference = 50;
    let matchedFriend = null;
    for (const friend of friends) {
        let difference = 0;
        for (let i = 0; i < scores.length; ++i) {
            difference += scores[0] - friend.scores[0];
        }
        if (difference < lowestDifference) {
            lowestDifference = difference;
            matchedFriend = friend;
        }
    }
    if (matchedFriend != null) {
        return matchedFriend;
    }
    return {};
};

module.exports.addFriend = (friend) => {
    friends.push(friend);
};
