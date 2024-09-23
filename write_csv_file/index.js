
const { convertArrayToCSV } = require('convert-array-to-csv');
const header = ['student_number', 'school_number', 'first_name', 'last_name', 'email']
const fs = require('fs');
const first_names = fs.readFileSync('first_names.txt').toString().split('\n');
const last_names = fs.readFileSync('last_names.txt').toString().split('\n');
const domain = "@Huston.isd"


function generateStudentNumbers(number) {
    const studentNumbers = new Set()
    while (Array.from(studentNumbers).length < number) {
        studentNumbers.add(Math.floor(Math.random() * number))
    }
    return Array.from(studentNumbers)
}

function generateSchoolNumbers(number) {
    const schoolNumber = []
    for (let i = 0; i < number; i++) {
        schoolNumber.push(Math.floor(Math.random() * number))
    }
    return (schoolNumber)
}

function generateStudentNames(number, names) {
    const studentNames = []
    for (let i = 0; i < number; i++) {
        studentNames.push(names[Math.floor(Math.random() * names.length)].trim('\r'))
    }
    return (studentNames)
}

function generateStudentEmails(firstnames, lastnames, domain) {
    emails = []
    for (let i = 0; i < firstnames.length; i++) {
        let email_body = `${firstnames[i]}.${lastnames[i]}`
        let email = email_body + domain

        while (emails.includes(email)) {
            email_body += Math.floor(Math.random() * (firstnames.length * 100)).toString()
            email = email_body + domain
        }
        emails.push(email)

    }
    return emails
}


const number = 10
const studentNumbers = generateStudentNumbers(number)
const schoolNumbers = generateSchoolNumbers(number)
const studentFirstNames = generateStudentNames(number, first_names)
const studentLastNames = generateStudentNames(number, last_names)
const studentEmails = generateStudentEmails(studentFirstNames, studentLastNames, domain)
const rows = []

for (let i = 0; i < number; i++) {
    rows.push([studentNumbers[i], schoolNumbers[i], studentFirstNames[i], studentLastNames[i], studentEmails[i]])
}


const csvFromArrayOfArrays = convertArrayToCSV(rows, {
    header,
    separator: ','
});


fs.writeFile('huston_student_roster_test.csv', csvFromArrayOfArrays, err => {
    if (err) {
        console.log(err)
    }
    console.log('CSV file saved successfully')
})