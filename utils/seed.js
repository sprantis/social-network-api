const connection = require('../config/connection');
const { 
    // User, 
    // Post, 
    // Tags, 
    // Tag, 
    Application, 
    Course, 
    Student 
} = require('../models');
const { getRandomName, getRandomColor, getRandomPost, genRandomIndex, getRandomApplications, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  console.log('connected');

  // Delete the entries in the collection
  await Application.deleteMany({});
//   await User.deleteMany({});
//   await Post.deleteMany({});
//   await Tags.deleteMany({});
  // Drop existing courses
  await Course.deleteMany({});
  // Drop existing students
  await Student.deleteMany({});
//   await Tag.deleteMany({});

  // Empty arrays for randomly generated users, posts, and tags
//   const users = [];
//   const tags = [];
//   const posts = [];
  const applications = getRandomApplications(10);
  const students = [];

//   for (let i = 0; i < 10; i++) {
//     const name = getRandomName();
//     const newUser = {
//       first: name.split(' ')[0],
//       last: name.split(' ')[1],
//       age: Math.floor(Math.random() * 99 + 1),
//     };
//     users.push(newUser);
//   }
  // Function to make a post object and push it into the posts array
//   const makePost = (text) => {
//     posts.push({
//         published: Math.random() < 0.5,
//         text,
//         tags: [tags[genRandomIndex(tags)]._id],
//     });
//   };

    // Create 20 random tags and push them into the tags array
    for (let i = 0; i < 20; i++) {
        const tagname = getRandomColor();
    
        tags.push({
          tagname,
          color: tagname,
        });
    }

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Wait for the users to be inserted into the database
//   await User.collection.insertMany(users);

    // Wait for the tags to be inserted into the database
    // await Tags.collection.insertMany(tags);

    // For each of the tags that exist, make a random post of length 50
    // tags.forEach(() => makePost(getRandomPost(50)));
  
    // Wait for the posts array to be inserted into the database
    // await Post.collection.insertMany(posts);

    await Application.collection.insertMany(applications);

    // Add students to the collection and await the results
    await Student.collection.insertMany(students);

    // Add courses to the collection and await the results
    await Course.collection.insertOne({
        courseName: 'UCLA',
        inPerson: false,
        students: [...students],
    });

      // loop through the saved applications, for each application we need to generate a application response and insert the application responses
//   console.table(tags);
//   console.table(posts, ['published', 'tags', '_id']);
//   console.table(users);
  console.table(applications);
  console.table(students);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});
