const Teams = [
    {
        name : "England",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/England.jpg"
    },
    {
        name : "France",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/France.jpg"
    },
    {
        name : "Spain",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Spain.jpg"
    },
    {
        name : "Qatar",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Qatar.jpg"
    },
    {
        name : "Argentina",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Argentina.jpg"
    },
    {
        name : "Brazil",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Brazil.jpg"
    },
    {
        name : "Canada",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Canada.jpg"
    },
    {
        name : "Senegal",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Senegal.jpg"
    },
    {
        name : "Ghana",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Ghana.jpg"
    },
    {
        name : "Tunisia",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Tunisia.jpg"
    },
    {
        name : "Morocco",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Morocco.jpg"
    },
    {
        name : "Uruguay",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Uruguay.jpg"
    },
    {
        name : "Netherlands",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Netherlands.jpg"
    },
    {
        name : "Germany",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Germany.jpg"
    },
    {
        name : "Ecuador",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Ecuador.jpg"
    },
    {
        name : "Croatia",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Croatia.jpg"
    },
    {
        name : "Japan",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Japan.jpg"
    },
    {
        name : "United States",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/United_States.jpg"
    },
    {
        name : "Ecuador",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Ecuador.jpg"
    },
    {
        name : "Germany",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Germany.jpg"
    },
    {
        name : "South Korea",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/South_Korea.jpg"
    },
    {
        name : "Switxerland",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Switzerland.jpg"
    },
    {
        name : "Portugal",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Portugal.jpg"
    },
    {
        name : "Poland",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Poland.jpg"
    },
    {
        name : "Mexico",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Mexico.jpg"
    },
    {
        name : "Australia",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Australia.jpg"
    },
    {
        name : "Saudi Arabia",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Saudi_Arabia.jpg"
    },
    {
        name : "Cameroon",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Cameroon.jpg"
    },
    {
        name : "Denmark",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Denmark.jpg"
    },
    {
        name : "Costa Rica",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Costa_Rica.jpg"
    },
    {
        name : "Iran",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Iran.jpg"
    },
    {
        name : "Belgium",
        flag: "https://www.sciencekids.co.nz/images/pictures/flags680/Belgium.jpg"
    },
]
export const demo_fixtures = [
    {
        _id : 0,
        dateTime : new Date(Date.now()+1),
        firstTeam : Teams[parseInt(Math.random()*32)],
        secondTeam : Teams[parseInt(Math.random()*32)],
        stadium : {
            name: "Molineaux",
            rows: 5,
            seatsPerRow: 5
        },
        referee : "Ref1",
        firstLinesman : "Lin1",
        secondLinesman : "Lin2",
    },
    {
        _id : 1,
        dateTime : new Date(Date.now()+2),
        firstTeam : Teams[parseInt(Math.random()*32)],
        secondTeam : Teams[parseInt(Math.random()*32)],
        stadium : {
            name: "Wembley",
            rows: 5,
            seatsPerRow: 5
        },
        referee : "Ref1",
        firstLinesman : "Lin1",
        secondLinesman : "Lin2",
    }
]