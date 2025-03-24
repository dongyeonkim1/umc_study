class Student {
    constructor(firstname, lastname, school) {
       this.firstname = firstname;
       this.lastname = lastname;
        this.school = school;
    }
    get fullName() {
        return  `${this.firstname} ${this.lastname}`;
    }

    set fullName(name) {
        let parts = name.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }

    introduction() {
        console.log(`안녕하세요, ${this.fullName}입니다. ${this.school}에 다니고 있습니다.`);
    }
};


const dora = new Student('dora', 'kim', '동덕여자대학교');
console.log(dora.fullName);
console.log(dora.school);
dora.introduction();
