import express from 'express';

import Votes from '../models/votes';
import Users from '../models/User';

const router = express.Router();

router.post('/ussd', (req, res) => {
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;


    const positions = [
        {
            id: 1,
            name: "President",
            candidates: [
                {
                    id: 1,
                    name: "Joe Biden",

                }, {
                    id: 2,
                    name: "Balack Obama"
                },
                {
                    id: 3,
                    name: "Donald Trump"
                }
            ]

        },
        {
            id: 2,
            name: "Senate",
            candidates: [
                {
                    id: 1,
                    name: "Senate 1",
                },
                {
                    id: 2,
                    name: "Senate 2",
                }
            ]
        }

    ];

    let response = '';

    if (!getUserBuyPhone(phoneNumber)) { 
        response += "END you are not allowed to vote";
        text == ''
    }
    

    if (text == '') {
        response = `CON Welcome to Voting Services `;

        for (let i = 0; i < positions.length; i++) {
            response += `\n ${i + 1}. ${positions[i].name}`;
        }
    } else if (text == '1') {
        response += `Vote for you president`;

        for (let i = 0; i < positions[0].candidates.length; i++) {
            response += `\n ${i + 1}. ${positions[0].candidates[i].name}`;
        }

    } else if (text == '2') {
        response += `Vote for your senate`;

        for (let i = 0; i < positions[1].candidates.length; i++) {
            response += `\n ${i + 1} .${positions[1].candidates[i].name}`;
        }
    }
    else {
        const codeSplinted = text.split('*')[0];
        if (codeSplinted == 1) {
            const president = text.split('*')[1];

            saveVote(phoneNumber, codeSplinted, president);

            response = "END Thank you for voting president";

        }
        else if (codeSplinted == 2) {
            const president = text.split('*')[1];

            saveVote(phoneNumber, codeSplinted, president);

            response = "END Thank you for voting senate ";

        }
        else {
            response = "END Bad choice ";
        }
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});


const saveVote = async (user, position, candidate) => {
    const result = await Votes.create({
        user,
        position,
        candidate
    });
};

const getUserBuyPhone = async (phoneNumber) => { 
    const user = await Users.findOne({ telphone: phoneNumber }).exec();
    if (!user) {
        return false
    }
    else return user

};
router.get('/ussd/report', async (req, res) => {

    let obj = {};

    for (let i = 0; i < positions.length; i++){
        const result = await Votes.find({
            $where: {
                
            }
        })
    } 
});

module.exports = router;