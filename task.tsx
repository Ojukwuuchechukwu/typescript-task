interface User {
    type: 'user';
    studentName: string;
    studentNumber: number;
    department: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', studentName: 'Eric Shema', studentNumber: 221086, department: 'Medicine' },
    { type: 'admin', name: 'Michael Ralph', age: 32, role: 'Administrator' },
    { type: 'user', studentName: 'Natasha Abdul', studentNumber: 224018, department: 'Engineering' },
    { type: 'admin', name: 'Anthony Joshua', age: 64, role: 'World saver' },
    { type: 'user', studentName: 'Kim Kardashian', studentNumber: 232241, department: 'Accounting' },
    { type: 'admin', name: 'Angel Bisola', age: 224376, role: 'Anti-virus engineer' }
];

export function logPerson(person: Person) {
    if (person.type === 'user') {
        console.log(
            ` - ${person.studentName}, ${person.studentNumber}, ${person.department}`
        );
    } else {
        console.log(
            ` - ${person.name}, ${person.age}, ${person.role}`
        );
    }
}

type PersonType = Person['type'];
type UserCriteria = Partial<Omit<User, 'type'>>;
type AdminCriteria = Partial<Omit<Admin, 'type'>>;

export function filterPersons<T extends PersonType>(
    persons: Person[],
    personType: T,
    criteria: T extends 'user' ? UserCriteria : AdminCriteria
): Person[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            const criteriaKeys = Object.keys(criteria) as Array<keyof typeof criteria>;
            return criteriaKeys.every((fieldName) => {
                return (person as any)[fieldName] === (criteria as any)[fieldName];
            });
        });
}

// Filter users by studentNumber instead of age
export const usersWithNumber = filterPersons(persons, 'user', { studentNumber: 224018 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users with student number 224018:');
usersWithNumber.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
