const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    // "id": "CHE221H1F20209",
    id: {
      type: String,
    },

    //   "code": "CHE221H1",
    code: {
      type: String,
    },

    //   "name": "Calculus III",
    name: {
      type: String,
    },

    //   "description": "Introduces the basic...",
    description: {
      type: String,
    },
    //   "division": "Faculty of Applied Science \u0026 Engineering",
    division: {
      type: String,
    },
    //   "department": "Chemical Engineering and Applied Chemistry",
    department: {
      type: String,
    },

    //   "prerequisites": null,
    prerequisites: {
      type: String,
    },
    //   "corequisites": null,
    corequisites: {
      type: String,
    },
    //   "exclusions": null,
    exclusions: {
      type: String,
    },
    //   "recommended_preparation": null,
    recommended_preparation: {
      type: String,
    },

    //   "level": "200/B",
    level: {
      type: String,
    },

    //   "campus": "St. George",
    campus: {
      type: String,
    },
    //   "term": "2020 Fall",
    term: {
      type: String,
    },

    //   "arts_and_science_breadth": null,
    arts_and_science_breadth: {
      type: String,
    },

    //   "arts_and_science_distribution": null,
    arts_and_science_distribution: {
      type: String,
    },
    //   "utm_distribution": null,
    utm_distribution: {
      type: String,
    },
    //   "utsc_breadth": null,
    utsc_breadth: {
      type: String,
    },
    //   "apsc_electives": null,
    apsc_electives: {
      type: String,
    },
    reviews: [
      {
        // Review Title:
        title: {
          type: String,
        },
        // Description:
        description: {
          type: String,
        },
        // Session:
        session: {
          type: String,
        },
        // Rating:
        rating: {
          type: Number,
        },
        // Reviewer:
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reviewerName: {
          type: String,
        },
      },
    ],

    Rating: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
