// Referencing code from Module 18 Activities

const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const dayjs = require("dayjs")

// Schema to create Thought model
// Schemas define the shape of the documents within the collection.
// Construct a new instance of the schema class
const thoughtSchema = new Schema(
  {
    // Schemas define the properties of the document
    // Configure individual properties using Schema Types
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        // reference to https://mongoosejs.com/docs/validation.html
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        // reference to https://stackoverflow.com/questions/41033839/make-mongoose-string-schema-type-default-value-as-blank-and-make-the-field-optio
        default: Date.now,
        get: timestamp => dayjs(timestamp).format('MM/DD/YYY')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of reactions per thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

// Create model using mongoose.model()  
// Using mongoose.model() to compile a model based on the schema 'userSchema'
// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
