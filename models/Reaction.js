// Referencing code from Module 18 Activities

const { Schema, Types } = require('mongoose');
const dayjs = require("dayjs")

// Schema to create Reaction model
// Schemas define the shape of the documents within the collection.
// Construct a new instance of the schema class
const reactionSchema = new Schema(
  {
    // Schemas define the properties of the document
    // Configure individual properties using Schema Types
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // reference to https://stackoverflow.com/questions/41033839/make-mongoose-string-schema-type-default-value-as-blank-and-make-the-field-optio
        default: Date.now,
        get: timestamp => dayjs(timestamp).format('MM/DD/YYYY')
    },
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want getters to be included with our response, overriding the default behavior
    toJSON: {
      getters: true
    },
    id: false,
  }
);

module.exports = reactionSchema;
