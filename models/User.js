// Referencing code from Module 18 Activities

const { Schema, model } = require('mongoose');

// Schema to create User model
// Schemas define the shape of the documents within the collection.
// Construct a new instance of the schema class
const userSchema = new Schema(
  {
    // Schemas define the properties of the document
    // Configure individual properties using Schema Types
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        // Email Regex Reference: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Create model using mongoose.model()  
// Using mongoose.model() to compile a model based on the schema 'userSchema'
// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
